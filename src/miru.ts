import type { NavigationAdapter } from './adapters/ajax';
import type { DataTableBackendAdapter } from './components/data-table/contracts';
import type { ToasterProps } from './components/toast';
import type { PageToast } from './composables/useToast';
import type { BreakpointMap } from './constants/breakpoints';
import type { I18nOptions } from './plugins/i18n';
import type { TinymceOptions } from './plugins/tinymce';
import type { ValidationFactories } from './plugins/validation';
import type { FormAdapter, FormAdapterSelection, MiruAdapter } from './types/adapters';
import type { App, Component, InjectionKey, MaybeRefOrGetter, Plugin, VNode } from 'vue';

import { h, shallowReactive } from 'vue';
import { ajaxAdapter } from './adapters/ajax';
import PageRoot from './layouts/PageRoot.vue';
import { createMiruDirectives } from './plugins/directives';
import { createMiruI18n } from './plugins/i18n';
import { createMiruValidation } from './plugins/validation';

/** App-local settings shared by Miru plugins, composables and the optional PageRoot wrapper. */
interface MiruOptions extends I18nOptions {
    /** Host form/navigation integration; AJAX is installed by default. */
    adapter?: MiruAdapter;
    /** Default form transport; individual useForm adapters/modes take precedence. */
    formAdapter?: FormAdapterSelection;
    /** Optional app-local integrations for named form adapters. */
    formAdapters?: Partial<Record<'ajax' | 'inertia', FormAdapter>>;
    /** Host navigation and link component; defaults to browser navigation. */
    navigation?: NavigationAdapter;
    /** Backend list/pagination conventions; independent of the transport adapter. */
    dataTable?: DataTableBackendAdapter;
    /** App-local viewport thresholds for Breakpoint/useBreakpoint; component options override these values. */
    breakpoints?: BreakpointMap;
    /**
     * Select automatic plugin installation; all built-in plugins are enabled by default.
     * Set false for configuration-only setup. Configuration and configure still run.
     */
    plugins?:
        | false
        | {
              /** Provide app-local translations and the configured host adapter. */
              i18n?: boolean;
              /** Register formatting, editor and DOM directives. */
              directives?: boolean;
              /** Register custom schema factories for useValidation. */
              validation?: boolean;
          };
    /**
     * Custom Zod schema factories exposed by useValidation alongside the built-in validators.
     * The validation plugin captures a snapshot at installation; built-in names are reserved.
     */
    validators?: ValidationFactories;
    /**
     * Run synchronous setup after configuration is provided and before automatic plugins.
     * Use app.use() for host plugins, mutate options or return shallow configuration overrides.
     * Vue inject() is available here; complete asynchronous preparation before app.use(miru).
     */
    configure?: (context: MiruConfigureContext) => MiruConfiguration | void;
    /** ISO 4217 currency used by v-price; defaults to EUR when the directive is installed. */
    currency?: string;
    /**
     * Set false to skip all automatic directive registration, equivalent to plugins.directives.
     * Includes v-price, v-number-format, v-dayjs, v-filesize/v-file-size, v-resize, v-click-outside and v-tinymce.
     */
    directives?: boolean;
    /** Host TinyMCE settings, currently licenseKey; applied when directives are installed. */
    tinymce?: TinymceOptions;
    /**
     * Options and appearance for the Toast container mounted by PageRoot/miru.wrap().
     * Set false to disable that container and page-toast processing; app.use() alone mounts neither.
     */
    toast?: false | ToasterProps;
    /**
     * Reactive host-owned notifications consumed by PageRoot, with deduplication and teardown.
     * Accept an array, ref or getter; capture composables such as usePage() in setup first.
     * Defaults to no page notifications and is ignored by PageRoot when toast is false.
     */
    pageToasts?: MaybeRefOrGetter<readonly PageToast[] | undefined>;
}

/** Typed injection key for the configuration belonging to the current Vue application. */
const miruOptionsKey: InjectionKey<MiruOptions> = Symbol('MiruOptions');

/** Settings that configure may inspect, mutate or return without supplying another setup hook. */
type MiruConfiguration = Omit<MiruOptions, 'configure'>;

/** Context passed to the synchronous configure callback during installation. */
interface MiruConfigureContext {
    /** Host application; use it to register host-owned plugins and services. */
    app: App;
    /** This app's shallow-reactive configuration; returned overrides are assigned onto it. */
    options: MiruConfiguration;
}

