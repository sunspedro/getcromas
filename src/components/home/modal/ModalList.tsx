import { motion } from "motion/react";
import { ModalListItem } from "./ModalListItem";
const containerVariants = {
    hidden: {
        opacity: 0,
    },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.5,
        },
    },
};

export const ModalList = () => {
    return (
        <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="home__modal__text__list">
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
        </motion.ul>
    );
};
