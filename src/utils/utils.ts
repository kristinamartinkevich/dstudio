export const getUTCTimestamp = (dateString: string) => {
    const date = new Date(dateString)
    return new Date(Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
    )).toISOString()
};