export function adjustTimeZone(date: Date): Date {
    const utcOffset = date.getTimezoneOffset() * 60000; 
    
    const adjustedTime = date.getTime() + (utcOffset * -1);
    const adjustedDate = new Date(adjustedTime);
    
    return adjustedDate;
}