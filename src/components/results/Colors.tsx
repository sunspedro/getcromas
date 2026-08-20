"use client";

import { useState } from "react";

interface IColorsItems {
    label: string;
    name: string;
    hash: string;
}

interface IColors {
    list: IColorsItems[];
}

export const Colors = ({ list }: IColors) => {
    const [copiedLabel, setCopiedLabel] = useState<string | null>(null);

    const handleCopy = async (color: IColorsItems) => {
        try {
            await navigator.clipboard.writeText(color.hash);
            setCopiedLabel(color.label);
            setTimeout(() => setCopiedLabel(null), 1500);
        } catch {
            /* clipboard unavailable */
        }
    };

    return (
        <>
            {list.map((color) => (
                <button
                    key={color.label}
                    type="button"
                    className={`results__colors__list${copiedLabel === color.label ? " is-copied" : ""}`}
                    style={{ "--color-hash": color.hash } as React.CSSProperties}
                    onClick={() => handleCopy(color)}
                    aria-label={`Copiar cor ${color.name} (${color.hash})`}
                >
                    <div className="results__colors__list-overlay" aria-hidden="true" />

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
                        <p>{copiedLabel === color.label ? "Copiado!" : color.hash}</p>
                    </div>
                </button>
            ))}
        </>
    );
};
