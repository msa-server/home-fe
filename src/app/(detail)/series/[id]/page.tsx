import PageNavigation from "@/component/PageNavigation";
import { Article } from "@/types/article";
import PostCompactCard from "@/component/PostCompactCard";
import Link from "next/link";
import { Series } from "@/types/series";

async function fetchSeries(id: string): Promise<Series> {
  const res = await fetch(`http://localhost:9000/v1/series/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("시리즈 정보 불러오지 못했습니다.");
  return res.json();
}

async function fetchTagArticles(
  seriesId: string,
  page: number,
  size: number
): Promise<Article[]> {
  const url = `http:/localhost:9000/v1/series/${seriesId}/articles?page=${page}&pageSize=${size}`;
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

  const series: Series = await fetchSeries(id);

  const totalPages = Math.max(Math.ceil(series.articleCount / size), 1);

  const currentPage = Math.min(Math.max(parseInt(page ?? "1", 10) || 1, 1), totalPages);
  
  const articles = await fetchTagArticles(series.seriesId, currentPage, size);

  console.log("totalPages = " + totalPages);

  return (
    <main className="mx-auto max-w-4xl px-4 py-3 font-noto">
      <section className="select-none">
        {/* SERIES 배지 */}
        <span className="inline-block bg-black dark:bg-white text-white dark:text-black text-sm font-extrabold tracking-wider uppercase px-3 py-1 rounded">
          <Link href="/series">
          Series
          </Link>
        </span>

        {/* 타이틀 */}
        <h1 className="mt-4 text-4xl md:text-5xl font-extrabold">
          {series.seriesName}
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
                basePath={"/series/" + series.seriesId} />
    </main>
  );
}
