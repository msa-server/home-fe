// app/posts/page.tsx
import Sidebar from "../../_temp/sidebar";
import { Suspense } from "react";
import Link from "next/link";
import PageNavigation from "@/app/_component/PageNavigation";
import PostCard from "@/app/_component/PostCard";

type ArticleTag = {
  tagId: number;
  tagName: string;
  count: number;
};

type Article = {
  articleId: number;
  title: string;
  content: string;
  articleTags: ArticleTag[];
  createdAt: string;
  modifiedAt: string;
};

type ListResponse = {
  articles: Article[];
  articleCount: number;
};

async function fetchArticles(
  page: number,
  size: number
): Promise<ListResponse> {
  const url = `http:/localhost:9000/v1/articles?tagId=1&page=${page}&pageSize=${size}`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error("게시글을 불러오지 못했습니다.");
  return res.json();
}

export default async function PostsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Math.max(parseInt(searchParams?.page ?? "1", 10) || 1, 1);
  const size = 12;

  const { articles, articleCount } = await fetchArticles(page, size);

  const totalPages = Math.max(Math.ceil(articleCount / size), 1);

  return (
    <main className="mx-auto max-w-4xl py-8 flex flex-col gap-8">
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 flex-1">
        {articles.map((post) => (
          <PostCard
            key={post.articleId}
            id={post.articleId}
            href={`/post/${post.articleId}`}
            title={`${post.title}`}
            coverUrl={`/profile.webp`}    // TODO : 실제 썸네일 URL로 교체
            category="SERIES"             // TODO : 실제 게시글 시리즈 교체
            authorName="bienew22"
            authorAvatarUrl="/profile.webp"
            createdAt={post.createdAt.slice(0, 10).replaceAll("-", ".")} />
        ))}
      </section>

      <PageNavigation
          page={page}
          totalPages={totalPages}
          size={size}
          basePath="/posts" />
    </main>
  );
}
