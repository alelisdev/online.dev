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

import {
  fetchMeetingRequest,
  fetchMeetingSuccess,
  fetchMeetingFailure,
  fetchMeetingsByPayloadRequest,
  fetchMeetingsByPayloadSuccess,
  fetchMeetingsByPayloadFailure,
  createMeetingRequest,
  createMeetingSuccess,
  createMeetingFailure,
  updateMeetingRequest,
  updateMeetingSuccess,
  updateMeetingFailure,
  deleteMeetingRequest,
  deleteMeetingSuccess,
  deleteMeetingFailure,
} from './actions';
import { Meeting } from '../../types/meeting';

export type Action =
  | ReturnType<typeof fetchMeetingRequest>
  | ReturnType<typeof fetchMeetingSuccess>
  | ReturnType<typeof fetchMeetingFailure>
  | ReturnType<typeof fetchMeetingsByPayloadRequest>
  | ReturnType<typeof fetchMeetingsByPayloadSuccess>
  | ReturnType<typeof fetchMeetingsByPayloadFailure>
  | ReturnType<typeof createMeetingRequest>
  | ReturnType<typeof createMeetingSuccess>
  | ReturnType<typeof createMeetingFailure>
  | ReturnType<typeof updateMeetingRequest>
  | ReturnType<typeof updateMeetingSuccess>
  | ReturnType<typeof updateMeetingFailure>
  | ReturnType<typeof deleteMeetingRequest>
  | ReturnType<typeof deleteMeetingSuccess>
  | ReturnType<typeof deleteMeetingFailure>;

type InitialStateType = {
  meeting: Meeting | null;
  meetingList: Meeting[];
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  meeting: null,
  meetingList: [],
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_MEETING_REQUEST:
      return { ...state, loading: true };
    case FETCH_MEETING_SUCCESS:
      return { ...state, loading: false, meeting: action.payload, errors: [] };
    case FETCH_MEETING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_MEETINGS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_MEETINGS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, meetingList: action.payload, errors: [] };
    case FETCH_MEETINGS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_MEETING_REQUEST:
      return { ...state, loading: true };
    case CREATE_MEETING_SUCCESS:
      const oldMeetingList = state.meetingList;
      const newMeetingList = Object.assign([...oldMeetingList, action.payload]);
      return { ...state, loading: false, meetingList: newMeetingList, meeting: action.payload };
    case CREATE_MEETING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_MEETING_REQUEST:
      return { ...state, loading: true };
    case UPDATE_MEETING_SUCCESS:
      const oldMeetingList1 = state.meetingList;
      const newMeetingList1 = Object.assign([
        ...oldMeetingList1.map((t: Meeting) => (t.id === action.payload.id ? action.payload : t)),
      ]);
      return { ...state, loading: false, meetingList: newMeetingList1 };
    case UPDATE_MEETING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_MEETING_REQUEST:
      return { ...state, loading: true };
    case DELETE_MEETING_SUCCESS:
      const oldMeetingList2 = state.meetingList;
      const newMeetingList2 = Object.assign([
        ...oldMeetingList2.filter((t: Meeting) => t.id !== action.id),
      ]);
      return { ...state, loading: false, meetingList: newMeetingList2 };
    case DELETE_MEETING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
