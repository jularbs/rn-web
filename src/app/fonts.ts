import { Karla, Open_Sans } from "next/font/google";

export const open_sans = Open_Sans({
  variable: "--font-open-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const karla = Karla({
  variable: "--font-karla",
  display: "swap",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});
