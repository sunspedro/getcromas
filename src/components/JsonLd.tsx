import { getBaseUrl, siteConfig } from "../lib/siteUrl";

export function JsonLd() {
    const baseUrl = getBaseUrl();

    const schema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: siteConfig.name,
        url: baseUrl,
        description: siteConfig.description,
        applicationCategory: siteConfig.applicationCategory,
        operatingSystem: "Web",
        offers: {
            "@type": "Offer",
            price: "0",
            priceCurrency: "BRL",
        },
        inLanguage: "pt-BR",
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
    );
}
