/** Copy plain source text, reporting success only after an actual write. */
export async function copyCode(text: string): Promise<void> {
    if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        return;
    }
    if (typeof document === 'undefined' || typeof document.execCommand !== 'function')
        throw new Error('Clipboard unavailable');
    const previous = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const target = previous?.closest('[role="dialog"]') ?? document.body;
    const field = document.createElement('textarea');
    field.value = text;
    field.readOnly = true;
    field.setAttribute('aria-hidden', 'true');
    field.style.cssText =
        'position:fixed;inset:0;opacity:0;width:1px;height:1px;pointer-events:none;';
    target.append(field);
    let written = false;
    try {
        field.focus();
        field.select();
        written = document.execCommand('copy');
    } finally {
        field.remove();
        if (previous?.isConnected) previous.focus();
    }
    if (!written) throw new Error('Clipboard write failed');
}
