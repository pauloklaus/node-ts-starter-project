export function generateOtpCode(size: number = 4): string {
  return Math.random().toString(16).split(".")[1].substring(0, size).toUpperCase();
}
