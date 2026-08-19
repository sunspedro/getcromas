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
                    style={{ "--color-hash": color.hash } as React.CSSProperties}
                >
                    <motion.div
                        className="results__colors__list-overlay"
                        variants={{
                            initial: { scaleX: 0 },
                            hover: { scaleX: 1 },
                        }}
                        transition={{
                            duration: 0.45,
                            ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                            background: `linear-gradient(to left, ${color.hash} 10%, transparent 90%)`,
                        }}
                    />

                    <div className="results__colors__list-info">
                        <div className="results__colors__list-heading">
                            <span
                                className="results__colors__list-swatch"
                                aria-hidden="true"
                            />
                            <strong>
                                {color.label} - {color.name}
                            </strong>
                        </div>
                        <p>{color.hash}</p>
                    </div>
                </motion.div>
            ))}
        </>
    );
};
