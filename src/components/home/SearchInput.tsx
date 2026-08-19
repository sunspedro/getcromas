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
    const [focused, setFocused] = useState(false);
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
        }
    };

    return (
        <motion.div
            className="home__search__input-wrapper"
            animate={{ scale: focused ? 1.05 : 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
        >
            <textarea
                ref={textareaRef}
                rows={1}
                className="home__search__input-wrapper__input"
                value={value}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                required
                placeholder={loading ? "Gerando paleta..." : "Digite o que deseja buscar"}
            />
            <button
                type="button"
                aria-label="Buscar"
                className="home__search__input-wrapper__search-button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={handleGenerate}
                disabled={loading}
            >
                <svg className="home__search__input-wrapper__search-input" viewBox="0 0 24 24" fill="none">
                    <path
                        d="M15.7955 15.8111L21 21M18 10.5C18 14.6421 14.6421 18 10.5 18C6.35786 18 3 14.6421 3 10.5C3 6.35786 6.35786 3 10.5 3C14.6421 3 18 6.35786 18 10.5Z"
                        strokeLinecap="round"
                    ></path>
                </svg>
            </button>
        </motion.div>
    );
};
