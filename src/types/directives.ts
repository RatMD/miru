import type { vClickOutside } from '../plugins/click-outside';
import type { vDayjs } from '../plugins/dayjs';
import type { vFileSize, vFilesize } from '../plugins/filesize';
import type { vPrice } from '../plugins/price';
import type { vResize } from '../plugins/resize';
import type { vTinymce } from '../plugins/tinymce';

/** Template names and binding types of the directives registered by Miru. */
interface MiruGlobalDirectives {
    vClickOutside: typeof vClickOutside;
    vDayjs: typeof vDayjs;
    vFilesize: typeof vFilesize;
    vFileSize: typeof vFileSize;
    vPrice: typeof vPrice;
    vResize: typeof vResize;
    vTinymce: typeof vTinymce;
}

declare module 'vue' {
    /** Supply template type checking; runtime registration still requires installing the plugin. */
    // eslint-disable-next-line @typescript-eslint/no-empty-object-type -- Vue's augmentation interface extends the shared directive map.
    interface GlobalDirectives extends MiruGlobalDirectives {}
}

// Export module
export type { MiruGlobalDirectives };
