"use client";

import React, { useLayoutEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export const SearchInput = ({
    onSubmit,
    loading = false,
}: {
    onSubmit: (value: string) => Promise<void>;
    loading?: boolean;
}) => {
    const [value, setValue] = useState("");
    const [search, setSearch] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const syncHeight = () => {
        const el = textareaRef.current;

        if (!el) {
            return;
        }

        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
        el.style.overflowY = el.scrollHeight > el.clientHeight ? "auto" : "hidden";
    };

    useLayoutEffect(() => {
        syncHeight();
    }, [value, loading]);

    const handleGenerate = async () => {
        if (!value.trim() || loading) {
            return;
        }
        await onSubmit(value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleGenerate();
            setSearch(0);
        }
    };

    return (
        <div className="home__search__input-wrapper">
            <motion.textarea
                ref={textareaRef}
                rows={1}
                className="home__search__input-wrapper__input"
                value={value}
                whileFocus={{ scale: 1.05 }}
                onFocus={() => setSearch(10)}
                onBlur={() => setSearch(0)}
                onChange={(e) => setValue(e.target.value)}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                onKeyDown={handleKeyDown}
                disabled={loading}
                required
                placeholder={loading ? "Gerando paleta..." : "Digite o que deseja buscar"}
            />
            <motion.button
                animate={{ x: search }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                type="button"
                className="home__search__input-wrapper__search-button"
                onClick={handleGenerate}
                disabled={loading}
            >
                <svg className="home__search__input-wrapper__search-input" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </motion.button>
        </div>
    );
};
