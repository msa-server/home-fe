"use client";

import Image from "next/image";
import Link from "next/link";
import { ImBooks } from "react-icons/im";
import { Post } from "@/types/local";


export default function PostCard({
  id,
  href,
  title,
  coverUrl,
  category,
  authorName,
  authorAvatarUrl,
  createdAt,
}: Post) {
  return (
    <article
      className="
        font-noto
        group relative overflow-hidden rounded-3xl bg-background
        shadow-md transition-all duration-300
        hover:shadow-xl hover:-translate-y-1
        dark:border dark:border-neutral-800 dark:hover:shadow-[0_0_12px_rgba(255,255,255,0.08)]"
    >
      {/* 상단 이미지 */}
      <div className="relative">
        <Link href={href} aria-label={title}>
          <div className="relative h-40 w-full overflow-hidden">
            <Image
              src={coverUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              priority={false}
            />
          </div>
        </Link>
      </div>

      {/* 본문 */}
      <div className="px-3 pb-2 pt-2">
        {/* 카테고리 pill */}
        {category && (
          <Link href={`/series/${category.seriesId}`}>
          <div className="mb-1 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm font-medium 
            dark:text-yellow-400 text-blue-400">
            <span><ImBooks /></span>
            <span>{category.seriesName}</span>
          </div>
          </Link>
        )}

        {/* 제목 */}
        <Link href={href} className="block">
          <h3 className="text-lg font-semibold leading-snug dark:text-neutral-200 whitespace-normal break-all text-pretty">{title}</h3>
        </Link>

        {/* 하단 메타 */}
        <div className="mt-2 flex items-center justify-between">
            <Link href={href} >
          <div className="flex items-center gap-3">
            <Image
              src={authorAvatarUrl}
              alt={authorName}
              width={40}
              height={40}
              className="h-10 w-10 rounded-full border object-cover"
            />
            <div className="leading-tight">
              <div className="font-medium dark:text-neutral-100">{authorName}</div>
              <div className="text-sm text-muted-foregroun dark:text-neutral-100">{createdAt}</div>
            </div>
          </div>
          </Link>
        </div>
      </div>
    </article>
  );
}
