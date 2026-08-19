"use client";

import { useCallback, useState, useSyncExternalStore } from "react";
import type { Palette } from "../types/palette";
import {
    addGenerated,
    getById,
    getServerSnapshot,
    getSnapshot,
    MAX_PINNED,
    remove as removeStored,
    setPinned,
    subscribe,
} from "../lib/paletteStorage";

const noticeForReason = (reason: "not_found" | "pin_limit" | "persist") => {
    if (reason === "pin_limit") {
        return `Limite de ${MAX_PINNED} paletas fixadas.`;
    }

    if (reason === "persist") {
        return "Não foi possível salvar. Espaço do navegador cheio.";
    }

    return null;
};

export const useSavedPalettes = () => {
    const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
    const [notice, setNotice] = useState<string | null>(null);

    const add = useCallback((briefing: string, palette: Palette) => addGenerated(briefing, palette), []);

    const pin = useCallback((id: string) => {
        const result = setPinned(id, true);

        if (!result.ok) {
            setNotice(noticeForReason(result.reason));
        } else {
            setNotice(null);
        }

        return result;
    }, []);

    const unpin = useCallback((id: string) => {
        const result = setPinned(id, false);

        if (!result.ok) {
            setNotice(noticeForReason(result.reason));
        } else {
            setNotice(null);
        }

        return result;
    }, []);

    const remove = useCallback((id: string) => {
        removeStored(id);
    }, []);

    const open = useCallback((id: string) => getById(id), []);

    const clearNotice = useCallback(() => {
        setNotice(null);
    }, []);

    return {
        items,
        add,
        pin,
        unpin,
        remove,
        open,
        notice,
        clearNotice,
    };
};
