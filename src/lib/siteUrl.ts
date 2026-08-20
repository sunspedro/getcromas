export const productionSiteUrl = "https://getcromas.com.br";

export function getBaseUrl(): string {
    if (process.env.NEXT_PUBLIC_SITE_URL) {
        return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
    }

    if (process.env.NODE_ENV === "development") {
        return "http://localhost:3000";
    }

    return productionSiteUrl;
}

export const siteConfig = {
    name: "Croma",
    title: "Croma — Gerador de Paletas com IA",
    description:
        "Descreva seu projeto em poucas palavras e receba uma paleta de 5 cores com funções definidas, análise de contraste WCAG, pontos positivos e referências visuais geradas por IA.",
    locale: "pt_BR",
    applicationCategory: "DesignApplication",
} as const;
