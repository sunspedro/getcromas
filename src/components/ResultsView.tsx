import { Palette } from "../types/palette";
import { Intro, Colors, Summary, Contrast, Points, References } from "./results/_index";

interface ResultsViewProps {
    pergunta: string;
    palette: Palette;
}

export const ResultsView = ({ pergunta, palette }: ResultsViewProps) => {
    return (
        <div className="results">
            <div className="results__intro">
                <Intro badge={pergunta} title={palette.title} />
            </div>
            <div className="results__colors">
                <Colors list={palette.colors} />
            </div>
            <div className="results__content">
                <Summary title="Resumo da paleta" description={palette.description} />
                <Contrast lista={palette.contrast} colors={palette.colors} />
            </div>
            <div className="results__final">
                <Points positivePoints={palette.points.positive} attentionPoints={palette.points.negative} />
            </div>
            <div className="results__references">
                <References references={palette.references} />
            </div>
        </div>
    );
};
