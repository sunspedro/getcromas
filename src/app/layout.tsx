import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../assets/scss/globals.scss";
import { Fraunces, Karla } from "next/font/google";
import { JsonLd } from "../components/JsonLd";
import { getBaseUrl, siteConfig } from "../lib/siteUrl";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-heading" });
const karla = Karla({ subsets: ["latin"], variable: "--font-body" });

export const metadata: Metadata = {
    metadataBase: new URL(getBaseUrl()),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
        canonical: "/",
    },
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: "/",
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
    },
    twitter: {
        card: "summary_large_image",
        title: siteConfig.title,
        description: siteConfig.description,
    },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html lang="pt-BR">
            <body className={`${fraunces.variable} ${karla.variable}`}>
                <JsonLd />
                {children}
                <SpeedInsights />
            </body>
        </html>
    );
}
