import { motion, Variants } from "motion/react";

export const IntroInfo = () => {
    const texto = "Descreva seu projeto e receba uma paleta com IA";
    const palavras = texto.split(" ");

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.08,
            },
        },
    };

    const childVariants: Variants = {
        hidden: { opacity: 0, y: -20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 400,
                damping: 15,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "6px",
                justifyContent: "center",
                alignItems: "center",
                paddingInline: "20px"
            }}
        >
            {palavras.map((palavra, index) => (
                <motion.span className="home__intro__info" key={index} variants={childVariants}>
                    {palavra}
                </motion.span>
            ))}
        </motion.div>
    );
};
