import type { Metadata } from "next";
import { Montserrat, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "RoyalHorse - Елитен Конно-Спортен Комплекс Бургас | Ченгене Скеле",
  description:
    "Добре дошли в конна база RoyalHorse Бургас. Предлагаме професионално обучение по езда за деца и възрастни, разходки сред природата, АТВ под наем, руска баня и хотел за домашни любимци в Странджа планина.",
  keywords: [
    "конна база бургас",
    "езда бургас",
    "конна езда",
    "бургас езда деца",
    "ченгене скеле",
    "royal horse",
    "royalhorse",
    "хотел за домашни любимци",
    "руска баня",
    "атв бургас",
  ],
  openGraph: {
    title: "RoyalHorse - Елитен Конно-Спортен Комплекс Бургас",
    description:
      "Обучение по езда, разходки в Странджа планина и луксозни услуги до Рибарското селище.",
    url: "http://royalhorse.bg",
    siteName: "RoyalHorse Club",
    locale: "bg_BG",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="bg"
      className={`${montserrat.variable} ${cormorantGaramond.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-[#FCFBF9] text-[#111111]">
        {children}
      </body>
    </html>
  );
}
