import { Article, ArticleCount } from "@/types/article";
import { Suspense } from "react";
import CircleLoading from "@/component/CircleLoading";
import PostsGrid from "./PostsGrid";

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
  const { page } = await searchParams;

  return (
    <Suspense
        key={page}
        fallback={
          <CircleLoading size={72} dotCount={8} duration={1.0} />
        }
      >
        <PostsGrid page={page} />
      </Suspense>
  )
}
