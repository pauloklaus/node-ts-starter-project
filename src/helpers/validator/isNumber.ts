export function isNumber(aNumber: number | string): boolean {
  return `${aNumber}`.length > 0 && (Number(aNumber) === 0 || !!Number(aNumber));
}
