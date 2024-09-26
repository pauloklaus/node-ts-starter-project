import type { DbHandler } from "@/infra/database";
import type { SystemUsersRepository } from "./types";
import type { SystemUserInfoModel } from "./models";
import type { SystemUser } from "@/types";
import type { Logger } from "@/infra/logger";
import { UnauthorizedError } from "@/errors";
import { compareHashedPassword } from "@/helpers/password";

export function systemUsersDbRepository(
  dbHandler: DbHandler,
  loggerHandler: Logger
): SystemUsersRepository {
  const userTable = "systemusers";
  const companyTable = "systemcompanies";

  async function login(username: string, password: string): Promise<SystemUser | undefined> {
    if (!username || !password) {
      throw new UnauthorizedError("not-informed-username-password");
    }

    const userResult = await dbHandler.query<{ hashed_password: string }>(
      `SELECT "hashed_password" FROM ${userTable} WHERE "username"=$1 AND "active"=true`,
      [username]
    );

    if (!userResult.length) {
      loggerHandler.warn(`login: user not found "${username}"`);
      return;
    }

    const passwordMatch = await compareHashedPassword(password, userResult[0].hashed_password);

    if (passwordMatch) {
      return await infoByUsername(username);
    }

    loggerHandler.warn(`login: invalid password for user "${username}"`);
    return;
  }

  async function usernameByToken(token: string): Promise<string | undefined> {
    const userResult = await dbHandler.query<Pick<SystemUser, "username">>(
      `SELECT "username" FROM ${userTable} WHERE "access_token"=$1 AND "active"=true`,
      [token],
      [0]
    );

    if (!userResult.length) {
      loggerHandler.warn(`usernameByToken: not found`);
      return;
    }

    return userResult[0].username;
  }

  async function infoByUsername(username: string): Promise<SystemUser | undefined> {
    const userResult = await dbHandler.query<SystemUserInfoModel>(
      `SELECT
        ${userTable}."id" as user_id,
        ${userTable}."username" as user_username,
        ${userTable}."hashed_password" as user_hashed_password,
        ${userTable}."name" as user_name,
        ${userTable}."access_token" as user_access_token,
        ${userTable}."admin" as user_admin,
        ${userTable}."settings" as user_settings,
        ${companyTable}."name" as company_name
      FROM ${userTable}
      JOIN ${companyTable} ON ${companyTable}."id"=${userTable}."company_id"
      WHERE ${userTable}."username"=$1 AND ${userTable}."active"=true AND ${companyTable}."active"=true`,
      [username]
    );

    if (!userResult.length) {
      return;
    }

    return {
      id: userResult[0].user_id,
      username: userResult[0].user_username,
      name: userResult[0].user_name,
      accessToken: userResult[0].user_access_token,
      companyName: userResult[0].company_name,
      roles: [
        ...(userResult[0].user_admin ? ["admin"] : []),
        ...(userResult[0].user_settings ? ["settings"] : []),
      ],
    };
  }

  return {
    login,
    usernameByToken,
    infoByUsername,
  };
}
