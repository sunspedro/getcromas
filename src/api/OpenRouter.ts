import { Palette, paletteJsonSchema } from "../types/palette";

import { parsePaletteContent } from "./parsePalette";

import { getSystemPrompt } from "./systemPrompt";

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";

const DEFAULT_MODEL = "nvidia/nemotron-3-super-120b-a12b:free";

const FALLBACK_MODELS = [
    "dots-studio/dots-3-note-preview:free",
    "nvidia/nemotron-nano-9b-v2:free",
    "google/gemma-4-26b-a4b-it:free",
];

export async function generatePalette(briefing: string): Promise<Palette> {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY não configurada");
    }

    const primary = process.env.OPENROUTER_MODEL ?? DEFAULT_MODEL;

    const response = await fetch(OPENROUTER_URL, {
        method: "POST",

        headers: {
            Authorization: `Bearer ${apiKey}`,

            "HTTP-Referer": process.env.OPENROUTER_SITE_URL ?? "http://localhost:3000",

            "X-OpenRouter-Title": process.env.OPENROUTER_SITE_NAME ?? "GetCromas",

            "Content-Type": "application/json",
        },

        body: JSON.stringify({
            model: primary,

            models: FALLBACK_MODELS.filter((model) => model !== primary),

            provider: {
                allow_fallbacks: true,
            },

            max_tokens: Number(process.env.OPENROUTER_MAX_TOKENS ?? 4096),

            reasoning: { enabled: false },

            messages: [
                { role: "system", content: getSystemPrompt() },

                { role: "user", content: briefing },
            ],

            response_format: {
                type: "json_schema",

                json_schema: {
                    name: "palette",

                    strict: true,

                    schema: paletteJsonSchema,
                },
            },

            plugins: [{ id: "response-healing" }],
        }),
    });

    if (!response.ok) {
        const error = await response.text();

        throw new Error(`OpenRouter: ${response.status} — ${error}`);
    }

    const data = await response.json();

    const choice = data.choices?.[0];

    const content = choice?.message?.content;

    if (!content) {
        throw new Error("Resposta vazia do OpenRouter");
    }

    if (choice?.finish_reason === "length") {
        throw new Error("Resposta cortada — aumente OPENROUTER_MAX_TOKENS no .env");
    }

    return parsePaletteContent(content);
}
