function parseHexColor(hex: string): { r: number; g: number; b: number } | null {
    const normalized = hex.trim().replace(/^#/, "");

    if (!/^[0-9a-f]{3}$/i.test(normalized) && !/^[0-9a-f]{6}$/i.test(normalized)) {
        return null;
    }

    const value =
        normalized.length === 3
            ? normalized
                  .split("")
                  .map((char) => char + char)
                  .join("")
            : normalized;

    return {
        r: Number.parseInt(value.slice(0, 2), 16),
        g: Number.parseInt(value.slice(2, 4), 16),
        b: Number.parseInt(value.slice(4, 6), 16),
    };
}

function getRelativeLuminance(r: number, g: number, b: number): number {
    const transform = (channel: number) => {
        const normalized = channel / 255;
        return normalized <= 0.03928
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
    };

    return (
        0.2126 * transform(r) +
        0.7152 * transform(g) +
        0.0722 * transform(b)
    );
}

function getContrastRatio(luminanceA: number, luminanceB: number): number {
    const lighter = Math.max(luminanceA, luminanceB);
    const darker = Math.min(luminanceA, luminanceB);

    return (lighter + 0.05) / (darker + 0.05);
}

export function getTextColorForBackground(hex: string): "#ffffff" | "#000000" {
    const rgb = parseHexColor(hex);

    if (!rgb) {
        return "#000000";
    }

    const backgroundLuminance = getRelativeLuminance(rgb.r, rgb.g, rgb.b);
    const whiteLuminance = getRelativeLuminance(255, 255, 255);
    const blackLuminance = getRelativeLuminance(0, 0, 0);

    const whiteContrast = getContrastRatio(backgroundLuminance, whiteLuminance);
    const blackContrast = getContrastRatio(backgroundLuminance, blackLuminance);

    return whiteContrast > blackContrast ? "#ffffff" : "#000000";
}
