import { ICommonResponse } from './common';

export interface Meeting {
  id: string;
  title: string;
  description: string;
  start: Date;
  end: Date;
  userId?: string;
  upcoming?: boolean;
  teamId: string;
  salesRepId?: string;
  presetId?: any;
}

export interface ICreateMeetingResponse extends ICommonResponse {
  meeting: Meeting;
}
