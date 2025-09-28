import { TagDetail } from "@/types/tags";
import PageNavigation from "@/component/PageNavigation";
import { Article } from "@/types/article";
import PostCompactCard from "@/component/PostCompactCard";
import Link from "next/link";

async function fetchTag(id: string): Promise<TagDetail> {
  const res = await fetch(`http://localhost:9000/v1/tags/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("시리즈 정보 불러오지 못했습니다.");
  return res.json();
}

async function fetchTagArticles(
  tagId: string,
  page: number,
  size: number
): Promise<Article[]> {
  const url = `http:/localhost:9000/v1/tags/${tagId}/articles?page=${page}&pageSize=${size}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");

  const data: Article[] = await res.json();
  return data;
}

export default async function TagsDetailView({
  params, searchParams
}: {
  params: { id: string };
  searchParams: { page?: string };
}) {
  const { id } = await params;
  const { page } = await searchParams;
  const size = 8;

  const tag: TagDetail = await fetchTag(id);

  const totalPages = Math.max(Math.ceil(tag.count / size), 1);

  const currentPage = Math.min(Math.max(parseInt(page ?? "1", 10) || 1, 1), totalPages);
  
  const articles = await fetchTagArticles(tag.tagId, currentPage, size);

  console.log("totalPages = " + totalPages);

  return (
    <main className="mx-auto max-w-4xl px-4 py-3 font-noto">
      <section className="select-none">
        {/* SERIES 배지 */}
        <span className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-extrabold tracking-wider uppercase px-3 py-1 rounded">
          <Link href="/tags">
          Tags
          </Link>
        </span>

        {/* 타이틀 */}
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
          {tag.tagName}
        </h1>

        {/* 얇은 구분선 */}
        <div className="mt-4 border-t border-gray-200 dark:border-gray-700" />
      </section>

      <section className="mt-6">
        {articles.map((post) => (

                  <PostCompactCard
                    key={post.articleId}
                    id={post.articleId}
                    href={`/post/${post.articleId}`}
                    title={`${post.title}`}
                    coverUrl={`/profile.webp`}    // TODO : 실제 썸네일 URL로 교체
                    tags={post.articleTags}
                    authorName="bienew22"
                    authorAvatarUrl="/profile.webp"
                    createdAt={post.createdAt.slice(0, 10).replaceAll("-", ".")} />
                ))}
      </section>

       <PageNavigation
                page={currentPage}
                totalPages={totalPages}
                size={size}
                basePath={"/tags/" + tag.tagId} />
    </main>
  );
}
