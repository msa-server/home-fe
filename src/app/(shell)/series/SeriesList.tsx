"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

type SeriesDetail = {
  seriesId: string;
  seriesName: string;
  articleCount: number;
  coverImageUrl?: string;
};

export default function SeriesList({totalSeries}: {totalSeries: SeriesDetail[]}) {
  const showSize = 6;
  
  const [items, setItems] = useState<SeriesDetail[]>([]);
  const [page, setPage] = useState(0);
  const [isPending, startTransition] = useTransition();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const hasMore = items.length < totalSeries.length;

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;
    
    const io = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) return;

      // 다음 페이지 로드 -> state에 '붙이기'
      startTransition(async () => {
        const nextPage = page + 1;
        const next = totalSeries.slice(page * showSize, nextPage * showSize);

        if (next.length > 0) {
          setItems((prev) => [...prev, ...next]);
          setPage(nextPage);
        }
      });
    }, { rootMargin: "200px 0px" }); // 조기 로드 여유

    io.observe(loaderRef.current);
    return () => io.disconnect();
  }, [page, showSize, hasMore]);

  return (
    <main>
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-12 font-noto select-none">
        {items.map((s) => (
          <Link
            key={s.seriesId}
            href={`/series/${s.seriesId}`}
            className="
              group block
              rounded-t-2xl rounded-b-none overflow-hidden
              bg-white ring-1 ring-gray-200
              dark:bg-black dark:ring-1 dark:ring-gray-200
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-xl hover:ring-gray-300
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500
            "
          >
            <div className="relative w-full aspect-[16/9] bg-gray-100">
              {s.coverImageUrl ? (
                <Image
                  src={s.coverImageUrl}
                  alt={`${s.seriesName} cover`}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 560px, 100vw"
                />
              ) : (
                <div className="absolute inset-0 grid place-items-center text-gray-400">
                  <svg width="56" height="56" viewBox="0 0 24 24" fill="none">
                    <path d="M4 6h16v12H4z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 10h8M8 14h5" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                </div>
              )}
            </div>
            <div className="px-4 py-3 transition-colors duration-300 group-hover:bg-gray-50 dark:group-hover:bg-gray-950">
              <h2 className="text-2xl font-semibold tracking-tight transition-colors duration-300 group-hover:text-blue-400 dark:group-hover:text-yellow-400">
                {s.seriesName}
              </h2>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                <span className="font-medium">{s.articleCount} Posts</span>
                <span className="mx-2">·</span>
                {/* TODO: 여기다 마지막 업데이트 날짜 추가. */}
              </p>
            </div>
          </Link>
        ))}
      </section>

      {/* 로딩 센티널 */}
      {hasMore && (
        <div ref={loaderRef} className="py-10 text-center text-gray-400">
          {isPending ? "Loading..." : "Scroll to load more"}
        </div>
      )}
    </main>
  );
}
