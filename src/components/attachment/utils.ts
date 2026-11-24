import type { AttachmentItem, AttachmentKind } from './types';
export function getAttachmentName(item: AttachmentItem): string {
    return item.name || item.file?.name || item.title || '';
}
export function getAttachmentKind(item: AttachmentItem): AttachmentKind {
    if (item.kind) return item.kind;
    const mime = (item.mimeType || item.file?.type || '').toLowerCase(),
        name = getAttachmentName(item).toLowerCase();
    if (
        mime.startsWith('image/') ||
        item.url?.startsWith('data:image/') ||
        /\.(png|jpe?g|gif|webp|avif|svg|heic|bmp)$/.test(name)
    )
        return 'image';
    if (mime.startsWith('video/') || /\.(mp4|webm|mkv|mov|avi)$/.test(name)) return 'video';
    if (mime.startsWith('audio/') || /\.(mp3|wav|ogg|flac|aac)$/.test(name)) return 'audio';
    if (/zip|compressed|archive|x-tar|gzip/.test(mime) || /\.(zip|rar|7z|tar|gz|bz2)$/.test(name))
        return 'archive';
    if (
        /json|javascript|typescript|xml|css|html/.test(mime) ||
        /\.(json|js|ts|vue|php|py|xml|html|css|yaml|yml|sql)$/.test(name)
    )
        return 'code';
    if (
        /pdf|msword|officedocument|opendocument|text\/(plain|csv|rtf)/.test(mime) ||
        /\.(pdf|docx?|xlsx?|pptx?|txt|csv|rtf|odt)$/.test(name)
    )
        return 'document';
    return 'file';
}
