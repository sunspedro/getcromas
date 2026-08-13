"use client";

import { useState } from "react";
import { motion } from "motion/react";

export const SearchInput = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
    const [value, setValue] = useState("");
    const [loading, setLoading] = useState(false);

    const handleGenerate = async () => {
        if (!value.trim()) {
            return;
        }
        setLoading(true);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key == "Enter") {
            handleGenerate();
            onSubmit(value)
        }
    };

    return (
        <motion.div whileTap={loading ? '': {scale: 0.9} } transition={{ease: "easeOut", duration: 0.2}} className="home__search__input-wrapper">
            <input
                type="text"
                className="home__search__input-wrapper__input"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                required
                placeholder="Digite o que deseja buscar"
            />
            <svg  className="home__search__input-wrapper__search-input" viewBox="0 0 24 24" fill="none">
                <path
                    d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                    strokeLinecap="round"
                ></path>
            </svg>
        </motion.div>
    );
};
