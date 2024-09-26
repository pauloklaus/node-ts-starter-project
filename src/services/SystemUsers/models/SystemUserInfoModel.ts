export interface SystemUserInfoModel {
  user_id: number;
  user_username: string;
  user_hashed_password: string;
  user_name: string;
  user_access_token: string;
  user_admin: boolean;
  user_settings: boolean;
  company_name: string;
}
