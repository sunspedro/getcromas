import type { Palette } from "../../types/palette";

type PaletteColor = Palette["colors"][number];

export function resolveContrastPair(
    label: string,
    colors: PaletteColor[],
): [PaletteColor, PaletteColor] | null {
    const found = colors
        .filter((color) => label.toLowerCase().includes(color.label.toLowerCase()))
        .sort(
            (a, b) =>
                label.toLowerCase().indexOf(a.label.toLowerCase()) -
                label.toLowerCase().indexOf(b.label.toLowerCase()),
        );

    if (found.length >= 2) {
        return [found[0], found[1]];
    }

    if (colors.length >= 2) {
        return [colors[0], colors[1]];
    }

    return null;
}

export function isContrastApproved(situation: string): boolean {
    return /aprovado/i.test(situation);
}
