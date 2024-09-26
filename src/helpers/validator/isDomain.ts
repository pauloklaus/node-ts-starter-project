import { isFQDN } from "validator";

export function isDomain(domain: string): boolean {
  return isFQDN(domain);
}
