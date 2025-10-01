import ThemeProvider from "../../component/ThemeProvider";
import Header from "../../component/Header";
import ProfileCard from "../../component/ProfileCard";
import TopTabs from "../../component/Toptabs";


export default function HomeLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
        <Header />
        <div className="h-6"></div>
        <main className="mx-auto max-w-5xl px-4">
          <div className="mx-auto max-w-4xl flex justify-start">
            <ProfileCard />
          </div>

          <div className="mx-auto max-w-4xl">
            <TopTabs />
          </div>

          <section className="py-8">{children}</section>
        </main>
    </section>
  );
}
