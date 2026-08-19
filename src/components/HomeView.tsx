import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Intro, SearchInput, HomeHelpModal, HomeLoading } from "./home/_index";

export const HomeView = ({
    onSubmit,
    loading,
    error,
}: {
    onSubmit: (value: string) => Promise<void>;
    loading?: boolean;
    error?: string | null;
}) => {
    const [modal, setModal] = useState(false);
    return (
        <>
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
            {modal && (
                <HomeHelpModal
                    onClose={() => {
                        setModal(false);
                    }}
                />
            )}
            <AnimatePresence>
                {loading && <HomeLoading />}
            </AnimatePresence>
        </>
    );
};
