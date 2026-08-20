"use client";

import type { SavedPalette } from "../../types/palette";
import { PaletteCard } from "./PaletteCard";

interface HistoryViewProps {
    items: SavedPalette[];
    notice?: string | null;
    onOpen: (item: SavedPalette) => void;
    onPin: (id: string) => void;
    onUnpin: (id: string) => void;
    onDelete: (id: string) => void;
}

export const HistoryView = ({
    items,
    notice,
    onOpen,
    onPin,
    onUnpin,
    onDelete,
}: HistoryViewProps) => {
    return (
        <section className="history">
            <header className="history__header">
                <div className="history__copy">
                    <p className="history__label">Biblioteca local</p>
                    <h2 className="history__title">Paletas geradas</h2>
                </div>
            </header>
            {notice && <p className="history__notice">{notice}</p>}
            {items.length === 0 ? (
                <p className="history__empty">Nenhuma paleta ainda.</p>
            ) : (
                <div className="history__grid">
                    {items.map((item) => (
                        <PaletteCard
                            key={item.id}
                            item={item}
                            variant="full"
                            onOpen={onOpen}
                            onPin={onPin}
                            onUnpin={onUnpin}
                            onDelete={onDelete}
                        />
                    ))}
                </div>
            )}
        </section>
    );
};
