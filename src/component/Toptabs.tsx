// app/_components/TopTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Tab = { label: string; href: string; count?: number };

const TABS: Tab[] = [
  { label: "POSTS", href: "/posts" },
  { label: "SERIES", href: "/series" },
  { label: "TAGS", href: "/tags"}
];

export default function TopTabs() {
  const pathname = usePathname();

  return (
    <div className="relative border-b border-gray-300">
      {/* 탭 행 */}
      <nav className="flex items-center justify-center gap-10">
        {TABS.map(({ label, href }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className="relative flex items-center gap-2 p-3"
              aria-current={active ? "page" : undefined}
            >
              <span
                className={[
                  "uppercase tracking-wider font-noto",
                  "text-xl md:text-2xl",
                  active
                    ? "dark:text-slate-100 text-slate-900 font-semibold"
                    : "dark:text-slate-300 text-slate-950",
                ].join(" ")}
              >
                {label}
              </span>

              {/* 활성 밑줄 */}
              {active && (
                <motion.span
                  layoutId="tabs-underline"
                  className="absolute -bottom-px left-0 h-0.5 w-full dark:bg-white bg-black"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
