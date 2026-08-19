import { motion } from "motion/react";
import { ModalIntro, ModalList } from "./modal/_index";

export const HomeHelpModal = ({ onClose }: { onClose: () => void }) => {
    return (
        <div className="home__modal--overlay" onClick={onClose}>
            <motion.div
                className="home__modal"
                initial={{ y: 800 }}
                animate={{ y: 0 }}
                exit={{ y: 800 }}
                transition={{ type: "spring", stiffness: 50, damping: 16, duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="home__modal__text">
                    <ModalIntro />
                    <ModalList />
                </div>
                <div className="video">
                    <p>vou colocar um video mostrando o funcionamento</p>
                </div>
                <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="home__modal__close"
                    onClick={onClose}
                >
                    <svg viewBox="0 0 24 24" fill="none" height={32} width={32}>
                        <path
                            id="Vector"
                            d="M16 16L12 12M12 12L8 8M12 12L16 8M12 12L8 16"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        ></path>
                    </svg>
                </motion.div>
            </motion.div>
        </div>
    );
};
