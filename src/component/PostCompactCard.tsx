import Link from "next/link";
import Image from "next/image";
import { Post } from "@/types/local";
import { TagDetail } from "@/types/tags";

export default function PostCompactCard({
  id,
  href,
  title,
  coverUrl,
  tags = [],
  authorName,
  createdAt,
}: Post) {
  return (
    <article className="rounded-2xl bg-white dark:bg-neutral-900 mt-4 p-2">
      <Link href={href}>
      {/* 제목 (전체 폭) */}
      <h2 className="text-xl md:text-2xl font-semibold break-all">
        {title}
      </h2>

      <p className="pl-1 mt-1 text-sm text-gray-600 dark:text-gray-300">{`${createdAt}`}</p>
            </Link>

      {/* 본문 레이아웃 */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-3 items-start">
        {/* 좌측: 사진(좀 더 좁게) */}
        <div>
          <div className="relative aspect-[16/9] md:aspect-[4/3] lg:w-[280px] rounded-xl overflow-hidden bg-gray-100 dark:bg-neutral-800">
            {coverUrl ? (
              <Image
                src={coverUrl}
                alt={`${title} cover`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 160px, (max-width: 1024px) 200px, 240px"
                priority={false}
              />
            ) : (
              <div className="absolute inset-0 grid place-items-center text-gray-400 text-sm">
                No Image
              </div>
            )}
          </div>
        </div>

        {/* 우측: 태그 정보 (더 넓게) */}
        <div className="rounded-xl border border-gray-200 dark:border-neutral-800 p-4 min-h-[140px] h-full">
          <div className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            태그 정보
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.length > 0 ? (
              tags.map((t: TagDetail) => (
                
                <span
                  key={t.tagId}
                  className="px-2.5 py-1 rounded-full text-xs border border-gray-300 dark:border-neutral-700 
                  hover:text-blue-400 dark:hover:text-yellow-500"
                >
                  <Link href={`/tags/${t.tagId}`}>
                  {t.tagName}
                  </Link>
                </span>
                
              ))
            ) : (
              <span className="text-sm text-gray-400">태그 없음</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
