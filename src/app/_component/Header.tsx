import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="shadow-sm dark:shadow-[0_2px_4px_rgba(255,255,255,0.1)]">
      <div className="relative mx-auto max-w-5xl px-4 py-3 grid grid-cols-3 items-center">
        <div />
        <Link href="/" className="justify-self-center whitespace-nowrap sm:text-3xl text-2xl font-sourcecodepro font-bold text-black dark:text-gray-100">
          bienew's blog
        </Link>
        <div className="justify-self-end" >
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
