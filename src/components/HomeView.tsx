import { useState } from "react";
import { HomeHelpModal } from "./HomeHelpModal";
import { SearchInput } from "./SearchInput";

export const HomeView = ({ onSubmit }: { onSubmit: (value: string) => void }) => {
    const [modal, setModal] = useState(false)
    return (
        <>
            <div className="home__intro">
                <h1 className="home__intro__title">Bem vindo ao seu gerador de paletas de cores!</h1>
                <p className="home__intro__info">Descreva seu projeto e receba uma paleta com IA</p>
            </div>
            <div className="home__search">
                <SearchInput onSubmit={onSubmit} />
                <p className="home__search__help" onClick={() => setModal(true)}>precisa de ajuda?</p>
            </div>
            {modal && (
                <HomeHelpModal onClose={()=> {setModal(false)}}/>
            )}
        </>
    );
};
