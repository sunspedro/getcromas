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
                    <div key={color.label} className="results__colors__list">
                        <strong>{color.label} - {color.name}</strong>
                        <p>{color.hash}</p>
                    </div>
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
                        <h3>Pontos positivos</h3>
                        <ul>
                            {palette.points.positive.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3>Pontos de atenção</h3>
                        <ul>
                            {palette.points.negative.map((point) => (
                                <li key={point}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <ul className="results__final__references">
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
