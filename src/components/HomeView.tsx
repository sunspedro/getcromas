import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { SavedPalette } from "../types/palette";
import { Intro, SearchInput, HomeHelpModal, HomeLoading, HomeRecentPalettes, SeoContent } from "./home/_index";

export const HomeView = ({
    onSubmit,
    loading,
    error,
    recentItems = [],
    onOpenPalette,
    onSeeAll,
}: {
    onSubmit: (value: string) => Promise<void>;
    loading?: boolean;
    error?: string | null;
    recentItems?: SavedPalette[];
    onOpenPalette?: (item: SavedPalette) => void;
    onSeeAll?: () => void;
}) => {
    const [modal, setModal] = useState(false);

    return (
        <>
            <main className="home__stage">
                <div className="home__intro">
                    <Intro />
                </div>
                <div className="home__search">
                    <SearchInput onSubmit={onSubmit} loading={loading} />
                    {error && <p className="home__search__error">{error}</p>}
                    <motion.p
                        className="home__search__help"
                        onClick={() => setModal(true)}
                    >
                        precisa de ajuda?
                    </motion.p>
                </div>
            </main>
            <SeoContent />
            {onOpenPalette && onSeeAll && (
                <HomeRecentPalettes
                    items={recentItems}
                    onOpen={onOpenPalette}
                    onSeeAll={onSeeAll}
                />
            )}
            <AnimatePresence>
                {modal && (
                    <HomeHelpModal
                        onClose={() => {
                            setModal(false);
                        }}
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {loading && <HomeLoading />}
            </AnimatePresence>
        </>
    );
};
