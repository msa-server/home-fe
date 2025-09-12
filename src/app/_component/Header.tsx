import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="border-b">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-center">
        <Link href="/" className="text-3xl font-sourcecodepro font-bold">
          bienew's blog
        </Link>

        <ThemeToggle />
      </div>
    </header>
  );
}
