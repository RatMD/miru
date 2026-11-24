export type AttachmentKind = 'image' | 'video' | 'audio' | 'document' | 'archive' | 'code' | 'file';
export type AttachmentStatus = 'idle' | 'uploading' | 'processing' | 'success' | 'error';
export interface AttachmentMetadata {
    title?: string;
    description?: string;
}
/** Uploading, persistence and object-URL ownership remain with the host. */
export interface AttachmentItem extends AttachmentMetadata {
    id: string;
    name?: string;
    url?: string | null;
    thumbnailUrl?: string | null;
    kind?: AttachmentKind;
    mimeType?: string;
    size?: number;
    file?: File;
    status?: AttachmentStatus;
    progress?: number;
    error?: string;
    disabled?: boolean;
    translations?: Record<string, AttachmentMetadata>;
}
