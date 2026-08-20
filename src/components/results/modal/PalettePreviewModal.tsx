"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion } from "motion/react";
import type { Palette } from "../../../types/palette";
import { useBodyScrollLock } from "../../../hooks/useBodyScrollLock";
import { PalettePreviewLanding } from "../PalettePreviewLanding";

interface PalettePreviewModalProps {
    title: string;
    colors: Palette["colors"];
    onClose: () => void;
}

export const PalettePreviewModal = ({
    title,
    colors,
    onClose,
}: PalettePreviewModalProps) => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        document.addEventListener("keydown", handleKeyDown);

        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    useBodyScrollLock();

    return createPortal(
        <motion.div
            className="palette-preview-modal__overlay"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
        >
            <motion.div
                className="palette-preview-modal"
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.98 }}
                transition={{ type: "spring", stiffness: 280, damping: 26 }}
                onClick={(event) => event.stopPropagation()}
                role="dialog"
                aria-modal="true"
                aria-label="Paleta aplicada"
            >
                <div className="palette-preview-modal__header">
                    <h3 className="palette-preview-modal__title">Paleta aplicada</h3>
                    <p className="palette-preview-modal__subtitle">
                        Exemplo de landing usando as cores geradas para este briefing.
                    </p>
                </div>

                <div className="palette-preview-modal__content">
                    <PalettePreviewLanding title={title} colors={colors} />
                </div>

                <motion.button
                    type="button"
                    whileHover={{ scale: 1.1 }}
                    className="palette-preview-modal__close"
                    onClick={onClose}
                    aria-label="Fechar preview"
                >
                    <svg viewBox="0 0 24 24" fill="none" height={32} width={32}>
                        <path
                            d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </motion.button>
            </motion.div>
        </motion.div>,
        document.body,
    );
};
