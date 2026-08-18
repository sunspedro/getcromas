import { Palette } from "../types/palette";
import { motion } from "motion/react";

interface ResultsViewProps {
    pergunta: string;
    palette: Palette;
}

export const ResultsView = ({ pergunta, palette }: ResultsViewProps) => {
    return (
        <div className="results">
            <div className="results__intro">
                <p className="results__intro__badge">{pergunta}</p>
                <h2 className="results__intro__title">{palette.title}</h2>
            </div>
            <div className="results__colors">
                {palette.colors.map((color) => (
                    <motion.div
                        key={color.label}
                        initial="initial"
                        whileHover="hover"
                        className="results__colors__list"
                        style={{
                            position: "relative",
                            overflow: "hidden",
                        }}
                    >
                        <motion.div
                            variants={{
                                initial: { scaleX: 0 },
                                hover: { scaleX: 1 },
                            }}
                            transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                            }}
                            style={{
                                position: "absolute",
                                inset: 0,
                                background: `linear-gradient(to left, ${color.hash} 10%, transparent 90%)`,
                                transformOrigin: "right center",
                            }}
                        />

                        <strong style={{ position: "relative", zIndex: 1 }}>
                            {color.label} - {color.name}
                        </strong>

                        <p style={{ position: "relative", zIndex: 1 }}>{color.hash}</p>
                    </motion.div>
                ))}
            </div>
            <div className="results__content">
                <div className="results__content__text">
                    <p className="results__content__text__title">Resumo da paleta</p>
                    <p className="results__content__text__description">{palette.description}</p>
                </div>
                <div className="results__content__contrast">
                    <div className="results__content__contrast__text">
                        <p className="title">Validação de Contraste (WCAG)</p>
                        <p className="description">
                            Testamos as principais combinações da paleta contra os critérios mínimos de acessibilidade (WCAG AA), garantindo que texto e
                            elementos de interface permaneçam legíveis em qualquer contexto de uso. Clique para ver mais!
                        </p>
                    </div>
                    {/* abrir modal exemplificando */}
                    <ul className="results__content__contrast__list">
                        {palette.contrast.map((item) => (
                            <motion.li
                                initial={
                                    item.situation === "Aprovado"
                                        ? { background: "linear-gradient(to left, #27ae60 0%, #fff 20%)" }
                                        : { background: "linear-gradient(to left, #e74c3c 0%, #fff 20%)" }
                                }
                                whileHover={{ scale: 0.9, cursor: "pointer" }}
                                key={item.label}
                            >
                                {item.label}: {item.contrast} — {item.situation}
                            </motion.li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="results__final">
                <div className="results__final__points">
                    <div>
                        <h3 className="results__final__points__title">Pontos positivos</h3>
                        <ul>
                            {palette.points.positive.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="results__final__points__title">Pontos de atenção</h3>
                        <ul>
                            {palette.points.negative.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="results__references">
                <h3 className="results__references__title">Referências</h3>
                <ul className="results__references__list">
                    {palette.references.map((ref) => (
                        <motion.li
                            initial={{ borderRadius: "12px 0px 12px 0px" }}
                            whileHover={{ borderRadius: "12px 12px 0px 0px", borderBottom: "2px solid #2b1810" }}
                            transition={{ type: "spring", stiffness: 500, damping: 50 }}
                            className="results__references__list__item"
                            key={ref.title}
                        >
                            {ref.url.trim() ? (
                                <a href={ref.url} target="_blank" rel="noreferrer">
                                    {ref.title} — {ref.type}
                                </a>
                            ) : (
                                <span>
                                    {ref.title} — {ref.type}
                                </span>
                            )}
                            <p>{ref.why}</p>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
