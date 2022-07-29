import { ICommonResponse } from './common';

export interface Call {
  id: string;
  client: string;
  user_id: string;
  started_at: string;
  ended_at: string;
  meeting_id: string;
}

export type ICallPayloadRequest = {
  teamId?: string;
};

export type ICreateCallRequest = {
  meeting_id: string;
  user_id: string;
  started_at: string;
};

export interface ICreateCallResponse extends ICommonResponse {
  call: Call;
}

export type IUpdateCallResponse = ICreateCallResponse;

export type IParticipant = {
  getDisplayName: () => string;
};
