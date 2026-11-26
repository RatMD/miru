import type { StoryObj } from '@storybook/vue3-vite';
import { parseDate } from '@internationalized/date';
import { ref, shallowRef } from 'vue';
import { storyComponents as components } from './ui-components';

/** Translated story content is independent of the distributed component API. */
const labels = {
    en: {
        input: 'Text',
        search: 'Search',
        password: 'Password',
        phone: 'Phone number',
        country: 'Calling code',
        notes: 'Notes',
        choice: 'Choose an option',
        first: 'First option',
        second: 'Second option',
        accept: 'Accept notifications',
        enabled: 'Enable notifications',
        bold: 'Bold',
        tags: 'Add a tag',
        removeTag: 'Remove tag',
        color: 'Choose a color',
        date: 'Choose a date',
        upload: 'Choose files or drop them here',
        uploadDescription: 'PNG or JPEG images, up to 1 MiB each.',
        code: 'Verification code',
    },
    de: {
        input: 'Text',
        search: 'Suchen',
        password: 'Passwort',
        phone: 'Telefonnummer',
        country: 'Vorwahl',
        notes: 'Notizen',
        choice: 'Option auswählen',
        first: 'Erste Option',
        second: 'Zweite Option',
        accept: 'Benachrichtigungen akzeptieren',
        enabled: 'Benachrichtigungen aktivieren',
        bold: 'Fett',
        tags: 'Tag hinzufügen',
        removeTag: 'Tag entfernen',
        color: 'Farbe auswählen',
        date: 'Datum auswählen',
        upload: 'Dateien auswählen oder hier ablegen',
        uploadDescription: 'PNG- oder JPEG-Bilder, jeweils bis zu 1 MiB.',
        code: 'Bestätigungscode',
    },
} as const;

let formStoryInstance = 0;
/** Unique across separate Vue roots rendered together on a Storybook Docs page. */
export function nextFormStoryId(): string {
    return 'form-story-' + ++formStoryInstance;
}

export function formStory(template: string): StoryObj['render'] {
    return (args, { globals }) => ({
        components,
        setup() {
            const locale = globals.locale === 'de' ? 'de-DE' : 'en-US';
            const text = labels[globals.locale === 'de' ? 'de' : 'en'];
            const region = new Intl.DisplayNames(locale, { type: 'region' });
            return {
                args,
                instanceId: nextFormStoryId(),
                locale,
                labels: text,
                text: ref(''),
                search: ref(''),
                password: ref(''),
                phone: ref<string | null>(null),
                number: ref(2),
                otp: ref(''),
                notes: ref(''),
                selection: ref('first'),
                checked: ref(false),
                checks: ref<string[]>([]),
                enabled: ref(false),
                pressed: ref(false),
                tags: ref<string[]>(['MIRU']),
                color: ref<string | null>('#4f46e5'),
                date: ref<string | null>('2026-11-17'),
                time: ref('12:30'),
                dateTime: ref<string | null>('2026-11-17T12:30'),
                day: shallowRef(parseDate('2026-11-17')),
                range: shallowRef({ start: parseDate('2026-11-17'), end: parseDate('2026-11-20') }),
                files: shallowRef<File[]>([]),
                options: [
                    { value: 'first', label: text.first },
                    { value: 'second', label: text.second },
                ],
                countries: [
                    { value: 'DE', callingCode: '+49', label: region.of('DE')!, pinned: true },
                    { value: 'AT', callingCode: '+43', label: region.of('AT')!, pinned: false },
                    { value: 'US', callingCode: '+1', label: region.of('US')!, pinned: false },
                ],
            };
        },
        template:
            '<ContextProvider :locale="locale"><div style="min-width:16rem;max-width:44rem;display:grid;gap:1rem">' +
            template +
            '</div></ContextProvider>',
    });
}
