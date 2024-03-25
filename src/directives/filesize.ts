import type { Directive, DirectiveBinding } from "vue";
import filesize from "../utils/filesize";

/**
 * Format Filesize Custom Vue Directive
 * @usage v-filesize="[bytes]"
 */
const FilesizeDirective: Directive = {
    mounted(el: HTMLElement, bindings: DirectiveBinding) {
        const size = filesize(bindings.value);
        el.innerText = size;
    }
};

// Export Module
export default FilesizeDirective;
export { FilesizeDirective };
