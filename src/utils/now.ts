
/**
 * Current Date/Time as simple DB iso string.
 * @returns 
 */
function now(): string {
    const date = new Date;
    return [
        date.getFullYear().toString(),
        ('00' + (date.getMonth()+1)).slice(-2),
        ('00' + date.getDate()).slice(-2)
    ].join('-')
    + ' ' +
    [
        ('00' + date.getHours()).slice(-2),
        ('00' + date.getMinutes()).slice(-2),
        ('00' + date.getSeconds()).slice(-2)
    ].join(':')
}

export default now;
export { now };
