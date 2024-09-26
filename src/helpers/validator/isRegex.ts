export function isRegex(regex?: string): boolean {
  if (!regex) {
    return false;
  }

  try {
    new RegExp(regex);
    return true;
  } catch (error) {
    return false;
  }
}
