import { ICommonResponse } from './common';

export interface Recording {
  id: string;
  session_id: string;
  file_path: string;
  attentionLvl: string;
  meeting_id: string;
  user_id: string;
  transcription?: string;
  isTalkingPoint?: boolean;
  confidence?: number;
}

export interface ICreateRecordingRequest {
  session_id: string;
  meeting_id: string;
}

export interface IAddTranslationRequest {
  meeting_id: string;
  transcription?: string;
  isTalkingPoint?: boolean;
  confidence?: number;
}

export interface IGetRecordingByPayloadResponse extends ICommonResponse {
  recording: Recording;
}
