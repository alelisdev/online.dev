import { Meeting } from '../../types/meeting';
import {
  FETCH_CLIENT_MEETING_REQUEST,
  FETCH_CLIENT_MEETING_SUCCESS,
  FETCH_CLIENT_MEETING_FAILURE,
} from './constants';

export const fetchClientMeetingRequest = (id: string) => ({
  type: FETCH_CLIENT_MEETING_REQUEST,
  meta: id,
});
export const fetchClientMeetingSuccess = (payload: Meeting) => ({
  type: FETCH_CLIENT_MEETING_SUCCESS,
  payload,
});
export const fetchClientMeetingFailure = (errors: any) => ({
  type: FETCH_CLIENT_MEETING_FAILURE,
  errors,
});
