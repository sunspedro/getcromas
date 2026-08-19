"use client";

import { motion, AnimatePresence, Variants } from "motion/react";
import { useState } from "react";
import { FloatModalLinks } from "./general/FloatModalLinks";

const navVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.38,
            ease: [0.22, 1, 0.36, 1],
            staggerChildren: 0.07,
            staggerDirection: -1,
        },
    },
    exit: {
        opacity: 0,
        y: 12,
        transition: {
            duration: 0.22,
            ease: [0.4, 0, 1, 1],
            staggerChildren: 0.04,
        },
    },
};

export const FloatModal = () => {
    const [modal, setModal] = useState(false);

    return (
        <div className="float-modal">
            <AnimatePresence>
                {modal && (
                    <motion.nav
                        key="nav"
                        className="float-modal__nav"
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        aria-label="Contato"
                    >
                        <FloatModalLinks />
                    </motion.nav>
                )}
            </AnimatePresence>
            <motion.button
                type="button"
                className={modal ? "float-modal__trigger active" : "float-modal__trigger"}
                onClick={() => setModal((prev) => !prev)}
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.94 }}
                transition={{ type: "spring", stiffness: 400, damping: 24 }}
                aria-expanded={modal}
                aria-label={modal ? "Fechar contato" : "Abrir contato"}
            >
                <span className="float-modal__trigger-icon" />
            </motion.button>
        </div>
    );
};
