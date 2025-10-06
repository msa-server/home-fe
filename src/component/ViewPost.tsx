import { BlockNode, InlineNode, BlockNodeType, InlineNodeType } from "@/types/markdown";
import CodeBlock from "./CodeBlock";


export default function ViewPost({ nodes, title, tags }: { nodes: BlockNode[], title: string, tags: string }) {
  return (
    <section>
        <h1 className="text-3xl font-bold mb-2">{title || "제목 미리보기"}</h1>
        <p className="text-sm text-gray-500 mb-4">{tags}</p>
        <article className="prose max-w-none">{nodes.map((n, i) => (<Block node={n} key={i} />))}</article>    
    </section>
  );
}

function Block({ node }: { node: BlockNode }) {
  const headingFontSize = ["4xl", "3xl", "2xl", "xl", "lg", "base"];

  switch (node.type) {
    case BlockNodeType.HEADING: {
      const className = `font-bold text-${headingFontSize[node.depth]}`;
      return (<div className={className}> <Inline nodes={node.children} /></div>);
    }
    case BlockNodeType.PARAGRAPH: {
      return (<p><Inline nodes={node.children} /></p>);
    }
    case BlockNodeType.CODE_BLOCK: {
      return <CodeBlock code={node.code} lang={node.language} />;
    }
  }
}

function Inline({ nodes }: { nodes: InlineNode[] }) {
    return (<>{nodes.map((n, i) => (<InlineLeaf node={n} key={i} />))}</>);
}

function InlineLeaf({ node }: { node: InlineNode }) {
    switch (node.type) {
        case InlineNodeType.NORMAL: {
            return <>{node.value}</>;
        }
    }
}
