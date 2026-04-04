export const extractIframeSrc = (iframeHtml: string): string | null => {
    if (!iframeHtml) return null;

    const match = iframeHtml.match(/<iframe[^>]+src="([^"]+)"/i);
    return match ? match[1] : null;
}
