interface ISummary {
    title: string;
    description: string;
}

export const Summary = ({title, description}: ISummary) => {
    return (
        <div className="results__content__text">
            <h3 className="results__content__text__title">{title}</h3>
            <p className="results__content__text__description">{description}</p>
        </div>
    );
};