/**
 * Provide a fresh reactive configuration for one Vue application.
 * @param app Vue application receiving the configuration.
 * @param options Initial Miru settings; the top-level object is copied per app.
 * @returns The provided mutable configuration.
 */
function installMiruConfig(app: App, options: MiruOptions = {}): MiruOptions {
    const defaults = ajaxAdapter();
    const adapter = { ...defaults, ...options.adapter };
    const config = shallowReactive({
        ...adapter,
        ...options,
        formAdapter: options.formAdapter ?? adapter?.formAdapter,
        navigation: options.navigation ?? adapter?.navigation,
        locale:
            options.locale ??
            (adapter?.locale !== undefined ? (options.i18n?.locale ?? adapter.locale) : undefined),
        pageToasts: options.pageToasts ?? adapter?.pageToasts,
        formAdapters: {
            ...defaults.formAdapters,
            ...adapter.formAdapters,
            ...options.formAdapters,
        },
        ...(options.breakpoints
            ? { breakpoints: shallowReactive({ ...options.breakpoints }) }
            : {}),
    });
    app.provide(miruOptionsKey, config);
    return config;
}

/**
 * Create a configuration-only plugin for manual Miru installation.
 * @param options Settings made available to composables and separately installed plugins.
 * @returns A Vue plugin that provides configuration without running configure or other plugins.
 */
function createMiruConfig(options: MiruOptions = {}): Plugin {
    return {
        /**
         * Provide configuration without automatically installing Miru services.
         * @param app Vue application receiving the settings.
         * @returns Nothing.
         */
        install(app) {
            installMiruConfig(app, options);
        },
    };
}

type MiruInstallation = Plugin & {
    /**
     * Wrap the application root with Miru's shared UI services.
     * @param component Root component to render inside PageRoot.
     * @param props Optional props forwarded to the root component.
     * @returns A PageRoot vnode containing the supplied component.
     */
    wrap(component: Component, props?: object): VNode;
};

/**
 * Provide app-local configuration, run setup and register the enabled built-in plugins.
 * @param app Vue application receiving the Miru configuration and plugins.
 * @param options Translation, validation, directive and root-service settings.
 * @returns Nothing; an asynchronous configure callback throws before plugins are installed.
 */
function install(app: App, options: MiruOptions = {}): void {
    const config = installMiruConfig(app, options);
    const configured = app.runWithContext(() => config.configure?.({ app, options: config }));
    if (configured && typeof (configured as { then?: unknown }).then === 'function') {
        throw new TypeError(
            'Miru configure must be synchronous. Complete asynchronous setup before app.use().',
        );
    }

    if (configured) {
        Object.assign(config, configured);
    }

    if (config.plugins === false) {
        return;
    }

    if (config.plugins?.i18n !== false) {
        app.use(createMiruI18n());
    }

    if (config.plugins?.validation !== false) {
        app.use(createMiruValidation());
    }

    if (config.plugins?.directives !== false && config.directives !== false) {
        app.use(createMiruDirectives());
    }
}

/**
 * Create a Vue plugin with configuration and an optional application-root wrapper.
 * @param options Settings applied when the host calls app.use(); import the stylesheet separately.
 * @returns A Miru plugin whose wrap method adds the shared PageRoot services.
 */
function createMiru(options: MiruOptions = {}): MiruInstallation {
    return {
        /**
         * Install Miru in the host application using the captured options.
         * @param app Vue application receiving Miru.
         * @returns Nothing.
         */
        install(app: App): void {
            install(app, options);
        },

        /**
         * Render the host root inside PageRoot; use once around the application.
         * @param component Root component to wrap.
         * @param props Optional props forwarded to the root component.
         * @returns A vnode containing the root and Miru's shared UI services.
         */
        wrap(component: Component, props?: object): VNode {
            return h(PageRoot, null, { default: () => h(component, props) });
        },
    };
}

/** Vue plugin for hosts using app.use(MiruPlugin, options) without the wrap helper. */
const MiruPlugin: Plugin<[MiruOptions?]> = { install };

// Export module
export { createMiru, MiruPlugin, createMiruConfig, installMiruConfig, miruOptionsKey };
export type { MiruInstallation, MiruAdapter };
export type { MiruOptions, MiruConfiguration, MiruConfigureContext };
export type { MiruGlobalDirectives } from './types/directives';
export default MiruPlugin;
