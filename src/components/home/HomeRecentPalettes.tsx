"use client";

import type { SavedPalette } from "../../types/palette";
import { PaletteCard } from "../history/PaletteCard";

interface HomeRecentPalettesProps {
    items: SavedPalette[];
    onOpen: (item: SavedPalette) => void;
    onSeeAll: () => void;
}

export const HomeRecentPalettes = ({ items, onOpen, onSeeAll }: HomeRecentPalettesProps) => {
    if (items.length === 0) {
        return null;
    }

    return (
        <section className="home__recent" aria-label="Paletas recentes">
            <div className="home__recent__header">
                <h2 className="home__recent__title">Paletas recentes</h2>
                <button type="button" className="home__recent__all" onClick={onSeeAll}>
                    Ver todas
                </button>
            </div>
            <div className="home__recent__list">
                {items.slice(0, 4).map((item) => (
                    <PaletteCard key={item.id} item={item} variant="compact" onOpen={onOpen} />
                ))}
            </div>
        </section>
    );
};
