
export type NowTypes = null | 'full' | 'date' | 'time' | 'iso' | '8601' | 'iso-8601';

/**
 * Current Date/Time as simple DB iso string.
 * @param type
 * @returns 
 */
function now(type: NowTypes = null): string {
    type = type === null ? 'full' : type;

    const date = new Date;
    if (type === 'iso' || type == '8601' || type == 'iso-8601') {
        return date.toISOString();
    } else {
        const result: string[] = [];

        if (type == 'full' || type == 'date') {
            result.push([
                date.getFullYear().toString(),
                ('00' + (date.getMonth()+1)).slice(-2),
                ('00' + date.getDate()).slice(-2)
            ].join('-'))
        }

        if (type == 'full' || type == 'time') {
            result.push([
                ('00' + date.getHours()).slice(-2),
                ('00' + date.getMinutes()).slice(-2),
                ('00' + date.getSeconds()).slice(-2)
            ].join(':'))
        }

        return result.join(' ');
    }
}

export default now;
export { now };
