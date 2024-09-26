import validator from "validator";

export function isJson(json: string): boolean {
  return validator.isJSON(json);
}
