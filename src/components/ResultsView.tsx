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
                        initial={{ background: `linear-gradient(to left, transparent 90%, ${color.hash} 10%)` }}
                        whileHover={{ background: `linear-gradient(to left, ${color.hash} 10%,transparent 90%)` }}
                        transition={{ type: "spring", stiffness: 150, damping: 15 }}
                        className="results__colors__list"
                    >
                        <strong>
                            {color.label} - {color.name}
                        </strong>
                        <p>{color.hash}</p>
                    </motion.div>
                ))}
            </div>
            <div className="results__text">
                <p className="results__text__description">{palette.description}</p>

                <ul className="results__text__contrast">
                    {palette.contrast.map((item) => (
                        <li key={item.label}>
                            {item.label}: {item.contrast} — {item.situation}
                        </li>
                    ))}
                </ul>
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
                        <li key={ref.title}>
                            <a href={ref.url} target="_blank" rel="noreferrer">
                                {ref.title}
                            </a>
                            <span> — {ref.type}</span>
                            <p>{ref.why}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
