import type { Directive, DirectiveBinding } from "vue";
import filesize from "../utils/filesize";

/**
 * Format Filesize Custom Vue Directive
 * @usage v-filesize="[bytes]"
 */
const FilesizeDirective: Directive = {
    mounted(el: HTMLElement, bindings: DirectiveBinding) {
        const modifiers = Object.keys(bindings.modifiers);

        // Parse Modifiers
        let metric = false;
        let digits = 1;
        for (const mod of modifiers) {
            if (!isNaN(parseInt(mod))) {
                digits = parseInt(mod);
            } else if (mod === 'metric') {
                metric = true;
            }
        }

        // Write
        const size = filesize(bindings.value, metric, digits);
        el.innerText = size;
    }
};

// Export Module
export default FilesizeDirective;
export { FilesizeDirective };
