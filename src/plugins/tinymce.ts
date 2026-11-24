import type { I18nTranslator } from './i18n';
import type { Editor, TinyMCE } from 'tinymce';
import type { App, Plugin, ObjectDirective } from 'vue';
import documentContent from 'tinymce/skins/content/default/content.min.css?inline';
import uiContent from 'tinymce/skins/ui/oxide/content.min.css?inline';
import 'tinymce/skins/ui/oxide/skin.min.css';
import darkSkin from 'tinymce/skins/ui/oxide-dark/skin.min.css?inline';
import './tinymce-theme.css';
import { translateI18n } from './i18n';
import { registerEditorIcons } from './tinymce-icons';
export interface TinymceBinding {
    licenseKey?: string;
    value: string;
    label: string;
    locale: string;
    translate?: I18nTranslator;
    disabled?: boolean;
    update: (value: string) => void;
    readonly?: boolean;
    dark?: boolean;
    height?: number;
    toolbar?: string | false;
    placeholder?: string;
    blur?: () => void;
    ready?: (editor: Editor) => void;
    error?: (error: unknown) => void;
}
export interface TinymceOptions {
    licenseKey?: string;
}
let editorOptions: TinymceOptions = {};
/** Configure host-owned editor settings before mounting fields. */
export function configureTinymce(options: TinymceOptions): void {
    editorOptions = { ...options };
}

const editors = new WeakMap<
    HTMLTextAreaElement,
    { editor?: Editor; binding: TinymceBinding; disposed: boolean }
>();
let runtime: Promise<TinyMCE> | undefined;

/** Load the installed editor locally; no remote script or language service is required. */
async function loadEditor(): Promise<TinyMCE> {
    runtime ??= (async () => {
        const tiny = await import('tinymce');
        await Promise.all([
            import('tinymce/models/dom'),
            import('tinymce/themes/silver'),
            import('tinymce/icons/default'),
            import('tinymce/plugins/lists'),
        ]);
        return tiny.default;
    })();
    return runtime;
}

/** Refresh iframe presentation without changing HTML, selection or undo history. */
function updateContentAppearance(element: HTMLTextAreaElement, editor: Editor): void {
    const colors = getComputedStyle(element);
    const html = editor.getDoc().documentElement;
    for (let index = 0; index < colors.length; index++) {
        const property = colors.item(index);
        if (
            property.startsWith('--ui-') &&
            html.style.getPropertyValue(property) !== colors.getPropertyValue(property)
        )
            html.style.setProperty(property, colors.getPropertyValue(property));
    }
    html.style.fontSize = getComputedStyle(element.ownerDocument.documentElement).fontSize;
    html.style.colorScheme = colors.colorScheme;
    const body = editor.getBody();
    body.style.backgroundColor = colors.backgroundColor;
    body.style.color = colors.color;
    body.style.fontFamily = colors.fontFamily;
}

