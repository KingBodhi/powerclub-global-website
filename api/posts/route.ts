import { Client } from "@notionhq/client";
import { NextResponse } from "next/server";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { setCacheHeaders, CACHE_CONFIGS } from "@/lib/cache-control";

export async function GET() {
  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    });

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    const posts = await Promise.all(
      response.results
        .filter((page): page is PageObjectResponse => "properties" in page)
        .map(async (page) => {
          // Extract tags
          const tagsProperty = page.properties.Tags as {
            multi_select: Array<{ name: string }>;
          };
          const tags = tagsProperty.multi_select.map((tag) => tag.name);

          // Format date
          const dateProperty = page.properties.Date as {
            date: { start: string } | null;
          };
          const date = dateProperty.date?.start || "";

          // Get page content with full block structure
          const blocks = await notion.blocks.children.list({
            block_id: page.id,
          });

          // Keep the original block structure
          const content = blocks.results.filter(
            (block): block is BlockObjectResponse =>
              !("type" in block && block.type === "unsupported")
          );

          // Extract cover media and determine type
          const coverFiles = (
            page.properties["Cover Image"] as {
              files: Array<{
                file?: { url: string };
                external?: { url: string };
                name: string;
                type?: string;
              }>;
            }
          ).files;

          const coverFile = coverFiles[0];
          let coverImage = "";
          let coverVideo = "";
          let mediaType: "image" | "video" = "image";

          if (coverFile) {
            let url = coverFile.file?.url || coverFile.external?.url || "";
            const fileName = coverFile.name.toLowerCase();

            if (url.includes("secure.notion-static.com")) {
              try {
                const urlParts = url.split("secure.notion-static.com/")[1];
                if (urlParts) {
                  const [fileId] = urlParts.split("?");
                  url = `https://prod-files-secure.s3.us-west-2.amazonaws.com/${fileId}`;
                }
              } catch (error) {
                console.warn("Failed to transform Notion URL:", error);
              }
            }

            if (
              url.toLowerCase().endsWith(".mp4") ||
              fileName.endsWith(".mp4")
            ) {
              coverVideo = url;
              coverImage = "";
              mediaType = "video";
            } else {
              coverImage = url;
              coverVideo = "";
              mediaType = "image";
            }
          }

          return {
            id: page.id,
            title:
              (
                page.properties.Title as {
                  title: Array<{ plain_text: string }>;
                }
              ).title[0]?.plain_text || "Untitled",
            coverImage,
            coverVideo,
            mediaType,
            description:
              (
                page.properties.Description as {
                  rich_text: Array<{ plain_text: string }>;
                }
              )?.rich_text[0]?.plain_text || "",
            content, // Now contains the full block structure
            date,
            tags,
          };
        })
    );

    console.log(
      "First post content structure:",
      JSON.stringify(posts[0].content, null, 2)
    );

    const responseJson = NextResponse.json(posts);
    return setCacheHeaders(responseJson, CACHE_CONFIGS.dynamicContent);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}
