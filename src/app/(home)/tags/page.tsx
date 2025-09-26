import Link from "next/link";

type TagDetail = {
  tagId: number;
  tagName: string;
  count: number;
};


async function fetchTags(): Promise<TagDetail[]> {
  const url = `http:/localhost:9000/v1/tags`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");

  const data: TagDetail[] = await res.json();
  return data;
}

export default async function TagsPage() {

  const totalData = await fetchTags();

  return (
    <main className="mx-auto max-w-4xl py-3">
      <div className="flex flex-wrap gap-3">
        {totalData.map((tag) => (
          <Link
            key={tag.tagId}
            href={`/tags/${tag.tagId}`}
            className="
              rounded-full bg-gray-100 px-4 py-2
              text-gray-700 hover:bg-gray-200
              transition-colors
            "
          >
            {tag.tagName} ({tag.count})
          </Link>
        ))}
      </div>
    </main>
  );
}
