"use client";

import type { MouseEvent } from "react";
import type { SavedPalette } from "../../types/palette";

const formatDate = (value: number) =>
    new Date(value).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });

const PinIcon = ({ filled }: { filled: boolean }) => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M16 3H8l.8 7.2H6.5L12 21l5.5-10.8h-2.3L16 3Z"
            fill={filled ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinejoin="round"
        />
    </svg>
);

const TrashIcon = () => (
    <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
            d="M5 7h14M10 7V5h4v2M8.5 7l.8 12h5.4l.8-12"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

interface PaletteCardProps {
    item: SavedPalette;
    variant?: "compact" | "full";
    onOpen: (item: SavedPalette) => void;
    onPin?: (id: string) => void;
    onUnpin?: (id: string) => void;
    onDelete?: (id: string) => void;
}

export const PaletteCard = ({
    item,
    variant = "compact",
    onOpen,
    onPin,
    onUnpin,
    onDelete,
}: PaletteCardProps) => {
    const handlePin = (event: MouseEvent) => {
        event.stopPropagation();

        if (item.pinned) {
            onUnpin?.(item.id);
            return;
        }

        onPin?.(item.id);
    };

    const handleDelete = (event: MouseEvent) => {
        event.stopPropagation();

        if (!onDelete) {
            return;
        }

        const confirmed = window.confirm("Apagar esta paleta?");

        if (confirmed) {
            onDelete(item.id);
        }
    };

    return (
        <article className={`palette-card palette-card--${variant}`}>
            <button
                type="button"
                className="palette-card__open"
                onClick={() => onOpen(item)}
            >
                <div className="palette-card__swatches" aria-hidden="true">
                    {item.palette.colors.slice(0, 5).map((color) => (
                        <span
                            key={`${item.id}-${color.label}`}
                            className="palette-card__swatch"
                            style={{ backgroundColor: color.hash }}
                        />
                    ))}
                </div>
                <h3 className="palette-card__title">{item.palette.title}</h3>
                {variant === "full" && (
                    <>
                        <p className="palette-card__briefing">{item.briefing}</p>
                        <p className="palette-card__date">{formatDate(item.createdAt)}</p>
                    </>
                )}
            </button>
            {variant === "full" && (
                <div className="palette-card__actions">
                    <button
                        type="button"
                        className={`palette-card__action${item.pinned ? " palette-card__action--active" : ""}`}
                        onClick={handlePin}
                        aria-label={item.pinned ? "Desafixar paleta" : "Fixar paleta"}
                        aria-pressed={item.pinned}
                    >
                        <PinIcon filled={item.pinned} />
                    </button>
                    <button
                        type="button"
                        className="palette-card__action palette-card__action--danger"
                        onClick={handleDelete}
                        aria-label="Apagar paleta"
                    >
                        <TrashIcon />
                    </button>
                </div>
            )}
            {variant === "compact" && item.pinned && (
                <span className="palette-card__pin-badge" aria-label="Paleta fixada">
                    <PinIcon filled />
                </span>
            )}
        </article>
    );
};
