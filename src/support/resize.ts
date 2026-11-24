/**
 * Resize an image within its bounds without upscaling it.
 * @param original Source image URL or data URL.
 * @param maxWidth Maximum output width in pixels.
 * @param maxHeight Maximum output height in pixels.
 * @param options Output media type and encoding quality.
 * @returns A promise containing the original or resized image data URL.
 */
function resize(
    original: string,
    maxWidth: number,
    maxHeight: number,
    options: { type?: 'image/png' | 'image/jpeg' | 'image/webp'; quality?: number } = {},
): Promise<string> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('IMG') as HTMLImageElement;
        img.onload = () => {
            const srcWidth = img.naturalWidth;
            const srcHeight = img.naturalHeight;

            if (srcWidth <= maxWidth && srcHeight <= maxHeight && !options.type) {
                resolve(original);

                return;
            }

            // Swap Sizes
            if (maxWidth > maxHeight && srcWidth < srcHeight) {
                [maxWidth, maxHeight] = [maxHeight, maxWidth];
            }

            const ratio = Math.min(1, maxWidth / srcWidth, maxHeight / srcHeight);
            const canvas = document.createElement('canvas');
            canvas.width = srcWidth * ratio;
            canvas.height = srcHeight * ratio;

            const ctx = canvas.getContext('2d');

            if (!ctx) {
                reject(new Error('Canvas 2D is unavailable.'));

                return;
            }

            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL(options.type, options.quality));
        };
        img.onerror = reject;
        img.src = original;
    });
}

// Export module
export { resize };
