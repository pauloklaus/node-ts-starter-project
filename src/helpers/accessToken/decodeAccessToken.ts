import { InfrastructureError } from "@/errors";
import { SessionContext } from "@/types";
import jwt, { type JwtPayload } from "jsonwebtoken";

export function decodeAccessToken(accessToken: string, jwtSecretKey: string): SessionContext {
  try {
    const data = jwt.verify(accessToken, jwtSecretKey) as JwtPayload;

    const roles = `${data.roles}`;
    const isAdmin = roles.includes("admin");

    return {
      accessToken,
      username: data.username ?? "",
      name: data.name ?? "",
      companyName: data.company ?? "",
      roles: {
        admin: isAdmin || roles.includes("admin"),
        settings: isAdmin || roles.includes("settings"),
      },
    };
  } catch (error) {
    throw new InfrastructureError("decode-access-token");
  }
}
