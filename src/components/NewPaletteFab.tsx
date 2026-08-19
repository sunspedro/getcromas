"use client";

import { AnimatePresence, motion } from "motion/react";

export const NewPaletteFab = ({
    visible,
    onClick,
}: {
    visible: boolean;
    onClick: () => void;
}) => {
    return (
        <AnimatePresence>
            {visible && (
                <motion.button
                    type="button"
                    className="new-palette-fab"
                    onClick={onClick}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.94 }}
                    transition={{ type: "spring", stiffness: 400, damping: 24 }}
                    aria-label="Nova paleta"
                >
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M12 5v14M5 12h14"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                        />
                    </svg>
                </motion.button>
            )}
        </AnimatePresence>
    );
};
