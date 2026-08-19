"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { Palette } from "../../types/palette";
import { PalettePreviewLanding } from "./PalettePreviewLanding";
import { PalettePreviewModal } from "./modal/PalettePreviewModal";

interface PalettePreviewPanelProps {
    title: string;
    colors: Palette["colors"];
}

export const PalettePreviewPanel = ({ title, colors }: PalettePreviewPanelProps) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="results__references__preview">
            <h3 className="results__references__title">Veja aplicado</h3>

            <div className="results__references__preview-frame">
                <PalettePreviewLanding title={title} colors={colors} compact />
            </div>

            <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="results__references__preview-trigger"
                onClick={() => setOpen(true)}
            >
                Ver aplicado
            </motion.button>

            <AnimatePresence>
                {open && (
                    <PalettePreviewModal
                        title={title}
                        colors={colors}
                        onClose={() => setOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};
