/** Default viewport thresholds in CSS pixels, including the legacy small-screen names. */
const defaultBreakpoints = Object.freeze({
    xxs: 364,
    xs: 576,
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    xxl: 1536,
});
type BreakpointMap = Readonly<Record<string, number>>;
type BreakpointValue = number | string | null;

export { defaultBreakpoints };
export type { BreakpointMap, BreakpointValue };
