import { SystemUser } from "@/types";

export interface SystemUsersRepository {
  login(email: string, password: string): Promise<SystemUser | undefined>;
  usernameByToken(token: string): Promise<string | undefined>;
  infoByUsername(username: string): Promise<SystemUser | undefined>;
}
