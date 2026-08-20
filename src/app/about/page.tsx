import type { Metadata } from "next";
import Link from "next/link";
import { getBaseUrl, siteConfig } from "../../lib/siteUrl";
import { AboutContactLinks } from "../../components/about/AboutContactLinks";

const aboutDescription =
    "Conheça o Croma: um gerador de paletas de cores com IA criado para transformar briefings em direção visual coerente, acessível e pronta para interfaces web.";

export const metadata: Metadata = {
    title: "Sobre",
    description: aboutDescription,
    alternates: {
        canonical: "/about",
    },
    openGraph: {
        title: `Sobre | ${siteConfig.name}`,
        description: aboutDescription,
        url: "/about",
    },
};

export default function AboutPage() {
    const baseUrl = getBaseUrl();

    const aboutSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: `Sobre — ${siteConfig.name}`,
        url: `${baseUrl}/about`,
        description: aboutDescription,
        isPartOf: {
            "@type": "WebSite",
            name: siteConfig.name,
            url: baseUrl,
        },
    };

    return (
        <div className="about">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
            />
            <header className="about__header">
                <Link href="/" className="about__back">
                    ← Voltar
                </Link>
            </header>
            <main className="about__main">
                <p className="about__label">Sobre o projeto</p>
                <h1 className="about__title">Croma — gerador de paletas com IA</h1>
                <div className="about__content">
                    <p>
                        O Croma nasceu de uma necessidade simples: transformar um briefing textual
                        em direção de cor utilizável para interfaces web, sem exigir domínio avançado
                        de teoria das cores ou ferramentas complexas de design.
                    </p>
                    <p>
                        A ferramenta interpreta o contexto do seu projeto — segmento, sensação,
                        estilo — e gera cinco cores com funções definidas, análise de contraste
                        WCAG, explicação do raciocínio e referências visuais para aprofundar a
                        direção criativa.
                    </p>
                    <p>
                        O foco é entregar um ponto de partida sólido para sites, apps e landing
                        pages: hierarquia visual, legibilidade e identidade coerente com o briefing,
                        em segundos.
                    </p>
                </div>
                <section className="about__author" aria-labelledby="about-author-title">
                    <h2 id="about-author-title" className="about__subtitle">
                        Quem fez
                    </h2>
                    <p>
                        Projeto criado por{" "}
                        <a
                            href="https://br.linkedin.com/in/pedro-battasini"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Pedro Battasini
                        </a>
                        , designer e desenvolvedor web interessado em ferramentas que aproximam
                        decisões de design de quem está construindo produtos digitais.
                    </p>
                </section>
                <section className="about__contact" aria-labelledby="about-contact-title">
                    <h2 id="about-contact-title" className="about__subtitle">
                        Contato
                    </h2>
                    <AboutContactLinks />
                </section>
            </main>
        </div>
    );
}
