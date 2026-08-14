import { Palette } from "../types/palette";

export function parsePaletteContent(content: string): Palette {
    let cleaned = content.trim();

    if (cleaned.startsWith("```")) {
        cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    }

    try {
        return JSON.parse(cleaned) as Palette;
    } catch (error) {
        const message = error instanceof Error ? error.message : "JSON inválido";
        throw new Error(`${message}. Resposta parcial: ${cleaned.slice(0, 200)}...`);
    }
}
