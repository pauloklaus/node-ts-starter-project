import jwt from "jsonwebtoken";

export function generateAccessToken(
  payload: Record<string, string | string[] | number | boolean>,
  jwtSecretKey: string,
  expiresIn: string | number = "1d",
): string {
  return jwt.sign(payload, jwtSecretKey, { expiresIn });
}
