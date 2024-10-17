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

export const UTCToDate = (dateString: string) => {
    return new Date(dateString).toISOString().split('T')[0];
};