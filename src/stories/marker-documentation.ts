import { componentDependenciesMarkdown } from './component-dependencies.ts';

export const markerSummaries: Record<string, string> = {
    Marker: 'A compact layout for activity entries, with an optional icon, content and metadata. Combine its building blocks to show updates or compose a timeline.',
    MarkerContent: 'The flexible content area of an activity entry.',
    MarkerIcon: 'A decorative icon container beside an activity entry.',
    MarkerMeta: 'A timestamp and author beside an activity entry, with localised date formatting.',
};
export function markerDependencyMarkdown(storybook = false) {
    return componentDependenciesMarkdown(
        { packages: ['clsx', 'dayjs', 'tailwind-merge', 'vue'] },
        storybook,
    );
}
type Copy = { props: Record<string, string>; slots: Record<string, string> };
const classProp = { class: 'Additional CSS classes for this marker element.' };
export const markerApiCopy: Record<string, Copy> = {
    Marker: { props: classProp, slots: { default: 'The entry icon, content and metadata.' } },
    MarkerContent: {
        props: classProp,
        slots: { default: 'The entry heading, description and supporting content.' },
    },
    MarkerIcon: {
        props: classProp,
        slots: { default: 'A decorative icon or symbol; hidden from assistive technology.' },
    },
    MarkerMeta: {
        props: {
            ...classProp,
            date: 'The timestamp to display; invalid or missing values hide the date.',
            author: 'The author name; also controls whether the author slot is shown.',
            format: 'The Day.js date format; uses the locale-specific date and time format when omitted.',
        },
        slots: {
            date: 'Custom date content, shown only when date is valid.',
            author: 'Custom author content, shown only when author is non-empty.',
        },
    },
};
export const markerNotes = [
    {
        title: 'Activity entries and metadata',
        text: 'Compose MarkerIcon, MarkerContent and MarkerMeta within Marker. MarkerIcon is decorative, so include meaningful information in the entry text. MarkerMeta uses German date formatting for locales beginning with `de` and English formatting otherwise; `format` overrides the display format. The date remains a native `time` element with an ISO timestamp. Timeline connectors and list semantics are supplied by the application. These building blocks expose no component-specific events or model bindings.',
    },
];
