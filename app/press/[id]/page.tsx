import { Suspense, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { getBlogPosts } from "@/lib/notion";
import { ArrowLeft } from "lucide-react";
import NotionContent from "@/components/NotionContent";
import ShareButton from "@/components/ShareButton";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function PressPost({ id }: { id: string }) {
  const posts = await getBlogPosts();
  const post = posts.find((p) => p.id === id);

  if (!post) {
    notFound();
  }

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[50vh]">
        {post.mediaType === "video" && post.coverVideo ? (
          <video
            src={post.coverVideo}
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
          />
        ) : post.coverImage ? (
          <div className="relative w-full h-full">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : (
          <div className="w-full h-full bg-[#ae904c]/10" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black" />

        {/* Back Button */}
        <Link
          href="/press"
          className="absolute top-8 left-8 flex items-center gap-2 text-white/90 hover:text-white 
                    transition-colors duration-300"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Press
        </Link>
      </div>

      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div
            className="bg-gradient-to-br from-[#ae904c]/10 to-black/40 border border-[#ae904c]/30 
                        backdrop-blur-sm rounded-xl p-8 mb-8"
          >
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-[#ae904c]">
                {post.title}
              </h1>
              <ShareButton title={post.title} description={post.description} />
            </div>

            <div className="flex flex-wrap gap-4 items-center text-[#ae904c]/80">
              <time>
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="flex gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-sm rounded-full bg-[#ae904c]/10 text-[#ae904c]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Content */}
            <article className="prose prose-invert prose-lg max-w-none my-16">
              <p className="lead text-xl text-white/80 mb-8">
                {post.description}
              </p>
              <NotionContent blocks={post.content} />
            </article>
          </div>
        </div>
      </div>
    </>
  );
}

export default function PressPostPage({ params }: PageProps) {
  const { id } = use(params);

  return (
    <main className="min-h-screen bg-black">
      <Suspense
        fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite] text-[#ae904c]" />
          </div>
        }
      >
        <PressPost id={id} />
      </Suspense>
      <Footer />
    </main>
  );
}
