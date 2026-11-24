export interface UploadFile {
    name: string;
    size: number;
    type: string;
}

export type UploadProblem = 'size' | 'format' | 'multiple';

export interface ImageDimensions {
    width: number;
    height: number;
}

export function fitsImageDimensions(
    image: ImageDimensions,
    min?: ImageDimensions,
    max?: ImageDimensions,
): boolean {
    return (
        (!min || (image.width >= min.width && image.height >= min.height)) &&
        (!max || (image.width <= max.width && image.height <= max.height))
    );
}

/** Match native input accept rules for both the file chooser and drag-and-drop. */
export function validateUploadFiles(
    files: UploadFile[],
    accept: string,
    maxSizeMiB: number,
    multiple: boolean,
): UploadProblem | undefined {
    if (!multiple && files.length > 1) return 'multiple';
    const allowed = accept
        .toLowerCase()
        .split(',')
        .map((rule) => rule.trim())
        .filter(Boolean);
    for (const file of files) {
        if (file.size > maxSizeMiB * 1024 * 1024) return 'size';
        if (
            allowed.length &&
            !allowed.some((rule) =>
                rule.startsWith('.')
                    ? file.name.toLowerCase().endsWith(rule)
                    : rule.endsWith('/*')
                      ? file.type.toLowerCase().startsWith(rule.slice(0, -1))
                      : file.type.toLowerCase() === rule,
            )
        )
            return 'format';
    }
    return undefined;
}
