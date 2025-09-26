// app/fonts.ts
import { Source_Code_Pro, Noto_Sans_KR } from "next/font/google";

export const sourceCodePro = Source_Code_Pro({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-sourcecodepro",
});

export const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-noto-sans-kr",
});
