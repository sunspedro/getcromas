interface IIntro {
    title: string;
}

export const Intro = ({ title }: IIntro) => {
    return (
        <div className="results__intro__inner">
            <p className="results__intro__label">Nome da paleta</p>
            <h2 className="results__intro__title">{title}</h2>
        </div>
    );
};
