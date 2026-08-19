import { motion, AnimatePresence, Variants } from "motion/react";
import { useState } from "react";
import { FloatModalLinks } from "./general/FloatModalLinks";

const navVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, x: 15, scale: 0.6 },
    visible: {
        opacity: 1,
        x: 0,
        scale: 1,
        transition: { type: "spring", stiffness: 300, damping: 20 },
    },
    exit: { opacity: 0, x: 15, scale: 0.6 },
};

export const FloatModal = () => {
    const [modal, setModal] = useState(false);

    return (
        <motion.div
            layout
            initial={false}
            whileHover={!modal ? { scale: 1.05 } : {}}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
            className={modal ? "float-modal-trigger active" : "float-modal-trigger"}
            onClick={() => setModal((prev) => !prev)}
        >
            <AnimatePresence mode="popLayout">
                {!modal && (
                    <motion.div
                        key="icon"
                        className="float-modal-trigger__icon"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.15 }}
                    />
                )}

                {modal && (
                    <motion.div
                        key="nav"
                        className="float-modal__nav"
                        variants={navVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        <FloatModalLinks />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};
