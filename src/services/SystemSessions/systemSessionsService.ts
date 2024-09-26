import type { SystemUser } from "@/types";
import type { SystemSessionsRepository } from "./types";

export function systemSessionsService(repository: SystemSessionsRepository) {
  async function startSession(
    user: SystemUser,
    token: string,
    remoteHost?: string,
    userAgent?: string,
  ): Promise<void> {
    await repository.keepMostRecentValidSessions(user.id);
    await repository.startSession(user.id, token, remoteHost, userAgent);
  }

  async function destroySessionByToken(token: string): Promise<void> {
    await repository.invalidateSessionByToken(token);
  }

  async function isValidSessionToken(token: string): Promise<boolean> {
    return await repository.isValidSessionToken(token);
  }

  return {
    startSession,
    destroySessionByToken,
    isValidSessionToken,
  };
}
