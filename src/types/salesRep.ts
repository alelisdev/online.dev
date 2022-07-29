export type SalesRep = {
  id: string;
  userId: string;
  teamId: string;
};

export interface ICreateSalesRepRequest {
  teamId: string;
  password: string;
  username: string;
  email: string;
}
