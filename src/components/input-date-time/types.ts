/** Local wall-clock times; partial ranges remain editable. */
interface TimeframeValue {
    start: string | null;
    end: string | null;
}
type InputDateTimeMode = 'datetime' | 'date' | 'time' | 'timeframe';
type InputDateTimeValue = string | TimeframeValue | null;
export type { TimeframeValue, InputDateTimeMode, InputDateTimeValue };
