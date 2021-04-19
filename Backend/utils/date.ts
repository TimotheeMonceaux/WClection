export function nowPlusMinutes(minutes: number): Date {
    return new Date(Date.now() + minutes * 60000);
}

export function nowPlusHours(hours: number): Date {
    return nowPlusMinutes(60 * hours);
}