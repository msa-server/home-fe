import { InlineNode, InlineNodeType } from "@/types/markdown";

export default function InlineRenderer({ nodes }: { nodes: InlineNode[] }) {
  return (
    <>
      {nodes.map((n, i) => (
        <InlineLeaf node={n} key={i} />
      ))}
    </>
  );
}

function InlineLeaf({ node }: { node: InlineNode }) {
  switch (node.type) {
    case InlineNodeType.NORMAL: {
      return <span>{node.value}</span>;
    }
    case InlineNodeType.INLINE_CODE: {
      return <code
      className="inline rounded-md leading-normal lx-1 px-0.5 py-0.5 border
        dark:bg-neutral-300  dark:border-neutral-200 dark:text-neutral-900"
        >{node.value}</code>
    }
    case InlineNodeType.EMPHASIS: {
      return <span className="font-bold">
        <>{node.children.map((n, i) => {
           return <InlineLeaf node={n}  key={i} />
        })}</>
      </span>
    }
    case InlineNodeType.ITALIC: {
      return <span className="italic">
        <>{node.children.map((n, i) => {
           return <InlineLeaf node={n}  key={i} />
        })}</>
      </span>
    }
    case InlineNodeType.LINK: {
      return <a href={node.url} target="_blank" rel="noopener  noreferrer">{node.placeholder || node.url}</a>
    }
  }
}
