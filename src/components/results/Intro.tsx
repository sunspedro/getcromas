interface IIntro {
    badge: string;
    title: string;
}

export const Intro = ({badge, title}: IIntro) => {
    return (
        <>
            <p className="results__intro__badge">{badge}</p>
            <h2 className="results__intro__title">{title}</h2>
        </>
    );
};
