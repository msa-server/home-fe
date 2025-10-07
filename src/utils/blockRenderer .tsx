import { BlockNode, BlockNodeType } from "@/types/markdown";
import CodeBlock from "@/component/CodeBlock";
import InlineRenderer from "./inlineRenderer";

export default function BlockRenderer({ node }: { node: BlockNode }) {
  const headingFontSize = ["3xl", "2xl", "xl", "lg", "base"];

  switch (node.type) {
    case BlockNodeType.HEADING: {
      const className = `font-bold text-${headingFontSize[node.depth]}`;

      return (
        <div className={className}>
          <InlineRenderer nodes={node.children} />
        </div>
      );
    }
    case BlockNodeType.PARAGRAPH: {
      return (
        <p>
          <InlineRenderer nodes={node.children} />
        </p>
      );
    }
    case BlockNodeType.CODE_BLOCK: {
      return <CodeBlock code={node.code} lang={node.language} />;
    }
    case BlockNodeType.EMPTY_LINE: {
      return <br />;
    }
    case BlockNodeType.LIST_BLOCK: {
      const ListTag = node.ordered ? "ol" : "ul";
      
      const listClass = node.ordered
        ? `my-ol`
        : `my-ul`;

      return (
        <ListTag className={listClass}>
          {node.items.map((it, i) => (
            <li key={i} className="mb-1">{it}</li> 
          ))}
        </ListTag>
      );
    }
    case BlockNodeType.DIVIDER_LINE_NORMAL: {
        return (
            <div className="my-2 mb-4">
                <hr className="border-t border-neutral-200 dark:border-neutral-700" />
            </div>);
    }
  }
}