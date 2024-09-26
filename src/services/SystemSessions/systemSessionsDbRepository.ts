import type { DbHandler } from "@/infra/database";
import type { SystemSessionsRepository } from "./types";

const MAX_ALLOWED_SESSIONS = 2;

export function systemSessionsDbRepository(dbHandler: DbHandler): SystemSessionsRepository {
  const sessionTable = "systemsessions";

  async function invalidateSessionById(sessionId: number): Promise<void> {
    if (!sessionId) {
      return;
    }

    await dbHandler.query(`UPDATE ${sessionTable} SET "valid"=false WHERE "id"=$1`, [sessionId]);
  }

  async function invalidateSessionByToken(token: string): Promise<void> {
    if (!token) {
      return;
    }

    await dbHandler.query(`UPDATE ${sessionTable} SET "valid"=false WHERE "token"=$1`, [token]);
  }

  async function keepMostRecentValidSessions(userId: number): Promise<void> {
    if (!userId) {
      return;
    }

    const validSessions = await dbHandler.query<{ id: number }>(
      `SELECT "id" FROM ${sessionTable} WHERE "user_id"=$1 AND "valid"=true ORDER BY "last_access" DESC`,
      [userId]
    );

    if (validSessions.length < MAX_ALLOWED_SESSIONS) {
      return;
    }

    for (let sessionIndex = 1; sessionIndex < validSessions.length; sessionIndex++) {
      await invalidateSessionById(validSessions[sessionIndex].id);
    }
  }

  async function startSession(
    userId: number,
    token: string,
    remoteHost?: string,
    userAgent?: string
  ): Promise<void> {
    if (!userId || !token) {
      return;
    }

    await dbHandler.query(
      `INSERT INTO ${sessionTable} ("user_id", "token", "valid", "remote_host", "user_agent")
        VALUES ($1, $2, true, $3, $4)`,
      [userId, token, remoteHost ?? "", userAgent ?? ""],
      [1]
    );
  }

  async function isValidSessionToken(token: string): Promise<boolean> {
    if (!token) {
      return false;
    }

    const sessions = await dbHandler.query<{ id: number }>(
      `SELECT "id" FROM ${sessionTable} WHERE "token"=$1 AND "valid"=true`,
      [token],
      [0]
    );

    if (sessions && sessions.length === 1) {
      return true;
    }

    return false;
  }

  return {
    invalidateSessionById,
    invalidateSessionByToken,
    keepMostRecentValidSessions,
    startSession,
    isValidSessionToken,
  };
}
