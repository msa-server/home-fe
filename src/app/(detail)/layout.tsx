import ThemeProvider from "../../component/ThemeProvider";
import Header from "../../component/Header";


export default function DetailLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <section>
      <ThemeProvider>
        <Header />
        <div className="h-6"></div>
        <main className="mx-auto max-w-5xl px-4">
          {/* <div className="mx-auto max-w-4xl flex justify-start">
              <ProfileCard />
            </div>

            <div className="mx-auto max-w-4xl">
              <TopTabs />
            </div> */}

          <section className="py-8">{children}</section>
        </main>
      </ThemeProvider>
    </section>
  );
}
