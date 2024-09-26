export function addMinutes(minutes: number): Date {
  const newDate = new Date();
  return new Date(newDate.setTime(newDate.getTime() + minutes * 60 * 1000));
}
