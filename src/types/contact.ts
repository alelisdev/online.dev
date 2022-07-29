export interface Contact {
  id: string;
  username: string;
  email: string;
  avatar: string;
  userId: string;
}

export interface ICreateContactRequest {
  username: string;
  email: string;
  avatar: string;
  userId: string;
}
