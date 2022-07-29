import {
  FETCH_PRESET_FAILURE,
  FETCH_PRESET_REQUEST,
  FETCH_PRESET_SUCCESS,
  GET_PRESET_FAILURE,
  GET_PRESET_REQUEST,
  GET_PRESET_SUCCESS,
  SET_PRESET_FAILURE,
  SET_PRESET_REQUEST,
  SET_PRESET_SUCCESS,
} from './constants';

import {
  fetchPresetFailure,
  fetchPresetRequest,
  fetchPresetSuccess,
  getPresetForMeeting,
  getPresetForMeetingFailure,
  getPresetForMeetingSuccess,
  setPresetForMeeting,
  setPresetForMeetingFailure,
  setPresetForMeetingSuccess,
} from './actions';

type Action =
  | ReturnType<typeof fetchPresetRequest>
  | ReturnType<typeof fetchPresetSuccess>
  | ReturnType<typeof fetchPresetFailure>
  | ReturnType<typeof setPresetForMeeting>
  | ReturnType<typeof setPresetForMeetingSuccess>
  | ReturnType<typeof setPresetForMeetingFailure>
  | ReturnType<typeof getPresetForMeeting>
  | ReturnType<typeof getPresetForMeetingSuccess>
  | ReturnType<typeof getPresetForMeetingFailure>;

type InitialStateType = {
  preset: any;
  presetList: any;
  data: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  preset: null,
  presetList: null,
  data: null,
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_PRESET_REQUEST:
      return { ...state, loading: true };
    case FETCH_PRESET_SUCCESS:
      return { ...state, loading: false, presetList: action.payload, errors: [] };
    case FETCH_PRESET_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case GET_PRESET_REQUEST:
      return { ...state, loading: true };
    case GET_PRESET_SUCCESS:
      return { ...state, loading: false, preset: action.payload, errors: [] };
    case GET_PRESET_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case SET_PRESET_REQUEST:
      return { ...state, loading: true };
    case SET_PRESET_SUCCESS:
      return { ...state, loading: false, preset: action.payload, errors: [] };
    case SET_PRESET_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
