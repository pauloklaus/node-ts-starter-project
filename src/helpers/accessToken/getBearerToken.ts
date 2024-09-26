export function getBearerToken(bearerToken: string | undefined): string {
  if (!bearerToken || `${bearerToken}`.trim() === "") {
    return "";
  }

  const token = bearerToken.split(" ");
  return token[0].toLocaleLowerCase() === "bearer" && token[1] !== "" ? token[1] : "";
}
