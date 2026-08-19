import { motion } from "motion/react";

interface IModalListItem {
    badge: string;
    title: string;
    description: string;
}
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};
export const ModalListItem = ({ badge, title, description }: IModalListItem) => {
    return (
        <motion.li variants={itemVariants} className="item">
            <p className="item--badge">{badge}</p>
            <p className="item--title">{title}</p>
            <p className="item--description">{description}</p>
        </motion.li>
    );
};
