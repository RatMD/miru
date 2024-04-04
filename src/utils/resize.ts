
/**
 * Resize Image
 * @param {string} original 
 * @param {number} maxWidth 
 * @param {number} maxHeight
 * @returns {Promise<string>}
 */
function resize(original: string, maxWidth: number, maxHeight: number): Promise<string> {
    return new Promise ((resolve, reject) => {
        const img = document.createElement('IMG') as HTMLImageElement;
        img.onload = () => {
            const srcWidth = img.naturalWidth;
            const srcHeight = img.naturalHeight;
            if (srcWidth <= maxWidth && srcHeight <= maxHeight) {
                resolve(original);
            }

            // Swap Sizes
            if (maxWidth > maxHeight && srcWidth < srcHeight) {
                [maxWidth, maxHeight] = [maxHeight, maxWidth];
            }
            
            const ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);
            const canvas = document.createElement("canvas");
            canvas.width = srcWidth * ratio;
            canvas.height = srcHeight * ratio;

            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL());
        };
        img.onerror = reject;
        img.src = original;
    });
}

// Export Module
export default resize;
export { resize };
