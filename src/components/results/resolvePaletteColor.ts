import type { Palette } from "../../types/palette";

type PaletteColor = Palette["colors"][number];

export type PaletteTheme = {
    background: string;
    primary: string;
    text: string;
    secondary: string;
    accent: string;
};

const ROLE_FALLBACK_INDEX: Record<keyof PaletteTheme, number> = {
    background: 0,
    primary: 1,
    text: 2,
    secondary: 3,
    accent: 4,
};

export function resolvePaletteColor(
    colors: PaletteColor[],
    role: keyof PaletteTheme,
): string {
    const match = colors.find(
        (color) => color.label.toLowerCase() === role.toLowerCase(),
    );

    if (match) {
        return match.hash;
    }

    const fallback = colors[ROLE_FALLBACK_INDEX[role]];
    return fallback?.hash ?? "#2b1810";
}

export function getPaletteTheme(colors: PaletteColor[]): PaletteTheme {
    return {
        background: resolvePaletteColor(colors, "background"),
        primary: resolvePaletteColor(colors, "primary"),
        text: resolvePaletteColor(colors, "text"),
        secondary: resolvePaletteColor(colors, "secondary"),
        accent: resolvePaletteColor(colors, "accent"),
    };
}
