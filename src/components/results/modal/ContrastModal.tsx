import { motion } from "motion/react";
import type { Palette } from "../../../types/palette";
import { resolveContrastPair } from "../resolveContrastPair";

type ContrastItem = Palette["contrast"][number];
type PaletteColor = Palette["colors"][number];

interface ContrastModalProps {
    item: ContrastItem;
    colors: PaletteColor[];
    pair?: [PaletteColor, PaletteColor] | null;
}

export const ContrastModal = ({ item, colors, pair: pairProp }: ContrastModalProps) => {
    const pair = pairProp ?? resolveContrastPair(item.label, colors);

    if (!pair) {
        return null;
    }

    const [first, second] = pair;

    return (
        <motion.div
            className="contrast-modal"
            initial={{ opacity: 0, y: 6, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 6, scale: 0.94 }}
            transition={{ type: "spring", stiffness: 340, damping: 26 }}
            onClick={(event) => event.stopPropagation()}
        >
            <p className="contrast-modal__title">{item.label}</p>
            <div className="contrast-modal__content">
                <div
                    className="contrast-modal__sample"
                    style={{ backgroundColor: first.hash, color: second.hash }}
                >
                    Título
                </div>
                <div
                    className="contrast-modal__sample"
                    style={{ backgroundColor: second.hash, color: first.hash }}
                >
                    Título
                </div>
            </div>
        </motion.div>
    );
};
