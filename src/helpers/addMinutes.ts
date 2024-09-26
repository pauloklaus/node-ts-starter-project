export function addMinutes(minutes: number = 1, fromDate: Date = new Date()): Date {
  return new Date(fromDate.getTime() + minutes * 60 * 1000);
}
