import type { ObjectDirective, DirectiveBinding } from 'vue';
import { filesize } from '../support/filesize';
export type FilesizeValue = number | string | null | undefined;
/** Use v-filesize:2.metric for two SI decimal places; .digits remains the legacy one-decimal modifier. */
function render(el: HTMLElement, binding: DirectiveBinding<FilesizeValue>): void {
    const value = binding.value;
    const bytes = Number(value);
    const requested = Number(binding.arg ?? 1);
    const digits = Number.isFinite(requested)
        ? Math.max(0, Math.min(20, Math.trunc(requested)))
        : 1;
    el.textContent =
        value == null || value === '' || !Number.isFinite(bytes)
            ? ''
            : filesize(bytes, !!binding.modifiers.metric, digits);
}
const directiveFilesize: ObjectDirective<HTMLElement, FilesizeValue> = {
    mounted: render,
    updated: render,
};
export { directiveFilesize, directiveFilesize as vFilesize, directiveFilesize as vFileSize };
export default directiveFilesize;
