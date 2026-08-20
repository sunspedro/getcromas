import Link from "next/link";

const features = [
    "5 cores com função definida: Background, Primary, Text, Secondary e Accent",
    "Análise de contraste WCAG com ratio e recomendação por combinação",
    "Descrição da paleta, pontos positivos, pontos de atenção e referências visuais",
    "Preview HTML para visualizar a paleta aplicada em uma interface",
];

const faq = [
    {
        question: "Como funciona?",
        answer: "Descreva seu projeto em linguagem natural — segmento, sensação ou estilo visual. A IA interpreta o briefing e gera uma paleta completa em segundos.",
    },
    {
        question: "Preciso ser designer?",
        answer: "Não. A ferramenta traduz seu briefing em direção de cor com papéis definidos, contraste avaliado e explicação do raciocínio por trás de cada escolha.",
    },
    {
        question: "As cores seguem WCAG?",
        answer: "Sim. Cada paleta inclui combinações avaliadas com ratio de contraste e indicação de uso recomendado ou não recomendado para texto.",
    },
    {
        question: "Posso salvar paletas geradas?",
        answer: "Sim. As paletas ficam salvas localmente no seu navegador para você revisitar, fixar ou apagar quando quiser.",
    },
];

export const SeoContent = () => {
    return (
        <section className="home__seo" aria-labelledby="home-seo-title">
            <div className="home__seo__intro">
                <h2 id="home-seo-title" className="home__seo__title">
                    Direção de cor para interfaces web
                </h2>
                <p className="home__seo__text">
                    O Croma é um gerador de paletas de cores com IA pensado para quem precisa de
                    identidade visual inicial sem dominar teoria das cores. Descreva o contexto do
                    seu projeto e receba um sistema cromático coerente, funcional e pronto para
                    aplicar em sites, apps e landing pages.
                </p>
                <p className="home__seo__text">
                    Cada resultado inclui cores com papéis claros, verificação de contraste,
                    análise de pontos fortes e limitações, além de referências visuais para
                    aprofundar a direção criativa.
                </p>
            </div>

            <div className="home__seo__block">
                <h3 className="home__seo__subtitle">O que você recebe</h3>
                <ul className="home__seo__list">
                    {features.map((feature) => (
                        <li key={feature}>{feature}</li>
                    ))}
                </ul>
            </div>

            <div className="home__seo__block">
                <h3 className="home__seo__subtitle">Perguntas frequentes</h3>
                <dl className="home__seo__faq">
                    {faq.map((item) => (
                        <div key={item.question} className="home__seo__faq-item">
                            <dt>{item.question}</dt>
                            <dd>{item.answer}</dd>
                        </div>
                    ))}
                </dl>
            </div>

            <p className="home__seo__about">
                <Link href="/about">Sobre o projeto</Link>
            </p>
        </section>
    );
};
