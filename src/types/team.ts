import { SalesRep } from './salesRep';

export interface Team {
  id: string;
  name: string;
  userId: string;
  salesReps: SalesRep[];
}

export type ICreateTeamRequest = {
  name: string;
  userId: string;
};
