'use client'
import { useEffect, useState } from "react";
import { Palette, SavedPalette } from "../types/palette";
import { FloatModal, NewPaletteFab, HomeView, ResultsView, HistoryView } from "../components/_index";
import { useSavedPalettes } from "../hooks/useSavedPalettes";

type ViewState = 'home' | 'results' | 'history';

export default function Home() {
    const [view, setView] = useState<ViewState>('home');
    const [palette, setPalette] = useState<Palette | null>(null);
    const [savedId, setSavedId] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [logoHidden, setLogoHidden] = useState(false);
    const { items, add, pin, unpin, remove, notice, clearNotice } = useSavedPalettes();

    useEffect(() => {
        const mobile = window.matchMedia("(max-width: 991px)");

        const update = () => {
            setLogoHidden(mobile.matches && window.scrollY > 12);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
        mobile.addEventListener("change", update);

        return () => {
            window.removeEventListener("scroll", update);
            mobile.removeEventListener("change", update);
        };
    }, []);

    const handleLogoClick = () => {
        setView('home');
        setPalette(null);
        setSavedId(null);
        setError(null);
        clearNotice();
        window.scrollTo(0, 0);
    };

    const handleSearch = async (value: string) => {
        setLoading(true);
        setError(null);
        clearNotice();

        try {
            const res = await fetch("/api/palette", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ briefing: value }),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.error ?? "Erro ao gerar paleta");
            }

            const entry = add(value, data.palette);
            setPalette(data.palette);
            setSavedId(entry?.id ?? null);
            setView("results");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao gerar paleta");
        } finally {
            setLoading(false);
        }
    };

    const handleOpenPalette = (item: SavedPalette) => {
        setPalette(item.palette);
        setSavedId(item.id);
        setError(null);
        clearNotice();
        setView("results");
    };

    const handleDelete = (id: string) => {
        remove(id);

        if (savedId === id) {
            setSavedId(null);
        }
    };

    const homeClass = [
        "home",
        view === "results" ? "home--results" : "",
        view === "history" ? "home--history" : "",
        view === "home" && items.length > 0 ? "home--with-recent" : "",
    ].filter(Boolean).join(" ");

    return (
        <div className={homeClass}>
            <button
                type="button"
                className={`home__logo${logoHidden ? " home__logo--hidden" : ""}`}
                onClick={handleLogoClick}
                aria-label="Voltar para início"
                aria-hidden={logoHidden}
                tabIndex={logoHidden ? -1 : undefined}
            >
                <span className="home__logo__mark" aria-hidden="true" />
            </button>
            {view === 'home' && (
                <HomeView
                    onSubmit={handleSearch}
                    loading={loading}
                    error={error}
                    recentItems={items}
                    onOpenPalette={handleOpenPalette}
                    onSeeAll={() => {
                        clearNotice();
                        setView("history");
                    }}
                />
            )}
            {view === 'results' && palette && (
                <ResultsView palette={palette} />
            )}
            {view === 'history' && (
                <HistoryView
                    items={items}
                    notice={notice}
                    onOpen={handleOpenPalette}
                    onPin={pin}
                    onUnpin={unpin}
                    onDelete={handleDelete}
                    onBack={handleLogoClick}
                />
            )}

            <NewPaletteFab visible={view !== "home"} onClick={handleLogoClick} />
            <FloatModal />
        </div>
    );
}
