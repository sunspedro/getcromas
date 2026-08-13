'use client'
import { useState } from "react";
import { HomeView, ResultsView } from "../components";

type ViewState = 'home' | 'results';

export default function Home() {
    const [view, setView] = useState<ViewState>('home');
    const handleSearch = () => {
        setView('results')
    }
    return (
        <div className="home">
            <div className="home__logo">
                <img src="croma-logo.webp" alt="logo do croma" />
            </div>
            {view === 'home' && ( <HomeView onSubmit={handleSearch} />)}
            {view === 'results' && ( <ResultsView />)}
        </div>
    );
}
