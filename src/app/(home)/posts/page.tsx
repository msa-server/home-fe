import PageNavigation from "@/app/_component/PageNavigation";
import PostCard from "@/app/_component/PostCard";

type ArticleCount = {
  articleCount: number;
}

type ArticleTag = {
  tagId: number;
  tagName: string;
  count: number;
};

type Series = {
  seriesId: number;
  seriesName: string;
  articleCount: number;
}

type Article = {
  articleId: number;
  title: string;
  content: string;
  articleTags: ArticleTag[];
  series: Series;
  createdAt: string;
  modifiedAt: string;
};

async function fetchArticles(
  page: number,
  size: number
): Promise<Article[]> {
  const url = `http:/localhost:9000/v1/articles?page=${page}&pageSize=${size}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");

  const data: Article[] = await res.json();
  return data;
}

async function fetchTotalArticles(): Promise<ArticleCount> {
  const url = `http:/localhost:9000/v1/articles/count`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("게시글 수 불러오지 못했습니다.");

  return res.json();
}

export default async function PostsPage({ searchParams }: { searchParams: Promise<{ page?: string }> }) {
  const { articleCount } = await fetchTotalArticles();
  const { page } = await searchParams;
  const size = 12;

  const totalPages = Math.max(Math.ceil(articleCount / size), 1);

  const currentPage = Math.min(Math.max(parseInt(page ?? "1", 10) || 1, 1), totalPages);
  
  const articles = await fetchArticles(currentPage, size);

  return (
    <main className="mx-auto max-w-4xl flex flex-col gap-8 select-none">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {articles.map((post) => (
          <PostCard
            key={post.articleId}
            id={post.articleId}
            href={`/post/${post.articleId}`}
            title={`${post.title}`}
            coverUrl={`/profile.webp`}    // TODO : 실제 썸네일 URL로 교체
            category={`${post.series.seriesName}`}
            authorName="bienew22"
            authorAvatarUrl="/profile.webp"
            createdAt={post.createdAt.slice(0, 10).replaceAll("-", ".")} />
        ))}
      </section>

      <PageNavigation
          page={currentPage}
          totalPages={totalPages}
          size={size}
          basePath="/posts" />
    </main>
  );
}
