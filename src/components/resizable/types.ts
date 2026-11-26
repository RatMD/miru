export interface ResizablePanelApi {
    collapse: () => void;
    expand: () => void;
    resize: (size: number) => void;
    getSize: () => number;
    readonly isCollapsed: boolean;
    readonly isExpanded: boolean;
}
export type ResizableDirection = 'horizontal' | 'vertical';
