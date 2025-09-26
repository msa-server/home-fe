import "../globals.css";
import { sourceCodePro, notoSansKr } from "../_component/Font";
import ThemeProvider from "../_component/ThemeProvider";
import Header from "../_component/Header";
import { baseMetadata } from "../_component/Metadata";


export const metadata = baseMetadata;

export default function DetailLayout({children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sourceCodePro.variable} ${notoSansKr.variable} antialiased`}
      >
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
      </body>
    </html>
  );
}
