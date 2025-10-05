import { BlockNode, InlineNode , BlockNodeType, InlineNodeType} from "@/types/markdown";

export default function ViewPost({nodes} : {nodes: BlockNode[]}) {
  return <>{nodes.map((n, i) => <Block node={n} key={i} />)}</>;
}

function Block({node} : {node: BlockNode}) {

  const headingFontSize = ["4xl", "3xl", "2xl", "xl", "lg", "base"];

    switch(node.type) {
      case BlockNodeType.HEADING: {
        const className = `font-bold text-${headingFontSize[node.depth]}`;
        return <div className={className}><Inline nodes={node.children} /></div>
      }
    }
}

function Inline({nodes} : {nodes: InlineNode[]}) {
  return <>{nodes.map((n, i) => <InlineLeaf node={n} key={i} />)}</>
}

function InlineLeaf({node} : {node: InlineNode}) {
  switch(node.type) {
    case InlineNodeType.NORMAL: {
      return <>{node.value}</>;
    }
  }
}
