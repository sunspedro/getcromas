'use client'
import { useState } from "react";
import { Palette } from "../types/palette";
import { FloatModal, HomeView, ResultsView } from "../components/_index";

type ViewState = 'home' | 'results';

export default function Home() {
    const [view, setView] = useState<ViewState>('home');
    const [question, setQuestion] = useState("");
    const [palette, setPalette] = useState<Palette | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogoClick = () => {
        setView('home');
        setPalette(null);
        setQuestion('');
        setError(null);
    };

    const handleSearch = async (value: string) => {
        setQuestion(value);
        setLoading(true);
        setError(null);

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

            setPalette(data.palette);
            setView("results");
        } catch (err) {
            setError(err instanceof Error ? err.message : "Erro ao gerar paleta");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="home">
            <button
                type="button"
                className="home__logo"
                onClick={handleLogoClick}
                aria-label="Voltar para início"
            >
                <span className="home__logo__mark" aria-hidden="true" />
            </button>
            {view === 'home' && (
                <HomeView onSubmit={handleSearch} loading={loading} error={error} />
            )}
            {view === 'results' && palette && (
                <ResultsView palette={palette} />
            )}

            <FloatModal />
        </div>
    );
}
