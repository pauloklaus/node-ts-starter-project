import { isMobilePhone } from "validator";

export function isPhoneNumber(phoneNumber: string): boolean {
  return [12, 13].includes(phoneNumber.length) && isMobilePhone(phoneNumber);
}
