import Link from "next/link";
import { ChevronLeft, ChevronRight, Ellipsis  } from "lucide-react";

function buildPages(current: number, total: number, window = 2) {
  // window=2  → 한 번에 보이는 연속 숫자 최대 5개
  const span = 2 * window + 1;
  const pages: number[] = [];

  // 전체 페이지가 적으면 전부 노출
  if (total <= span + 2) {
    for (let p = 1; p <= total; p++) pages.push(p);
    return pages;
  }

  // 시작부 근처: 1..span, 마지막 페이지
  if (current <= window + 1) {
    for (let p = 1; p <= span; p++) pages.push(p);
    pages.push(total);
    return pages;
  }

  // 끝부 근처: 1, (마지막 span개)
  if (current >= total - window) {
    pages.push(1);
    for (let p = total - span + 1; p <= total; p++) pages.push(p);
    return pages;
  }

  // 그 외: 1, current-window..current+window, total
  pages.push(1);
  for (let p = current - window; p <= current + window; p++) pages.push(p);
  pages.push(total);
  return pages;
}

export default function PageNavigation({
  page,
  totalPages,
  size,
  basePath,
}: {
  page: number;
  totalPages: number;
  size: number;
  basePath: string;
}) {
  if (totalPages <= 1) return null;

  const pages = buildPages(page, totalPages, 2);
  const qp = (p: number) => `${basePath}?page=${p}`;

  return (
    <nav
      aria-label="Pagination"
      className="mt-10 mb-14 flex items-center justify-center gap-2 text-sm font-bold font-noto dark:text-neutral-200"
    >
      {/* 이전: 꺾쇠 아이콘 */}
      <Link
        href={qp(Math.max(page - 1, 1))}
        aria-disabled={page === 1}
        className={[
          "grid h-8 w-8 place-items-center rounded-full",
          page === 1
            ? "pointer-events-none opacity-30"
            : "hover:bg-muted transition-colors",
        ].join(" ")}
      >
        <ChevronLeft />
      </Link>

      {/* 숫자 + 생략부호 */}
      {pages.map((p, idx) => {
        const prev = pages[idx - 1];
        const needDots = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center">
            {needDots && (
              <span aria-hidden className="mx-2 text-muted-foreground">
                <Ellipsis />
              </span>
            )}
            <Link
              href={qp(p)}
              aria-current={p === page ? "page" : undefined}
              className={[
                "grid h-10 w-10 place-items-center rounded-full transition-colors",
                p === page ? "bg-black text-white dark:bg-white dark:text-black font-semibold" : "hover:bg-muted",
              ].join(" ")}
            >
              {p}
            </Link>
          </span>
        );
      })}

      {/* 다음: 꺾쇠 아이콘 */}
      <Link
        href={qp(Math.min(page + 1, totalPages))}
        aria-disabled={page === totalPages}
        className={[
          "grid h-10 w-10 place-items-center rounded-full",
          page === totalPages
            ? "pointer-events-none opacity-30"
            : "hover:bg-muted transition-colors",
        ].join(" ")}
      >
        <ChevronRight />
      </Link>
    </nav>
  );
}
