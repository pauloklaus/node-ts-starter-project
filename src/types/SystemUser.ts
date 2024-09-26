export interface SystemUser {
  id: number;
  username: string;
  name: string;
  accessToken?: string;
  companyName: string;
  roles: string[];
}
