import {
  FETCH_PRESET_REQUEST,
  FETCH_PRESET_SUCCESS,
  FETCH_PRESET_FAILURE,
  SET_PRESET_REQUEST,
  SET_PRESET_SUCCESS,
  SET_PRESET_FAILURE,
  GET_PRESET_REQUEST,
  GET_PRESET_SUCCESS,
  GET_PRESET_FAILURE,
} from './constants';

export const fetchPresetRequest = () => ({ type: FETCH_PRESET_REQUEST });
export const fetchPresetSuccess = (payload: any) => ({ type: FETCH_PRESET_SUCCESS, payload });
export const fetchPresetFailure = (errors: any) => ({ type: FETCH_PRESET_FAILURE, errors });

export const setPresetForMeeting = (payload: any) => ({ type: SET_PRESET_REQUEST, payload });
export const setPresetForMeetingSuccess = (payload: any) => ({ type: SET_PRESET_SUCCESS, payload });
export const setPresetForMeetingFailure = (errors: any) => ({ type: SET_PRESET_FAILURE, errors });

export const getPresetForMeeting = (payload: any) => ({ type: GET_PRESET_REQUEST, payload });
export const getPresetForMeetingSuccess = (payload: any) => ({ type: GET_PRESET_SUCCESS, payload });
export const getPresetForMeetingFailure = (errors: any) => ({ type: GET_PRESET_FAILURE, errors });
