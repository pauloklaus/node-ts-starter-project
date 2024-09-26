export interface SessionContext {
  accessToken: string;
  username: string;
  name: string;
  companyName: string;
  roles: {
    admin: boolean;
    settings: boolean;
  };
}
