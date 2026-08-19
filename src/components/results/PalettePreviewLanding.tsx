import type { Palette } from "../../types/palette";
import { getPaletteTheme } from "./resolvePaletteColor";

interface PalettePreviewLandingProps {
    title: string;
    colors: Palette["colors"];
    compact?: boolean;
}

export const PalettePreviewLanding = ({
    title,
    colors,
    compact = false,
}: PalettePreviewLandingProps) => {
    const theme = getPaletteTheme(colors);
    const rootClass = compact
        ? "palette-preview-landing palette-preview-landing--compact"
        : "palette-preview-landing";

    return (
        <div
            className={rootClass}
            style={{
                backgroundColor: theme.background,
                color: theme.text,
            }}
        >
            <header
                className="palette-preview-landing__header"
                style={{ borderColor: theme.secondary }}
            >
                <span
                    className="palette-preview-landing__logo"
                    style={{ backgroundColor: theme.primary }}
                />
                <nav className="palette-preview-landing__nav" aria-hidden="true">
                    <span>Início</span>
                    <span>Sobre</span>
                    <span>Contato</span>
                </nav>
            </header>

            <section className="palette-preview-landing__hero">
                <h2 className="palette-preview-landing__hero-title">{title}</h2>
                <p className="palette-preview-landing__hero-subtitle">
                    Direção visual pensada para o seu projeto, com hierarquia clara e contraste funcional.
                </p>
                <button
                    type="button"
                    className="palette-preview-landing__cta"
                    style={{
                        backgroundColor: theme.primary,
                        color: theme.background,
                    }}
                >
                    Começar agora
                </button>
            </section>

            <section className="palette-preview-landing__cards">
                {["Clareza", "Identidade", "Contraste"].map((cardTitle, index) => (
                    <article
                        key={cardTitle}
                        className="palette-preview-landing__card"
                        style={{
                            backgroundColor:
                                index === 1 ? theme.secondary : theme.background,
                            borderColor: theme.accent,
                            color: theme.text,
                        }}
                    >
                        <span
                            className="palette-preview-landing__card-badge"
                            style={{ backgroundColor: theme.accent, color: theme.text }}
                        >
                            0{index + 1}
                        </span>
                        <h3>{cardTitle}</h3>
                        <p>Exemplo de bloco de conteúdo com a paleta aplicada.</p>
                    </article>
                ))}
            </section>
        </div>
    );
};
