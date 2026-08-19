import { motion } from "motion/react";

interface IColorsItems{
    label: string,
    name: string;
    hash: string;
}

interface IColors {
    list: IColorsItems[];
}

export const Colors = ({list}: IColors) => {
    return (
        <>
            {list.map((color) => (
                <motion.div
                    key={color.label}
                    initial="initial"
                    whileHover="hover"
                    className="results__colors__list"
                    style={{
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    <motion.div
                        variants={{
                            initial: { scaleX: 0 },
                            hover: { scaleX: 1 },
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            position: "absolute",
                            inset: 0,
                            background: `linear-gradient(to left, ${color.hash} 10%, transparent 90%)`,
                            transformOrigin: "right center",
                        }}
                    />

                    <strong style={{ position: "relative", zIndex: 1 }}>
                        {color.label} - {color.name}
                    </strong>

                    <p style={{ position: "relative", zIndex: 1 }}>{color.hash}</p>
                </motion.div>
            ))}
        </>
    );
};
