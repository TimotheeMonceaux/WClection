export function nowPlusMinutes(minutes: number): Date {
    return new Date(Date.now() + minutes * 60000);
}