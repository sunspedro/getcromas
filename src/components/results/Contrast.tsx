"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Palette } from "../../types/palette";
import { ContrastModal } from "./modal/ContrastModal";
import { isContrastApproved, resolveContrastPair } from "./resolveContrastPair";

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
                <h3 className="results__content__contrast__text__title">Validação de Contraste (WCAG)</h3>
                <p className="results__content__contrast__text__description">
                    Testamos as principais combinações da paleta contra os critérios mínimos de acessibilidade (WCAG AA), garantindo que texto e elementos de
                    interface permaneçam legíveis em qualquer contexto de uso. Clique para ver mais!
                </p>
            </div>
            <ul ref={listRef} className="results__content__contrast__list">
                {lista.map((item) => {
                    const open = openLabel === item.label;
                    const approved = isContrastApproved(item.situation);
                    const pair = resolveContrastPair(item.label, colors);

                    return (
                        <motion.li
                            key={item.label}
                            className={`results__content__contrast__item${open ? " is-open" : ""}${approved ? " is-pass" : " is-fail"}`}
                            onClick={() => setOpenLabel((prev) => (prev === item.label ? null : item.label))}
                            role="button"
                            tabIndex={0}
                            aria-expanded={open}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    setOpenLabel((prev) => (prev === item.label ? null : item.label));
                                }
                            }}
                        >
                            {pair && (
                                <span className="results__content__contrast__item-swatches" aria-hidden="true">
                                    <span style={{ backgroundColor: pair[0].hash }} />
                                    <span style={{ backgroundColor: pair[1].hash }} />
                                </span>
                            )}
                            <span className="results__content__contrast__item-info">
                                <span className="results__content__contrast__item-label">{item.label}</span>
                                <span className="results__content__contrast__item-ratio">{item.contrast}</span>
                            </span>
                            <span className="results__content__contrast__item-status">{item.situation}</span>
                            <AnimatePresence>
                                {open && <ContrastModal item={item} colors={colors} pair={pair} />}
                            </AnimatePresence>
                        </motion.li>
                    );
                })}
            </ul>
        </div>
    );
};
