import { ICommonResponse } from './common';

export interface User {
  id: string;
  email: string;
  username: string;
  role: string;
  avatar: string | null;
  background: string | null;
  status?: 'active';
}

export interface IUserImageRequest extends FormData {
  photo: FormDataEntryValue;
  avatar?: FormDataEntryValue;
}

export interface IUpdateUserResponse extends ICommonResponse {
  user: User;
}
