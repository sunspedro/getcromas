import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "../assets/scss/globals.scss";
import { Fraunces, Karla } from "next/font/google";
import { JsonLd } from "../components/JsonLd";
import { getBaseUrl, siteConfig } from "../lib/siteUrl";

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-heading" });
const karla = Karla({ subsets: ["latin"], variable: "--font-body" });

const siteUrl = getBaseUrl();

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteConfig.title,
        template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    alternates: {
        canonical: siteUrl,
    },
    openGraph: {
        type: "website",
        locale: siteConfig.locale,
        url: siteUrl,
        siteName: siteConfig.name,
        title: siteConfig.title,
        description: siteConfig.description,
        images: [
            {
                url: `${siteUrl}/opengraph-image`,
                width: 1200,
                height: 630,
                alt: siteConfig.title,
            },
        ],
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
