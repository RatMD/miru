type SaveAsOptions = {
    /**
     * Prepend a UTF-8 BOM for text/xml(+xml) blobs with charset=utf-8.
     * Default: true
     */
    autoBom?: boolean;

    /**
     * How long to wait before revoking an object URL (ms).
     * Default: 40000
     */
    revokeMs?: number;

    /**
     * Force navigation to object URL instead of using <a download>.
     * Rarely needed; mostly for odd sandboxed contexts.
     * Default: false
     */
    forceLocationHref?: boolean;
};

const DEFAULT_REVOKE_MS = 40_000;

const uA = typeof navigator !== 'undefined' ? navigator.userAgent : '';
const isChromeIOS = /CriOS\/\d+/.test(uA);
const isSafari =
    // real Safari (desktop/mobile), not Chrome/Edge/Opera
    /^((?!chrome|crios|android|fxios|edgios|edg).)*safari/i.test(uA) ||
    // some engines expose a global `safari`
    typeof (globalThis as any).safari !== 'undefined';

const canUseDownloadAttr = (() => {
    if (typeof document === 'undefined') {
        return false;
    }

    const a = document.createElement('a');
    return 'download' in a;
})();

const URLx: URLConstructorLike = ((): URLConstructorLike => {
    // Defer to global URL (or prefixed) if available
    const g: any = globalThis as any;
    return (g.URL ?? g.webkitURL ?? g) as URLConstructorLike;
})();

interface URLConstructorLike {
    createObjectURL?: (obj: Blob | MediaSource) => string;
    revokeObjectURL?: (url: string) => void;
}

/**
 * Prepend a UTF-8 BOM to matching text and XML blobs.
 * @param blob Blob whose media type is inspected.
 * @returns The original blob or a blob with a BOM prepended.
 */
function autoBom(blob: Blob): Blob {
    const type = blob.type || '';

    // text/*, application/xml, */*+xml with charset=utf-8
    if (/^\s*(?:text\/\S*|application\/xml|\S+\/\S+\+xml)\s*;.*charset\s*=\s*utf-8/i.test(type)) {
        return new Blob([String.fromCharCode(0xfeff), blob], { type });
    }
    return blob;
}

/**
 * Dispatch a synthetic click event on an element.
 * @param node Element to activate.
 * @returns Nothing.
 */
function click(node: HTMLElement): void {
    // MouseEvent is widely supported on modern browsers
    node.dispatchEvent(new MouseEvent('click'));
}

/**
 * Trigger a download through a temporary hidden anchor.
 * @param href URL to download.
 * @param filename Suggested download filename.
 * @returns Nothing.
 */
function triggerAnchorDownload(href: string, filename: string): void {
    const a = document.createElement('a');
    a.href = href;
    a.download = filename;
    a.style.display = 'none'; // avoid affecting layout / focus
    document.body.appendChild(a);
    click(a);
    a.remove(); // cleanup
}

/**
 * Download a blob using an anchor or a Safari/iOS URL fallback.
 * @param blob Blob to save.
 * @param filename Suggested filename.
 * @param options BOM, object URL cleanup and navigation options.
 * @returns Nothing; the download is initiated asynchronously by the browser.
 */
function saveAs(blob: Blob, filename = 'download', options: SaveAsOptions = {}): void {
    const {
        autoBom: shouldBom = true,
        revokeMs = DEFAULT_REVOKE_MS,
        forceLocationHref = false,
    } = options;

    if (shouldBom) {
        blob = autoBom(blob);
    }

    // Legacy Edge/IE path (still harmless if present)
    const anyNav = navigator as any;

    if (anyNav && typeof anyNav.msSaveOrOpenBlob === 'function') {
        anyNav.msSaveOrOpenBlob(blob, filename);
        return;
    }

    // iOS/force/Safari dataURL path: Safari blocks download attr for blob: URLs in some cases
    if ((isChromeIOS || isSafari) && typeof FileReader !== 'undefined') {
        const reader = new FileReader();
        reader.onloadend = () => {
            // On Chrome iOS a regular data URL works;
            // On Safari, hint as attachment to increase chance of "download".
            const result = String(reader.result || '');
            const url = isChromeIOS
                ? result
                : result.replace(/^data:[^;]*;/, 'data:attachment/file;');

            // Try opening in a new tab (may be blocked by popup rules in some contexts)
            const win = globalThis.open(url, '_blank');
            if (!win) {
                location.href = url;
            }
        };
        reader.readAsDataURL(blob);

        return;
    }

    // Prefer object URLs with <a download> when supported
    const objectUrl = URLx.createObjectURL ? URLx.createObjectURL(blob) : null;
    try {
        if (!objectUrl) {
            // Last-ditch: try data URL via FileReader (very large blobs may be problematic)
            const fr = new FileReader();
            fr.onloadend = () => {
                const dataUrl = String(fr.result || '');

                if (canUseDownloadAttr && !forceLocationHref) {
                    triggerAnchorDownload(dataUrl, filename);
                } else {
                    const win = globalThis.open(dataUrl, '_blank');

                    if (!win) {
                        location.href = dataUrl;
                    }
                }
            };
            fr.readAsDataURL(blob);
            return;
        }

        if (canUseDownloadAttr && !forceLocationHref) {
            triggerAnchorDownload(objectUrl, filename);
        } else {
            // Open in a new tab or navigate, which typically triggers a download prompt for binary data
            const opened = globalThis.open(objectUrl, '_blank');
            if (!opened) {
                location.href = objectUrl;
            }
        }
    } finally {
        // Revoke after a delay to ensure the download stream is consumed
        if (objectUrl && URLx.revokeObjectURL) {
            setTimeout(() => URLx.revokeObjectURL!(objectUrl), revokeMs);
        }
    }
}

// Export module
export { saveAs };
export type { SaveAsOptions };
