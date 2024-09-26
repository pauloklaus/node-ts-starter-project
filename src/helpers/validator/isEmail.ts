import validator from "validator";

export function isEmail(email: string) {
  return validator.isEmail(email);
}
