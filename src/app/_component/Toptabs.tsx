// app/_components/TopTabs.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

type Tab = { label: string; href: string; count?: number };

const TABS: Tab[] = [
  { label: "POSTS", href: "/posts" },
  { label: "SERIES", href: "/series" },
];

export default function TopTabs() {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-4xl px-4">
      <div className="relative border-b border-gray-300">
        {/* 탭 행 */}
        <nav className="flex items-center justify-center gap-10">
          {TABS.map(({ label, href }) => {
            const active =
              pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                className="relative flex items-center gap-2 p-3"
                aria-current={active ? "page" : undefined}
              >
                <span
                  className={[
                    "uppercase tracking-wider",
                    "text-xl md:text-2xl",
                    active
                      ? "text-slate-100 font-semibold"
                      : "text-slate-300",
                  ].join(" ")}
                >
                  {label}
                </span>

                {/* 활성 밑줄 */}
                {active && (
                  <motion.span
                    layoutId="tabs-underline"
                    className="absolute -bottom-px left-0 h-0.5 w-full bg-slate-200"
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
    </div>
  );
}
