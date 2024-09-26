import { RequiredFieldError, UnauthorizedError } from "@/errors";
import type { SystemUsersRepository } from "./types";
import type { SystemUser } from "@/types";
import { isEmail, isEmpty } from "@/helpers/validator";

export function systemUsersService(repository: SystemUsersRepository) {
  async function login(username: string, password: string): Promise<SystemUser> {
    if (!isEmail(username)) {
      throw new RequiredFieldError("username");
    }

    if (isEmpty(password)) {
      throw new RequiredFieldError("password");
    }

    const userInfo = await repository.login(username, password);

    if (!userInfo) {
      throw new UnauthorizedError();
    }

    return userInfo;
  }

  async function infoByUsername(username: string): Promise<SystemUser | undefined> {
    return await repository.infoByUsername(username);
  }

  async function usernameByToken(token: string): Promise<string | undefined> {
    return await repository.usernameByToken(token);
  }

  return {
    login,
    infoByUsername,
    usernameByToken,
  };
}
