import { ICommonResponse } from './common';

export interface Transcription {
  id: string;
  transcription: string;
  confidence: number;
  isTalkingPoint: number;
  meeting_id: string;
}

export interface IGetTranscriptionsResponse extends ICommonResponse {
  transcriptions: Transcription[];
}
