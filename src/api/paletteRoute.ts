import { NextResponse } from "next/server";

import { generatePalette } from "./OpenRouter";
import { validateBriefing } from "./validateBriefing";

export async function POST(request: Request) {
    try {
        const { briefing } = await request.json();

        if (!briefing?.trim()) {
            return NextResponse.json({ error: "Briefing obrigatório" }, { status: 400 });
        }

        const validationError = validateBriefing(briefing.trim());
        if (validationError) {
            return NextResponse.json({ error: validationError }, { status: 400 });
        }

        const palette = await generatePalette(briefing.trim());
        return NextResponse.json({ palette });
    } catch (error) {
        const message = error instanceof Error ? error.message : "Erro ao gerar paleta";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
