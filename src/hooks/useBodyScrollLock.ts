import { useEffect } from "react";

const LOCK_CLASS = "scroll-locked";

export function useBodyScrollLock(active = true) {
    useEffect(() => {
        if (!active) return;

        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

        document.documentElement.style.setProperty(
            "--scrollbar-width",
            `${scrollbarWidth}px`,
        );
        document.documentElement.classList.add(LOCK_CLASS);
        document.body.classList.add(LOCK_CLASS);

        return () => {
            document.documentElement.classList.remove(LOCK_CLASS);
            document.body.classList.remove(LOCK_CLASS);
            document.documentElement.style.removeProperty("--scrollbar-width");
        };
    }, [active]);
}
