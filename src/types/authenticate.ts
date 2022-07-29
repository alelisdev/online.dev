import { User } from './user';

export interface IAuthenticateRequest {
  email: string;
  password: string;
  role: string;
}

export type AccessToken = { accessToken: string; expiresIn: string };
export interface IAuthenticateResponse {
  accessToken: AccessToken;
  user: User;
  success: boolean;
  message?: string;
}
