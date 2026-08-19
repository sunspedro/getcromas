"use client";

import { motion, type Variants } from "motion/react";

const SWATCHES = ["#ff9178", "#ffaf87", "#ffc8aa", "#2b1810", "#fff8f3"];

const overlayVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
    exit: {
        opacity: 0,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
    },
};

const groupVariants: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.08, delayChildren: 0.18 },
    },
    exit: {
        transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
};

const swatchVariants: Variants = {
    hidden: { scale: 0, y: 18, opacity: 0 },
    visible: {
        scale: 1,
        y: 0,
        opacity: 1,
        transition: { type: "spring", stiffness: 280, damping: 18 },
    },
    exit: {
        scale: 0.6,
        y: 10,
        opacity: 0,
        transition: { duration: 0.2 },
    },
};

const textVariants: Variants = {
    hidden: { opacity: 0, y: 12 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
    exit: { opacity: 0, y: 8, transition: { duration: 0.2 } },
};

export const HomeLoading = () => {
    return (
        <motion.div
            className="home__loading"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="status"
            aria-live="polite"
            aria-busy="true"
        >
            <div className="home__loading__content">
                <motion.div className="home__loading__swatches" variants={groupVariants} aria-hidden="true">
                    {SWATCHES.map((color) => (
                        <motion.span key={color} className="home__loading__swatch" variants={swatchVariants}>
                            <span
                                className="home__loading__swatch-dot"
                                style={{ backgroundColor: color }}
                            />
                        </motion.span>
                    ))}
                </motion.div>
                <motion.p className="home__loading__text" variants={textVariants}>
                    Gerando paleta...
                </motion.p>
            </div>
        </motion.div>
    );
};
