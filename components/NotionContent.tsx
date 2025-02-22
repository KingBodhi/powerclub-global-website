import React, { JSX } from "react";

interface NotionUser {
  object: "user";
  id: string;
}

interface NotionParent {
  type: "page_id";
  page_id: string;
}

interface RichText {
  type: "text";
  text: {
    content: string;
    link: string | null;
  };
  annotations: {
    bold: boolean;
    italic: boolean;
    strikethrough: boolean;
    underline: boolean;
    code: boolean;
    color: string;
  };
  plain_text: string;
  href: string | null;
}

interface BaseBlock {
  object: "block";
  id: string;
  parent: NotionParent;
  created_time: string;
  last_edited_time: string;
  created_by: NotionUser;
  last_edited_by: NotionUser;
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
}

interface HeadingBlock extends BaseBlock {
  type: "heading_1" | "heading_2" | "heading_3";
  heading_1?: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
  heading_2?: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
  heading_3?: {
    rich_text: RichText[];
    is_toggleable: boolean;
    color: string;
  };
}

interface ParagraphBlock extends BaseBlock {
  type: "paragraph";
  paragraph: {
    rich_text: RichText[];
    color: string;
  };
}

interface NumberedListItemBlock extends BaseBlock {
  type: "numbered_list_item";
  numbered_list_item: {
    rich_text: RichText[];
    color: string;
  };
}

interface BulletedListItemBlock extends BaseBlock {
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: RichText[];
    color: string;
  };
}

export type NotionBlock =
  | HeadingBlock
  | ParagraphBlock
  | NumberedListItemBlock
  | BulletedListItemBlock;

const RichTextContent = ({ richText }: { richText: RichText[] }) => {
  return (
    <>
      {richText.map((text, index) => {
        let className = "";
        const { annotations } = text;

        if (annotations.bold) className += "font-bold ";
        if (annotations.italic) className += "italic ";
        if (annotations.strikethrough) className += "line-through ";
        if (annotations.underline) className += "underline ";
        if (annotations.code)
          className += "font-mono bg-gray-800 px-1 rounded ";

        const content = (
          <span key={index} className={className || undefined}>
            {text.text.content}
          </span>
        );

        return text.text.link ? (
          <a
            key={index}
            href={text.text.link}
            className="text-cyan-400 hover:text-cyan-300 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            {content}
          </a>
        ) : (
          content
        );
      })}
    </>
  );
};

const NotionBlock = ({ block }: { block: NotionBlock }) => {
  switch (block.type) {
    case "heading_1":
      return (
        <h1 className="text-2xl font-bold mt-8 mb-4 text-white">
          <RichTextContent richText={block.heading_1!.rich_text} />
        </h1>
      );

    case "heading_2":
      return (
        <h2 className="text-xl font-bold mt-6 mb-3 text-white">
          <RichTextContent richText={block.heading_2!.rich_text} />
        </h2>
      );

    case "heading_3":
      return (
        <h3 className="text-lg font-bold mt-4 mb-2 text-white">
          <RichTextContent richText={block.heading_3!.rich_text} />
        </h3>
      );

    case "paragraph":
      return (
        <p className="mb-4 text-gray-300 leading-relaxed">
          <RichTextContent richText={block.paragraph.rich_text} />
        </p>
      );

    case "numbered_list_item":
      return (
        <div className="mb-2 text-gray-300">
          <RichTextContent richText={block.numbered_list_item.rich_text} />
        </div>
      );

    case "bulleted_list_item":
      return (
        <div className="mb-2 text-gray-300">
          • <RichTextContent richText={block.bulleted_list_item.rich_text} />
        </div>
      );

    default:
      return null;
  }
};

export interface NotionContentProps {
  blocks: NotionBlock[];
}

const NotionContent: React.FC<NotionContentProps> = ({ blocks }) => {
  const renderedBlocks: JSX.Element[] = [];
  let currentList: JSX.Element[] = [];
  let currentListType: "numbered_list_item" | "bulleted_list_item" | null =
    null;

  blocks.forEach((block, index) => {
    if (
      block.type === "numbered_list_item" ||
      block.type === "bulleted_list_item"
    ) {
      if (currentListType !== block.type && currentList.length > 0) {
        renderedBlocks.push(
          <div key={`list-${index}`} className="mb-4">
            {currentListType === "numbered_list_item" ? (
              <ol className="list-decimal list-inside">{currentList}</ol>
            ) : (
              <ul className="list-disc list-inside">{currentList}</ul>
            )}
          </div>
        );
        currentList = [];
      }
      currentListType = block.type;
      currentList.push(<NotionBlock key={block.id} block={block} />);
    } else {
      if (currentList.length > 0) {
        renderedBlocks.push(
          <div key={`list-${index}`} className="mb-4">
            {currentListType === "numbered_list_item" ? (
              <ol className="list-decimal list-inside">{currentList}</ol>
            ) : (
              <ul className="list-disc list-inside">{currentList}</ul>
            )}
          </div>
        );
        currentList = [];
        currentListType = null;
      }
      renderedBlocks.push(<NotionBlock key={block.id} block={block} />);
    }
  });

  if (currentList.length > 0) {
    renderedBlocks.push(
      <div key="list-final" className="mb-4">
        {currentListType === "numbered_list_item" ? (
          <ol className="list-decimal list-inside">{currentList}</ol>
        ) : (
          <ul className="list-disc list-inside">{currentList}</ul>
        )}
      </div>
    );
  }

  return <div className="notion-content">{renderedBlocks}</div>;
};

export default NotionContent;
