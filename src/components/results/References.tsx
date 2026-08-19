import { resolveReferenceHref } from "./normalizeReferenceUrl";

interface IReferenceItem {
    title: string;
    url: string;
    type: string;
    why: string;
}

interface IReferences {
    references: IReferenceItem[];
}

export const References = ({ references }: IReferences) => {
    return (
        <div className="results__references__content">
            <h3 className="results__references__title">Referências</h3>
            <ul className="results__references__list">
                {references.map((ref) => {
                    const href = resolveReferenceHref(ref.url, ref.title);

                    return (
                        <li key={ref.title}>
                            <a
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                className="results__references__list__link"
                            >
                                <div className="results__references__list__item">
                                    <span className="results__references__list__item-type">{ref.type}</span>
                                    <span className="results__references__list__item-title">{ref.title}</span>
                                    <p className="results__references__list__item-description">{ref.why}</p>
                                </div>
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
