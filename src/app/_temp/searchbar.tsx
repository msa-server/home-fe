// components/SearchHero.tsx
import Image from "next/image";
import Link from "next/link";

export default function SearchHero() {
  return (
    <section className="relative h-64 w-full overflow-hidden">
      {/* 배경 이미지 */}
      <Image
        src="/hero-cat.jpg" // 배경 이미지 경로로 교체
        alt=""
        fill
        priority
        className="object-cover"
      />

      {/* 살짝 어둡게 */}
      <div className="absolute inset-0 bg-black/20" />

      {/* 장식용 곡선 웨이브 (옵션) */}
      <svg
        className="absolute -bottom-10 left-0 w-[140%] opacity-60"
        viewBox="0 0 1440 320" aria-hidden
      >
        <path
          fill="white"
          d="M0,160L60,149.3C120,139,240,117,360,133.3C480,149,600,203,720,202.7C840,203,960,149,1080,138.7C1200,128,1320,160,1380,176L1440,192L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        />
      </svg>

      {/* 중앙 검색바 */}
      <div className="absolute inset-0 grid place-items-center px-4">
        <form
          action="/search"
          className="w-full max-w-5xl rounded-full shadow-xl ring-1 ring-white/40 
                     bg-white/50 backdrop-blur-md overflow-hidden
                     supports-[backdrop-filter]:bg-white/30"
        >
          <div className="flex items-stretch">
            <input
              type="search"
              name="q"
              placeholder="What are you looking for?"
              className="flex-1 bg-transparent placeholder:text-gray-600/80
                         text-gray-800 md:text-2xl text-lg
                         px-6 py-4 md:py-5 focus:outline-none"
              aria-label="Search"
              autoComplete="off"
            />
            <button
              type="submit"
              className="px-6 md:px-10 md:text-xl text-base font-medium text-white
                         bg-rose-500 hover:bg-rose-600 active:bg-rose-700
                         transition-colors rounded-l-none rounded-r-full"
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
