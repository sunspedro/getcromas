interface IPoints {
    positivePoints: string[];
    attentionPoints: string[];
}

export const Points = ({ positivePoints, attentionPoints }: IPoints) => {
    return (
        <div className="results__final__points">
            <div>
                <h3 className="results__final__points__title">Pontos positivos</h3>
                <ul>
                    {positivePoints.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
            </div>
            <div>
                <h3 className="results__final__points__title">Pontos de atenção</h3>
                <ul>
                    {attentionPoints.map((point) => (
                        <li key={point}>{point}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};
