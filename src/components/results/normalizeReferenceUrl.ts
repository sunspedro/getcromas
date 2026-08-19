export function normalizeReferenceUrl(raw: string): string | null {
    let url = (raw ?? "").trim();
    if (!url) {
        return null;
    }

    const markdownLink = url.match(/^\[[^\]]*\]\(([^)]+)\)$/);
    if (markdownLink) {
        url = markdownLink[1].trim();
    }

    url = url.replace(/[.,;:)]+$/, "");

    if (/^https?:\/\//i.test(url)) {
        try {
            return new URL(url).href;
        } catch {
            return null;
        }
    }

    if (/^(www\.|[\w-]+\.[\w.-]+)/i.test(url)) {
        try {
            return new URL(`https://${url.replace(/^\/\//, "")}`).href;
        } catch {
            return null;
        }
    }

    return null;
}

export function resolveReferenceHref(raw: string, title: string): string {
    const url = normalizeReferenceUrl(raw);
    if (url) {
        return url;
    }

    const query = title.trim() || "design reference";
    return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}
