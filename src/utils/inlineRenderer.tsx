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
      className="inline rounded-md bg-neutral-100 border border-neutral-200 lx-1 px-1
                      text-[13px] leading-normal text-neutral-700
                     dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-200"
        >
          {node.value}
        </code>
    }
  }
}