/** Bind a normal form textarea to TinyMCE while retaining Vue's field lifecycle. */
export const vTinymce: ObjectDirective<HTMLTextAreaElement, TinymceBinding> = {
    async mounted(element, binding) {
        const state = {
            binding: binding.value,
            disposed: false,
            editor: undefined as Editor | undefined,
        };
        const trans = (key: string): string => {
            const value = state.binding.translate?.(key, {}, state.binding.locale);
            return value !== undefined && value !== key
                ? value
                : translateI18n(state.binding.locale, key);
        };
        editors.set(element, state);
        try {
            const tiny = await loadEditor();
            if (!element.ownerDocument.querySelector('style[data-miru-editor-dark]')) {
                const style = element.ownerDocument.createElement('style');
                style.dataset.miruEditorDark = '';
                style.textContent =
                    '@scope (:is(.dark, [data-theme="dark"], [data-editor-theme="dark"])) {' +
                    darkSkin +
                    '}';
                element.ownerDocument.head.append(style);
            }
            if (state.disposed) return;
            const strings = {
                Undo: 'undo',
                Redo: 'redo',
                Bold: 'bold',
                Italic: 'italic',
                Underline: 'underline',
                'Bullet list': 'bullets',
                'Numbered list': 'numbering',
                'Clear formatting': 'clear',
                Blocks: 'blocks',
                Paragraph: 'paragraph',
                Headings: 'headings',
                'Heading 1': 'heading1',
                'Heading 2': 'heading2',
                'Heading 3': 'heading3',
                'Rich Text Area': 'area',
                'Rich Text Area. Press ALT-0 for help.': 'area_help',
            };
            tiny.addI18n(
                state.binding.locale.toLowerCase().startsWith('de') ? 'de' : 'en',
                Object.fromEntries(
                    Object.entries(strings).map(([key, value]) => [
                        key,
                        trans('common.form.editor.' + value),
                    ]),
                ),
            );
            await tiny.init({
                target: element,
                license_key: state.binding.licenseKey ?? editorOptions.licenseKey ?? 'gpl',
                language: state.binding.locale.toLowerCase().startsWith('de') ? 'de' : 'en',
                menubar: false,
                toolbar:
                    state.binding.toolbar ??
                    'undo redo | blocks | bold italic underline | bullist numlist | removeformat',
                placeholder: state.binding.placeholder,
                toolbar_mode: 'wrap',
                ui_mode: 'split',
                contextmenu: false,
                preview_styles: false,
                block_formats: [
                    trans('common.form.editor.paragraph') + '=p',
                    trans('common.form.editor.heading2') + '=h2',
                    trans('common.form.editor.heading3') + '=h3',
                ].join(';'),
                statusbar: false,
                branding: false,
                promotion: false,
                skin: false,
                content_css: false,
                content_style:
                    uiContent +
                    documentContent +
                    'html { color-scheme: inherit; } body { margin:0; padding:var(--ui-editor-content-padding,1rem); font-family:var(--ui-font-sans,system-ui,sans-serif); font-size:var(--ui-editor-font-size,.875rem); line-height:1.6; overflow-wrap:break-word; } ' +
                    'p { margin:0 0 .75em; } p:last-child { margin-bottom:0; } h1,h2,h3 { font-family:var(--ui-font-heading,var(--ui-font-sans,system-ui,sans-serif)); line-height:1.3; margin:1em 0 .5em; } ' +
                    'ul,ol { padding-inline-start:1.5em; margin:.5em 0 .75em; } a { color:var(--ui-primary,inherit); } :focus-visible { outline-color:var(--ui-ring); }',
                plugins: 'lists',
                height: state.binding.height ?? 380,
                iframe_attrs: { title: state.binding.label },
                setup(editor) {
                    state.editor = editor;
                    registerEditorIcons(editor, element.ownerDocument);
                    editor.on('init', () => {
                        if (state.disposed) {
                            editor.remove();
                            return;
                        }
                        updateContentAppearance(element, editor);
                        editor.setContent(state.binding.value);
                        editor.mode.set(
                            state.binding.disabled || state.binding.readonly
                                ? 'readonly'
                                : 'design',
                        );
                        state.binding.ready?.(editor);
                    });
                    editor.on('focus', () => {
                        editor.getContainer().dataset.focused = 'true';
                    });
                    editor.on('blur', () => {
                        delete editor.getContainer().dataset.focused;
                        state.binding.blur?.();
                    });
                    editor.on('input change undo redo', () =>
                        state.binding.update(editor.getContent()),
                    );
                },
            });
        } catch (error) {
            state.editor?.remove();
            if (!state.disposed) {
                element.style.display = '';
                state.binding.error?.(error);
            }
        }
    },
    updated(element, binding) {
        const state = editors.get(element);
        if (!state) return;
        state.binding = binding.value;
        if (state.editor?.initialized) {
            if (state.editor.getContent() !== binding.value.value)
                state.editor.setContent(binding.value.value);
            state.editor.mode.set(
                binding.value.disabled || binding.value.readonly ? 'readonly' : 'design',
            );
            if (binding.value.height)
                state.editor.getContainer().style.height = binding.value.height + 'px';
            updateContentAppearance(element, state.editor);
        }
    },
    beforeUnmount(element) {
        const state = editors.get(element);
        if (state) {
            state.disposed = true;
            state.editor?.remove();
            editors.delete(element);
        }
    },
};

/** Optional global registration; Editor uses vTinymce locally and needs no app.use call. */
export const TinymcePlugin: Plugin<[TinymceOptions?]> = {
    install(app: App, options?: TinymceOptions): void {
        if (options) configureTinymce(options);
        app.directive('tinymce', vTinymce);
    },
};
export default TinymcePlugin;
