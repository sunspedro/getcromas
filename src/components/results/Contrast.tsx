import { motion } from "motion/react";

interface IContrastItem {
    label: string;
    contrast: string | number;
    situation: "Aprovado" | "Reprovado" | string;
}

interface IContrast {
    lista: IContrastItem[];
}

export const Contrast = ({lista}: IContrast) => {
    return (
        <div className="results__content__contrast">
            <div className="results__content__contrast__text">
                <p className="title">Validação de Contraste (WCAG)</p>
                <p className="description">
                    Testamos as principais combinações da paleta contra os critérios mínimos de acessibilidade (WCAG AA), garantindo que texto e elementos de
                    interface permaneçam legíveis em qualquer contexto de uso. Clique para ver mais!
                </p>
            </div>
            <ul className="results__content__contrast__list">
                {lista.map((item) => (
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
    );
};
