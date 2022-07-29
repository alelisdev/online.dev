import {
  FETCH_RECORDING_REQUEST,
  FETCH_RECORDING_SUCCESS,
  FETCH_RECORDING_FAILURE,
  FETCH_RECORDINGS_BY_PAYLOAD_REQUEST,
  FETCH_RECORDINGS_BY_PAYLOAD_SUCCESS,
  FETCH_RECORDINGS_BY_PAYLOAD_FAILURE,
} from './constants';

import {
  fetchRecordingRequest,
  fetchRecordingSuccess,
  fetchRecordingFailure,
  fetchRecordingsByPayloadRequest,
  fetchRecordingsByPayloadSuccess,
  fetchRecordingsByPayloadFailure,
} from './actions';

export type Action =
  | ReturnType<typeof fetchRecordingRequest>
  | ReturnType<typeof fetchRecordingSuccess>
  | ReturnType<typeof fetchRecordingFailure>
  | ReturnType<typeof fetchRecordingsByPayloadRequest>
  | ReturnType<typeof fetchRecordingsByPayloadSuccess>
  | ReturnType<typeof fetchRecordingsByPayloadFailure>;

type InitialStateType = {
  recording: any;
  recordingsList: any;
  transcriptions: any;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  recording: null,
  recordingsList: [],
  transcriptions: [],
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_RECORDING_REQUEST:
      return { ...state, loading: true };
    case FETCH_RECORDING_SUCCESS:
      return { ...state, loading: false, recording: action.payload, errors: [] };
    case FETCH_RECORDING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_RECORDINGS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_RECORDINGS_BY_PAYLOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        recordingsList: action.payload.recordings,
        transcriptions: Object.assign(action.payload.transcriptions),
        errors: [],
      };
    case FETCH_RECORDINGS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
