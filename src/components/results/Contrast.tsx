"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Palette } from "../../types/palette";
import { ContrastModal } from "./modal/ContrastModal";

interface IContrast {
    lista: Palette["contrast"];
    colors: Palette["colors"];
}

export const Contrast = ({ lista, colors }: IContrast) => {
    const [openLabel, setOpenLabel] = useState<string | null>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (!openLabel) {
            return;
        }

        const onPointerDown = (event: PointerEvent) => {
            if (listRef.current?.contains(event.target as Node)) {
                return;
            }

            setOpenLabel(null);
        };

        document.addEventListener("pointerdown", onPointerDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
        };
    }, [openLabel]);

    return (
        <div className="results__content__contrast">
            <div className="results__content__contrast__text">
                <p className="title">Validação de Contraste (WCAG)</p>
                <p className="description">
                    Testamos as principais combinações da paleta contra os critérios mínimos de acessibilidade (WCAG AA), garantindo que texto e elementos de
                    interface permaneçam legíveis em qualquer contexto de uso. Clique para ver mais!
                </p>
            </div>
            <ul ref={listRef} className="results__content__contrast__list">
                {lista.map((item) => (
                    <motion.li
                        className={openLabel === item.label ? "is-open" : undefined}
                        onClick={() => setOpenLabel((prev) => (prev === item.label ? null : item.label))}
                        initial={
                            item.situation === "Aprovado"
                                ? { background: "linear-gradient(to left, #27ae60 0%, #fff 20%)" }
                                : { background: "linear-gradient(to left, #e74c3c 0%, #fff 20%)" }
                        }
                        whileHover={openLabel === item.label ? { cursor: "pointer" } : { scale: 0.9, cursor: "pointer" }}
                        key={item.label}
                    >
                        {item.label}: {item.contrast} — {item.situation}
                        <AnimatePresence>
                            {openLabel === item.label && <ContrastModal item={item} colors={colors} />}
                        </AnimatePresence>
                    </motion.li>
                ))}
            </ul>
        </div>
    );
};
