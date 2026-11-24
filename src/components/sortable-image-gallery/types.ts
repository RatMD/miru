import type { AttachmentItem } from '../attachment';
/** Compatibility image contract; extended attachment metadata is optional. */
export interface UploadImage extends AttachmentItem {
    url: string | null;
    title: string;
    kind?: 'image';
}
