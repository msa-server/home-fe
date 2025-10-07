import { BlockNode } from "@/types/markdown";
import BlockRenderer from "@/utils/blockRenderer ";

export default function ViewPost({
  nodes,
  title,
  tags,
}: {
  nodes: BlockNode[];
  title: string;
  tags: string;
}) {
  return (
    <section>
      <h1 className="text-5xl font-bold mb-2">{title || "제목 미리보기"}</h1>
      <p className="text-sm text-gray-500 mb-4">{tags}</p>
      <article className="prose max-w-none">
        {nodes.map((n, i) => (
          <BlockRenderer node={n} key={i} />
        ))}
      </article>
    </section>
  );
}



