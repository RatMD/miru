import type { PageToast } from '../composables/useToast';
import type { Args, StoryObj } from '@storybook/vue3-vite';
import {
    IconCheck,
    IconInfoCircle,
    IconMail,
    IconClipboard,
    IconStar,
    IconTrash,
    IconTruck,
    IconPackage,
    IconEdit,
} from '@tabler/icons-vue';
import { STORY_ARGS_UPDATED } from 'storybook/internal/core-events';
import { addons, useArgs } from 'storybook/preview-api';
import { computed, ref, shallowRef, watch } from 'vue';
import { avatarColorVariants } from '../components/avatar';
import { buttonColorVariants } from '../components/button';
import { buttonActionColorVariants } from '../components/button-action';
import { progressColorVariants } from '../components/progress';
import { useToast } from '../composables/useToast';
import { controlDefinition } from './component-controls';
import { storyComponents } from './ui-components';
const content = {
    en: {
        restart: 'Restart',
        timerEnded: 'Timer finished',
        favorite: 'Favorite',
        remove: 'Delete',
        title: 'Project activity',
        description: 'Shared components with themeable styles.',
        first: 'Overview',
        second: 'Activity',
        third: 'Settings',
        open: 'Open example',
        confirm: 'Confirm',
        cancel: 'Cancel',
        closed: 'Confirmed',
        notice: 'Changes saved',
        details: 'Additional information',
        copy: 'Copy reference',
        more: 'Show details',
        email: 'Email',
        home: 'Home',
        projects: 'Projects',
        current: 'MIRU',
        empty: 'No data available',
        count: 'Items',
        choose: 'Choose an action',
        edit: 'Edit',
        archive: 'Archive',
        notifications: 'Notifications',
        loading: 'Loading',
        summary: 'Summary',
        ready: 'Ready',
        privacy: 'Private workspace',
        help: 'Contextual help',
        line: 'Weekly activity',
        bar: 'Activity by team',
        donut: 'Status distribution',
        success: 'Saved successfully',
        warning: 'Review this item',
        error: 'Unable to save',
        info: 'New information available',
    },
    de: {
        restart: 'Neu starten',
        timerEnded: 'Timer abgelaufen',
        favorite: 'Favorisieren',
        remove: 'Löschen',
        title: 'Projektaktivität',
        description: 'Gemeinsame Komponenten mit anpassbaren Styles.',
        first: 'Übersicht',
        second: 'Aktivität',
        third: 'Einstellungen',
        open: 'Beispiel öffnen',
        confirm: 'Bestätigen',
        cancel: 'Abbrechen',
        closed: 'Bestätigt',
        notice: 'Änderungen gespeichert',
        details: 'Weitere Informationen',
        copy: 'Referenz kopieren',
        more: 'Details anzeigen',
        email: 'E-Mail',
        home: 'Startseite',
        projects: 'Projekte',
        current: 'MIRU',
        empty: 'Keine Daten verfügbar',
        count: 'Einträge',
        choose: 'Aktion auswählen',
        edit: 'Bearbeiten',
        archive: 'Archivieren',
        notifications: 'Benachrichtigungen',
        loading: 'Wird geladen',
        summary: 'Zusammenfassung',
        ready: 'Bereit',
        privacy: 'Privater Arbeitsbereich',
        help: 'Kontextbezogene Hilfe',
        line: 'Wöchentliche Aktivität',
        bar: 'Aktivität nach Team',
        donut: 'Statusverteilung',
        success: 'Erfolgreich gespeichert',
        warning: 'Eintrag überprüfen',
        error: 'Speichern fehlgeschlagen',
        info: 'Neue Informationen verfügbar',
    },
};
export function componentStory(
    template: string,
    name = template.match(/<([A-Z][A-Za-z]+)/)?.[1] ?? '',
): StoryObj['render'] {
    return (args: Args, context) => {
        const { globals } = context;
        const [, updateArgs] = context.id
            ? useArgs()
            : [args, (next: Record<string, unknown>) => Object.assign(args, next)];
        if (!context.id) args = { ...controlDefinition(name).args, ...args };
        return {
            components: {
                ...storyComponents,
                IconCheck,
                IconInfoCircle,
                IconMail,
                IconClipboard,
                IconStar,
                IconTrash,
                IconTruck,
                IconPackage,
                IconEdit,
            },
            setup() {
                const labels = content[globals.locale === 'de' ? 'de' : 'en'];
                const definition = controlDefinition(name);
                // Mirror the Vue args proxy after either Controls input or a widget interaction.
                // Otherwise a return to an initial value can leave the manager's editor stale.
                if (context.id)
                    watch(
                        () => ({ ...args }),
                        (next) => {
                            addons
                                .getChannel()
                                .emit(STORY_ARGS_UPDATED, { storyId: context.id, args: next });
                        },
                        { deep: true },
                    );
                const localizedArgs = computed(() =>
                    Object.fromEntries(
                        Object.entries(args).map(([key, value]) => {
                            const translated =
                                typeof value === 'string'
                                    ? Object.entries(content.en).find(
                                          ([, text]) => text === value,
                                      )?.[0]
                                    : undefined;
                            return [
                                key,
                                translated ? labels[translated as keyof typeof labels] : value,
                            ];
                        }),
                    ),
                );
                function controlProps(part = 'root'): Record<string, unknown> {
                    const keys = definition.parts?.[part] ?? Object.keys(definition.argTypes);
                    return Object.fromEntries(
                        keys
                            .filter((key) => key in localizedArgs.value)
                            .map((key) => [key, localizedArgs.value[key]]),
                    );
                }
                function model<T>(key: string, fallback: T) {
                    const local = shallowRef<T>((args[key] ?? fallback) as T);
                    watch(
                        () => args[key],
                        (value) => {
                            local.value = (value ?? fallback) as T;
                        },
                        { deep: true },
                    );
                    return computed<T>({
                        get: () => {
                            const value = local.value;
                            if (name === 'Accordion' && key === 'modelValue') {
                                return (
                                    args.type === 'multiple'
                                        ? Array.isArray(value)
                                            ? value
                                            : []
                                        : typeof value === 'string'
                                          ? value
                                          : ''
                                ) as T;
                            }
                            return (value ?? fallback) as T;
                        },
                        set: (next) => {
                            local.value = next;
                            if (context.viewMode !== 'docs' && key in args)
                                updateArgs({ [key]: next });
                        },
                    });
                }
                const accordion = model<string | string[]>(
                    'modelValue',
                    args.type === 'multiple' ? [] : '',
                );
                watch(
                    () => args.type,
                    (value) => {
                        if (
                            name === 'Accordion' &&
                            Array.isArray(accordion.value) !== (value === 'multiple')
                        )
                            accordion.value = value === 'multiple' ? [] : '';
                    },
                );
                const avatarSize = computed(
                    () =>
                        ({
                            sm: 'size-6 text-xs',
                            default: 'size-8 text-sm',
                            lg: 'size-12 text-lg',
                        })[args.size as 'sm' | 'default' | 'lg'] ?? 'size-8',
                );
                const avatarTone = computed(
                    () =>
                        ({
                            neutral:
                                'bg-neutral-200 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100',
                            primary: 'bg-primary-600 text-white',
                            secondary: 'bg-secondary-600 text-white',
                            info: 'bg-info-100 text-info-800',
                            success: 'bg-success-100 text-success-800',
                            warning: 'bg-warning-100 text-warning-800',
                        })[args.tone as 'neutral'] ?? '',
                );
                const toast = useToast();
                const pageToasts = ref<PageToast[]>([]);
                useToast({ pageToasts });
                const showPageToast = () =>
                    (pageToasts.value = [
                        {
                            id: 'storybook-server-toast',
                            status: 'info',
                            title: labels.info,
                            description: labels.description,
                            duration: 5000,
                            closable: true,
                        },
                    ]);
                const tabs = [
                    { value: 'overview', label: labels.first },
                    { value: 'activity', label: labels.second, badge: 7, tone: 'success' },
                    { value: 'settings', label: labels.third, disabled: true },
                ];
                const series = [
                    { name: labels.first, data: [12, 28, 18, 40, 31, 55, 46] },
                    { name: labels.second, data: [8, 15, 22, 27, 21, 34, 40] },
                ];
                return {
                    avatarColors: avatarColorVariants,
                    progressColors: progressColorVariants,
                    timerButton: ref<{ restartTimer(): void } | null>(null),
                    detailSections: [
                        {
                            id: 'request',
                            label: labels.first,
                            language: 'json',
                            value: {
                                method: 'POST',
                                path: '/api/items',
                                payload: { id: 42, status: 'ready' },
                            },
                        },
                        {
                            id: 'response',
                            label: labels.second,
                            language: 'html',
                            value: '<section><h2>MIRU</h2><p>Shared UI</p></section>',
                        },
                        {
                            id: 'context',
                            label: labels.third,
                            language: 'json',
                            value: { requestId: 'SH-2026-001', locale: globals.locale || 'en' },
                        },
                    ],
                    actionColors: buttonActionColorVariants,
                    favorites: ref<string[]>([]),
                    colors: buttonColorVariants,
                    breadcrumbValue: ref('overview'),
                    args: localizedArgs,
                    labels,
                    controlProps,
                    accordion,
                    avatarSize,
                    avatarTone,
                    open: model('open', false),
                    choiceOpen: model('open', false),
                    noticeOpen: model('open', false),
                    feedback: ref(''),
                    checked: model('checked', true),
                    active: model('modelValue', 'overview'),
                    page: model('page', 1),
                    progress: ref(64),
                    tabs,
                    series,
                    chartOptions: {
                        xaxis: { categories: ['1', '2', '3', '4', '5', '6', '7'] },
                        chart: { animations: { enabled: false } },
                    },
                    donutOptions: {
                        labels: [labels.ready, labels.loading, labels.archive],
                        chart: { animations: { enabled: false } },
                    },
                    toast,
                    showPageToast,
                };
            },
            template:
                '<div style="width:min(44rem,calc(100vw - 4rem));display:grid;gap:1rem;max-width:100%">' +
                template +
                '</div>',
        };
    };
}
