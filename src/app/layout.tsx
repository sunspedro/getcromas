import type { Metadata } from "next";
import "./globals.scss";
import { Fraunces, Karla } from 'next/font/google';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-heading' });
const karla = Karla({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: "Croma — Gerador de Paletas com IA",
  description: "Descreva seu projeto em poucas palavras e receba paleta de cores, tipografia e moodboard visual gerados por IA. Direção de design em segundos, sem precisar ser designer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
    >
      <body className={`${fraunces.variable} ${karla.variable}`}>{children}</body>
    </html>
  );
}
