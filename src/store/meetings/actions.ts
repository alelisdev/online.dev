import { Meeting } from '../../types/meeting';
import {
  FETCH_MEETING_REQUEST,
  FETCH_MEETING_SUCCESS,
  FETCH_MEETING_FAILURE,
  FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  FETCH_MEETINGS_BY_PAYLOAD_SUCCESS,
  FETCH_MEETINGS_BY_PAYLOAD_FAILURE,
  CREATE_MEETING_REQUEST,
  CREATE_MEETING_SUCCESS,
  CREATE_MEETING_FAILURE,
  UPDATE_MEETING_REQUEST,
  UPDATE_MEETING_SUCCESS,
  UPDATE_MEETING_FAILURE,
  DELETE_MEETING_REQUEST,
  DELETE_MEETING_SUCCESS,
  DELETE_MEETING_FAILURE,
} from './constants';

export const fetchMeetingRequest = (id: string) => ({ type: FETCH_MEETING_REQUEST, meta: id });
export const fetchMeetingSuccess = (payload: Meeting) => ({ type: FETCH_MEETING_SUCCESS, payload });
export const fetchMeetingFailure = (errors: any) => ({ type: FETCH_MEETING_FAILURE, errors });

export const fetchMeetingsByPayloadRequest = (params: Partial<Meeting>) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchMeetingsByPayloadSuccess = (payload: Meeting[]) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchMeetingsByPayloadFailure = (errors: any) => ({
  type: FETCH_MEETINGS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createMeetingRequest = (params: Partial<Meeting>) => ({
  type: CREATE_MEETING_REQUEST,
  payload: params,
});
export const createMeetingSuccess = (payload: Meeting) => ({
  type: CREATE_MEETING_SUCCESS,
  payload,
});
export const createMeetingFailure = (errors: any) => ({ type: CREATE_MEETING_FAILURE, errors });

export const updateMeetingRequest = (id: string, params: Partial<Meeting>) => ({
  type: UPDATE_MEETING_REQUEST,
  payload: params,
  meta: id,
});
export const updateMeetingSuccess = (payload: Meeting) => ({
  type: UPDATE_MEETING_SUCCESS,
  payload,
});
export const updateMeetingFailure = (errors: any) => ({ type: UPDATE_MEETING_FAILURE, errors });

export const deleteMeetingRequest = (id: string) => ({
  type: DELETE_MEETING_REQUEST,
  meta: id,
});
export const deleteMeetingSuccess = (id: string) => ({ type: DELETE_MEETING_SUCCESS, id });
export const deleteMeetingFailure = (errors: any) => ({ type: DELETE_MEETING_FAILURE, errors });
