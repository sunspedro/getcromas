const GENERIC_WORDS = new Set([
    "site", "web", "app", "loja", "blog", "page", "landing", "ui", "ux", "logo",
]);

const VOWEL = /[aeiouyáéíóúàèìòùâêîôûãõäöü]/i;
const CONSONANT_CLUSTER = /[b-df-hj-np-tv-xzÇçÑñ]{6,}/i;

function countVowels(text: string): number {
    let count = 0;
    for (const ch of text) {
        if (VOWEL.test(ch)) {
            count++;
        }
    }
    return count;
}

function isGibberishToken(token: string): boolean {
    const letters = token.replace(/[^a-zA-ZÀ-ú]/g, "");
    if (letters.length < 6) {
        return false;
    }

    if (/(.)\1{3,}/i.test(letters)) {
        return true;
    }

    if (CONSONANT_CLUSTER.test(letters)) {
        return true;
    }

    return countVowels(letters) === 0;
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
