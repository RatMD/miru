/** Shared Day.js instance with formatting, duration, relative time and timezone plugins. */
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat.js';
import duration from 'dayjs/plugin/duration.js';
import isoWeek from 'dayjs/plugin/isoWeek.js';
import relativeTime from 'dayjs/plugin/relativeTime.js';
import timezone from 'dayjs/plugin/timezone.js';
import utc from 'dayjs/plugin/utc.js';
import 'dayjs/locale/de.js';
// Retain plugin type augmentations in the published declaration file too.
import 'dayjs/plugin/advancedFormat.js';
import 'dayjs/plugin/duration.js';
import 'dayjs/plugin/isoWeek.js';
import 'dayjs/plugin/relativeTime.js';
import 'dayjs/plugin/timezone.js';
import 'dayjs/plugin/utc.js';

dayjs.extend(isoWeek);
dayjs.extend(advancedFormat);
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);

// Export module
export { dayjs };
