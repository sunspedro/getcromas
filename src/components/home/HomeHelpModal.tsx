import { motion } from "motion/react";
import { ModalIntro, ModalList, ModalListItem } from "./modal";

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
                    <ModalList>
                        <ModalListItem
                            badge="01"
                            title="Descreva seu projeto"
                            description='Conte pra ferramenta o que você está criando e o tom que imagina — "app de meditação, tom calmo" ou "cafeteria artesanal,
                                rústica e quente". Quanto mais específico, melhor a direção.'
                        />
                        <ModalListItem
                            badge="02"
                            title="Receba sua paleta"
                            description="Em segundos, a IA gera 5 cores com papel definido (base, texto, apoio, destaque, fundo), tipografia sugerida e a lógica por trás
                                de cada escolha — não é aleatório, é pensado pro seu contexto."
                        />
                        <ModalListItem
                            badge="03"
                            title="Veja aplicado, não só listado"
                            description="Cada paleta vem com um exemplo visual mostrando as cores em uma interface real, pra você sentir como ficaria antes de usar."
                        />
                        <ModalListItem
                            badge="04"
                            title="Refine até ficar perfeito"
                            description='Não gostou de algo? Descreve o ajuste — "mais escuro", "menos verde", "mais minimalista" — e a paleta se adapta, sem precisar
                                recomeçar do zero.'
                        />
                    </ModalList>
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
