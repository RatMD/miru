/** Calendar dates are YYYY-MM-DD; timed instants must include Z or an offset. Ends are exclusive. */
export type ScheduleView = 'day' | 'week' | 'month' | 'agenda';
/** Host-provided labels and values; details are rendered as text, never HTML. */
export interface ScheduleEventDetail {
    label: string;
    value: string | number | boolean | null;
}
export type ScheduleDetailPresentation = 'list' | 'cards' | 'description';
export interface ScheduleFilterOption {
    value: string;
    label: string;
}
export interface ScheduleFilter {
    key: string;
    label: string;
    allLabel?: string;
    options: ScheduleFilterOption[];
}
export interface ScheduleWeekOption {
    start: string;
    end: string;
    number: number;
}
export interface ScheduleEvent<T = unknown> {
    id: string;
    title: string;
    start: string;
    end?: string | null;
    allDay?: boolean;
    openEnded?: boolean;
    color?: string;
    description?: string;
    /** Human-readable event kind, supplied or translated by the host. */
    typeLabel?: string;
    /** Optional local filter facets; unrelated business data stays in data. */
    filterValues?: Partial<Record<string, string | readonly string[]>>;
    holiday?: boolean;
    details?: ScheduleEventDetail[];
    /** Additional summary lines below the formatted date, e.g. holiday scope. */
    summary?: string[];
    detailPresentation?: ScheduleDetailPresentation;
    readonly?: boolean;
    data?: T;
}
export interface ScheduleRange {
    start: string;
    end: string;
}
export interface ScheduleSegment<T = unknown> {
    key: string;
    event: ScheduleEvent<T>;
    column: number;
    span: number;
    lane: number;
    startsHere: boolean;
    endsHere: boolean;
}
export interface ScheduleWeek<T = unknown> {
    dates: string[];
    segments: ScheduleSegment<T>[];
    lanes: number;
}
