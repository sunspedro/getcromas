import type { Palette, PaletteStore, SavedPalette } from "../types/palette";

export const STORAGE_KEY = "croma:palettes:v1";
export const STORE_VERSION = 1;
export const MAX_UNPINNED = 40;
export const MAX_PINNED = 20;

export type PinResult =
    | { ok: true; item: SavedPalette }
    | { ok: false; reason: "not_found" | "pin_limit" | "persist" };

const emptyStore = (): PaletteStore => ({
    version: STORE_VERSION,
    items: [],
});

const isBrowser = () => typeof window !== "undefined";

const EMPTY_ITEMS: SavedPalette[] = [];
const listeners = new Set<() => void>();
let snapshotRaw: string | null | undefined = undefined;
let snapshotItems: SavedPalette[] = EMPTY_ITEMS;
let storageBound = false;

const notify = () => {
    snapshotRaw = undefined;
    listeners.forEach((listener) => listener());
};

const onStorage = (event: StorageEvent) => {
    if (event.key !== null && event.key !== STORAGE_KEY) {
        return;
    }

    notify();
};

export const subscribe = (listener: () => void) => {
    listeners.add(listener);

    if (isBrowser() && !storageBound) {
        window.addEventListener("storage", onStorage);
        storageBound = true;
    }

    return () => {
        listeners.delete(listener);

        if (listeners.size === 0 && isBrowser() && storageBound) {
            window.removeEventListener("storage", onStorage);
            storageBound = false;
        }
    };
};

const isQuotaExceeded = (err: unknown) =>
    err instanceof DOMException &&
    (err.name === "QuotaExceededError" || err.code === 22);

const isPaletteLike = (value: unknown): value is Palette => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const palette = value as Palette;

    return (
        typeof palette.title === "string" &&
        Array.isArray(palette.colors) &&
        palette.colors.every(
            (color) =>
                color &&
                typeof color.label === "string" &&
                typeof color.hash === "string" &&
                typeof color.name === "string",
        )
    );
};

const isSavedPalette = (value: unknown): value is SavedPalette => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const item = value as SavedPalette;

    return (
        typeof item.id === "string" &&
        typeof item.createdAt === "number" &&
        typeof item.pinned === "boolean" &&
        typeof item.briefing === "string" &&
        isPaletteLike(item.palette)
    );
};

const isPaletteStore = (value: unknown): value is PaletteStore => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const store = value as PaletteStore;

    return store.version === STORE_VERSION && Array.isArray(store.items) && store.items.every(isSavedPalette);
};

export const sortItems = (items: SavedPalette[]): SavedPalette[] =>
    [...items].sort((a, b) => {
        if (a.pinned !== b.pinned) {
            return a.pinned ? -1 : 1;
        }

        return b.createdAt - a.createdAt;
    });

const dropOldestUnpinned = (store: PaletteStore): PaletteStore => {
    const unpinned = store.items.filter((item) => !item.pinned);

    if (unpinned.length === 0) {
        return store;
    }

    const oldest = unpinned.reduce((acc, item) => (item.createdAt < acc.createdAt ? item : acc));

    return {
        version: STORE_VERSION,
        items: store.items.filter((item) => item.id !== oldest.id),
    };
};

const enforceUnpinnedLimit = (items: SavedPalette[]): SavedPalette[] => {
    const pinned = items.filter((item) => item.pinned);
    const unpinned = items
        .filter((item) => !item.pinned)
        .sort((a, b) => b.createdAt - a.createdAt)
        .slice(0, MAX_UNPINNED);

    return [...pinned, ...unpinned];
};

export const loadStore = (): PaletteStore => {
    if (!isBrowser()) {
        return emptyStore();
    }

    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);

        if (!raw) {
            return emptyStore();
        }

        const parsed: unknown = JSON.parse(raw);

        if (!isPaletteStore(parsed)) {
            return emptyStore();
        }

        return parsed;
    } catch {
        return emptyStore();
    }
};

const writeStore = (store: PaletteStore) => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
};

const saveStore = (store: PaletteStore): PaletteStore | null => {
    if (!isBrowser()) {
        return null;
    }

    try {
        writeStore(store);
        notify();
        return store;
    } catch (err) {
        if (!isQuotaExceeded(err)) {
            return null;
        }

        const next = dropOldestUnpinned(store);

        if (next.items.length === store.items.length) {
            return null;
        }

        try {
            writeStore(next);
            notify();
            return next;
        } catch {
            return null;
        }
    }
};

export const list = (): SavedPalette[] => sortItems(loadStore().items);

export const getServerSnapshot = () => EMPTY_ITEMS;

export const getSnapshot = (): SavedPalette[] => {
    if (!isBrowser()) {
        return EMPTY_ITEMS;
    }

    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (raw === snapshotRaw) {
        return snapshotItems;
    }

    snapshotRaw = raw;
    snapshotItems = list();
    return snapshotItems;
};

export const getById = (id: string): SavedPalette | null =>
    loadStore().items.find((item) => item.id === id) ?? null;

export const addGenerated = (briefing: string, palette: Palette): SavedPalette | null => {
    const entry: SavedPalette = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        pinned: false,
        briefing,
        palette,
    };

    const store = loadStore();
    const next: PaletteStore = {
        version: STORE_VERSION,
        items: enforceUnpinnedLimit([entry, ...store.items]),
    };
    const saved = saveStore(next);

    if (!saved) {
        return null;
    }

    return saved.items.find((item) => item.id === entry.id) ?? entry;
};

export const setPinned = (id: string, pinned: boolean): PinResult => {
    const store = loadStore();
    const current = store.items.find((item) => item.id === id);

    if (!current) {
        return { ok: false, reason: "not_found" };
    }

    if (pinned && !current.pinned) {
        const pinnedCount = store.items.filter((item) => item.pinned).length;

        if (pinnedCount >= MAX_PINNED) {
            return { ok: false, reason: "pin_limit" };
        }
    }

    const next: PaletteStore = {
        version: STORE_VERSION,
        items: store.items.map((item) => (item.id === id ? { ...item, pinned } : item)),
    };
    const saved = saveStore(next);

    if (!saved) {
        return { ok: false, reason: "persist" };
    }

    const item = saved.items.find((entry) => entry.id === id);

    if (!item) {
        return { ok: false, reason: "not_found" };
    }

    return { ok: true, item };
};

export const togglePin = (id: string): PinResult => {
    const item = getById(id);

    if (!item) {
        return { ok: false, reason: "not_found" };
    }

    return setPinned(id, !item.pinned);
};

export const remove = (id: string): boolean => {
    const store = loadStore();
    const items = store.items.filter((item) => item.id !== id);

    if (items.length === store.items.length) {
        return false;
    }

    return saveStore({ version: STORE_VERSION, items }) !== null;
};
