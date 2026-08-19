export type Palette = {
    title: string;
    colors: { label: string; hash: string; name: string }[];
    contrast: { label: string; contrast: string; situation: string }[];
    description: string;
    points: { positive: string[]; negative: string[] };
    references: { title: string; type: string; why: string; url: string }[];
};

export type SavedPalette = {
    id: string;
    createdAt: number;
    pinned: boolean;
    briefing: string;
    palette: Palette;
};

export type PaletteStore = {
    version: 1;
    items: SavedPalette[];
};

export const paletteJsonSchema = {
    type: "object",
    properties: {
        title: { type: "string" },
        colors: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    label: { type: "string" },
                    hash: { type: "string" },
                    name: { type: "string" },
                },
                required: ["label", "hash", "name"],
                additionalProperties: false,
            },
        },
        contrast: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    label: { type: "string" },
                    contrast: { type: "string" },
                    situation: { type: "string" },
                },
                required: ["label", "contrast", "situation"],
                additionalProperties: false,
            },
        },
        description: { type: "string" },
        points: {
            type: "object",
            properties: {
                positive: { type: "array", items: { type: "string" } },
                negative: { type: "array", items: { type: "string" } },
            },
            required: ["positive", "negative"],
            additionalProperties: false,
        },
        references: {
            type: "array",
            items: {
                type: "object",
                properties: {
                    title: { type: "string" },
                    type: { type: "string" },
                    why: { type: "string" },
                    url: { type: "string", minLength: 1 },
                },
                required: ["title", "type", "why", "url"],
                additionalProperties: false,
            },
        },
    },
    required: ["title", "colors", "contrast", "description", "points", "references"],
    additionalProperties: false,
};
