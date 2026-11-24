import {
    computed,
    getCurrentInstance,
    getCurrentScope,
    onMounted,
    onScopeDispose,
    reactive,
    readonly,
    shallowRef,
} from 'vue';

export type ScreenOrientation = 'landscape' | 'portrait';
export interface ScreenProperty {
    width: number;
    height: number;
    orientation: ScreenOrientation | undefined;
    pixelRatio: number;
}
export interface ClientOptions {
    /** null disables browser access, useful for SSR and tests. */
    window?: Window | null;
}

/** Reactive browser information. UA detection is best effort, not feature detection. */
export function useClient(options: ClientOptions = {}) {
    const host =
        options.window === undefined
            ? typeof window === 'undefined'
                ? null
                : window
            : options.window;
    const supported = shallowRef(false);
    const browser = shallowRef<string>();
    const browserVersion = shallowRef<string>();
    const os = shallowRef<string | null>(null);
    const osVersion = shallowRef<string | null>(null);
    const agent = shallowRef('');
    const cookies = shallowRef<boolean | null>(null);
    const online = shallowRef<boolean | undefined>();
    const language = shallowRef('');
    const languages = shallowRef<readonly string[]>([]);
    const touch = shallowRef(false);
    const dark = shallowRef(false);
    const reducedMotion = shallowRef(false);
    const standalone = shallowRef(false);
    const mobile = shallowRef(false);
    const screen = reactive<ScreenProperty>({
        width: 0,
        height: 0,
        orientation: undefined,
        pixelRatio: 1,
    });
    const cleanups: (() => void)[] = [];
    let started = false;
    let disposed = false;

    function listen(target: EventTarget, name: string, callback: EventListener) {
        target.addEventListener(name, callback);
        cleanups.push(() => target.removeEventListener(name, callback));
    }

    function refresh() {
        if (!host || disposed) return;
        const nav = host.navigator;
        agent.value = nav.userAgent || '';
        // Order matters: Chromium-based browsers also contain Chrome and Safari tokens.
        const match = ['Edg', 'OPR', 'Firefox', 'CriOS', 'Chrome', 'Version']
            .map((token) => new RegExp(`(${token})/([\\d.]+)`).exec(agent.value))
            .find(Boolean);
        browser.value = match
            ? (
                  {
                      Edg: 'Microsoft Edge',
                      OPR: 'Opera',
                      Firefox: 'Firefox',
                      CriOS: 'Chrome',
                      Chrome: 'Chrome',
                      Version: 'Safari',
                  } as Record<string, string>
              )[match[1]!]
            : undefined;
        browserVersion.value = match?.[2];
        const platforms = [
            ['Windows', /Windows NT ([\d.]+)/],
            ['Android', /Android ([\d.]+)/],
            ['iOS', /(?:iPhone OS|CPU OS) ([\d_]+)/],
            ['macOS', /Mac OS X ([\d_]+)/],
            ['Linux', /Linux/],
        ] as const;
        const platform = platforms
            .map(([name, regex]) => ({ name, match: regex.exec(agent.value) }))
            .find(({ match }) => match);
        const ipad = /Macintosh/.test(agent.value) && nav.maxTouchPoints > 1;
        os.value = ipad ? 'iOS' : (platform?.name ?? null);
        osVersion.value = ipad ? null : (platform?.match?.[1]?.replaceAll('_', '.') ?? null);
        mobile.value = ipad || /Mobile|Android|iPhone|iPad|iPod/.test(agent.value);
        cookies.value = nav.cookieEnabled ?? null;
        online.value = nav.onLine;
        language.value = nav.language || '';
        languages.value = [...(nav.languages || [])];
        touch.value = nav.maxTouchPoints > 0;
        screen.width = host.document.documentElement.clientWidth || host.innerWidth || 0;
        screen.height = host.document.documentElement.clientHeight || host.innerHeight || 0;
        screen.orientation = screen.width > screen.height ? 'landscape' : 'portrait';
        screen.pixelRatio = host.devicePixelRatio || 1;
        supported.value = true;
    }

    function start() {
        if (!host || started || disposed) return;
        started = true;
        refresh();
        for (const event of ['resize', 'orientationchange', 'online', 'offline', 'languagechange'])
            listen(host, event, refresh);
        if (typeof host.matchMedia === 'function') {
            for (const [query, state] of [
                ['(prefers-color-scheme: dark)', dark],
                ['(prefers-reduced-motion: reduce)', reducedMotion],
                ['(display-mode: standalone)', standalone],
            ] as const) {
                const media = host.matchMedia(query);
                const update = () => {
                    state.value =
                        media.matches ||
                        (query === '(display-mode: standalone)' &&
                            (host.navigator as Navigator & { standalone?: boolean }).standalone ===
                                true);
                };
                update();
                listen(media, 'change', update);
            }
        }
    }

    function dispose() {
        disposed = true;
        cleanups.splice(0).forEach((cleanup) => cleanup());
    }

    // Defer reads in component setup to avoid server/client hydration differences.
    if (getCurrentInstance()) onMounted(start);
    else start();
    if (getCurrentScope()) onScopeDispose(dispose);

    return {
        isSupported: readonly(supported),
        browser: readonly(browser),
        browserVersion: readonly(browserVersion),
        browserMajorVersion: computed(() =>
            browserVersion.value ? parseInt(browserVersion.value, 10) : undefined,
        ),
        os: readonly(os),
        osVersion: readonly(osVersion),
        agent: readonly(agent),
        cookies: readonly(cookies),
        online: readonly(online),
        isApple: computed(() => os.value === 'macOS' || os.value === 'iOS'),
        isLinux: computed(() => os.value === 'Linux' || os.value === 'Android'),
        isWindows: computed(() => os.value === 'Windows'),
        isMobile: readonly(mobile),
        language: readonly(language),
        languages: readonly(languages),
        hasTouch: readonly(touch),
        prefersDark: readonly(dark),
        prefersReducedMotion: readonly(reducedMotion),
        isStandalone: readonly(standalone),
        screen: readonly(screen),
        refresh,
        dispose,
    };
}
