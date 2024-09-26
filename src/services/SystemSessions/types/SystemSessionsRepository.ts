export interface SystemSessionsRepository {
  invalidateSessionById(sessionId: number): Promise<void>;
  invalidateSessionByToken(token: string): Promise<void>;
  keepMostRecentValidSessions(userId: number): Promise<void>;
  startSession(
    userId: number,
    token: string,
    remoteHost?: string,
    userAgent?: string,
  ): Promise<void>;
  isValidSessionToken(token: string): Promise<boolean>;
}
