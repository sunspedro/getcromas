const GENERIC_WORDS = new Set([
    "site", "web", "app", "loja", "blog", "page", "landing", "ui", "ux", "logo",
]);

function countVowels(text: string): number {
    return (text.match(/[aeiouAEIOUÁÉÍÓÚÀÈÌÒÙÂÊÎÔÛÃÕ]/g) ?? []).length;
}

function isGibberishToken(token: string): boolean {
    const letters = token.replace(/[^a-zA-ZÀ-ú]/g, "");
    if (letters.length < 6) {
        return false;
    }

    if (/(.)\1{3,}/i.test(letters)) {
        return true;
    }

    if (/[b-df-hj-np-tv-zB-DF-HJ-NP-TV-Z]{6,}/.test(letters)) {
        return true;
    }

    const vowelRatio = countVowels(letters) / letters.length;

    if (letters.length >= 6 && vowelRatio < 0.3) {
        return true;
    }

    if (letters.length >= 8 && /^[A-Z0-9]+$/i.test(letters) && vowelRatio < 0.35) {
        return true;
    }

    return false;
}

function splitTokens(briefing: string): string[] {
    const normalized = briefing.replace(/([a-zà-ú])([A-Z])/g, "$1 $2");
    return normalized.split(/[\s,.;:!?<>|/\\()[\]{}]+/).filter(Boolean);
}

function findGibberishSegments(briefing: string): string[] {
    const segments = briefing.match(/[a-zA-ZÀ-ú]{6,}/g) ?? [];
    return segments.filter(isGibberishToken);
}

function isMeaningfulWord(token: string): boolean {
    const letters = token.replace(/[^a-zA-ZÀ-ú]/g, "");
    if (letters.length < 3) {
        return false;
    }
    if (isGibberishToken(token)) {
        return false;
    }
    return countVowels(letters) > 0;
}

function isSpecificWord(token: string): boolean {
    if (!isMeaningfulWord(token)) {
        return false;
    }
    return !GENERIC_WORDS.has(token.toLowerCase());
}

export function validateBriefing(briefing: string): string | null {
    const trimmed = briefing.trim();

    if (trimmed.length < 12) {
        return "Descreva melhor o que você quer. Ex: site de moda com cores quentes.";
    }

    const letterCount = (trimmed.match(/[a-zA-ZÀ-ú]/g) ?? []).length;
    if (letterCount < 10) {
        return "Use palavras que descrevam seu projeto.";
    }

    const gibberishSegments = findGibberishSegments(trimmed);
    if (gibberishSegments.length > 0) {
        return "Não entendi o briefing. Descreva o tipo de site, segmento ou estilo visual.";
    }

    const tokens = splitTokens(trimmed);
    const gibberishTokens = tokens.filter(isGibberishToken);
    if (gibberishTokens.length > 0) {
        return "Não entendi o briefing. Descreva o tipo de site, segmento ou estilo visual.";
    }

    const meaningfulWords = tokens.filter(isMeaningfulWord);
    if (meaningfulWords.length < 2) {
        return "Descreva melhor seu projeto. Ex: landing page para cafeteria com tons terrosos.";
    }

    const specificWords = tokens.filter(isSpecificWord);
    const specificChars = specificWords.reduce((sum, word) => sum + word.length, 0);

    if (specificWords.length === 0 || specificChars < 4) {
        return "Conte mais sobre o projeto. Ex: churrascaria rústica, startup futurista, loja minimalista.";
    }

    return null;
}
