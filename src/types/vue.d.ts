/** Build/editor fallback for .vue imports; vue-tsc generates concrete public component types. */
declare module '*.vue' {
    import type { DefineComponent } from 'vue';

    const component: DefineComponent;

    export default component;
}
