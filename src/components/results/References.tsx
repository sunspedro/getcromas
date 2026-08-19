import { motion } from "motion/react";

interface IReferenceItem {
    title: string;
    url: string;
    type: string;
    why: string;
}

interface IReferences {
    references: IReferenceItem[];
}

export const References = ({references}: IReferences) => {
    return (
        <>
            <h3 className="results__references__title">Referências</h3>
            <ul className="results__references__list">
                {references.map((ref) => (
                    <motion.li
                        initial={{ borderRadius: "12px 0px 12px 0px" }}
                        whileHover={{ borderRadius: "12px 12px 0px 0px", borderBottom: "2px solid #2b1810" }}
                        transition={{ type: "spring", stiffness: 500, damping: 50 }}
                        className="results__references__list__item"
                        key={ref.title}
                    >
                        {ref.url.trim() ? (
                            <a href={ref.url} target="_blank" rel="noreferrer">
                                {ref.title} — {ref.type}
                            </a>
                        ) : (
                            <span>
                                {ref.title} — {ref.type}
                            </span>
                        )}
                        <p>{ref.why}</p>
                    </motion.li>
                ))}
            </ul>
        </>
    );
};
