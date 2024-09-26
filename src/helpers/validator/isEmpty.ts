import validator from "validator";

export function isEmpty(value?: string): boolean {
  return !value || validator.isEmpty(`${value ?? ""}`);
}
