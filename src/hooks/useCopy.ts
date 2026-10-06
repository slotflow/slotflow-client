import { useCallback, useState } from "react";
import { CopyInput, UseCopyReturn } from "@/shared/types/hooks";
import { appConfig } from "@/config/env";

export const useCopy = (timeout: number = 2000): UseCopyReturn => {

    const [copied, setCopied] = useState<boolean>(false);

    const copy = useCallback(
        async (input: CopyInput): Promise<boolean> => {
            if (typeof input === "object" && input !== null) {
                if (navigator.share && navigator.canShare?.(input)) {
                    try {
                        await navigator.share(input);
                        return true;
                    } catch (error) {
                        if ((error as Error).name === "AbortError") {
                            return false;
                        }
                    }
                }
            }

            const textToCopy = typeof input === "string" ? input : input.url;

            if (!navigator?.clipboard) {
                if(appConfig.isDevelopment) {
                    console.warn("Clipboard functionality is not supported by this browser.");
                }
                return false;
            }

            try {
                await navigator.clipboard.writeText(textToCopy);
                setCopied(true);
                setTimeout(() => setCopied(false), timeout);
                return true;
            } catch (error) {
                if(appConfig) {
                    console.error("Failed to copy to clipboard:", error);
                }
                setCopied(false);
                return false;
            }
        },
        [timeout]
    );

    return { copied, copy };
};