import { Recording } from '../../types/recording';
import { Transcription } from '../../types/transcription';
import {
  FETCH_RECORDING_REQUEST,
  FETCH_RECORDING_SUCCESS,
  FETCH_RECORDING_FAILURE,
  FETCH_RECORDINGS_BY_PAYLOAD_REQUEST,
  FETCH_RECORDINGS_BY_PAYLOAD_SUCCESS,
  FETCH_RECORDINGS_BY_PAYLOAD_FAILURE,
} from './constants';

export const fetchRecordingRequest = (id: string) => ({ type: FETCH_RECORDING_REQUEST, meta: id });
export const fetchRecordingSuccess = (payload: Recording) => ({
  type: FETCH_RECORDING_SUCCESS,
  payload,
});
export const fetchRecordingFailure = (errors: any) => ({ type: FETCH_RECORDING_FAILURE, errors });

export const fetchRecordingsByPayloadRequest = (params: Partial<Recording>) => ({
  type: FETCH_RECORDINGS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchRecordingsByPayloadSuccess = (payload: {
  recordings: Recording;
  transcriptions: Transcription[];
}) => ({
  type: FETCH_RECORDINGS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchRecordingsByPayloadFailure = (errors: any) => ({
  type: FETCH_RECORDINGS_BY_PAYLOAD_FAILURE,
  errors,
});
