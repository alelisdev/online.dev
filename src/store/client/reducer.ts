import { Meeting } from '../../types/meeting';
import {
  fetchClientMeetingFailure,
  fetchClientMeetingRequest,
  fetchClientMeetingSuccess,
} from './actions';
import {
  FETCH_CLIENT_MEETING_FAILURE,
  FETCH_CLIENT_MEETING_REQUEST,
  FETCH_CLIENT_MEETING_SUCCESS,
} from './constants';

export type Action =
  | ReturnType<typeof fetchClientMeetingSuccess>
  | ReturnType<typeof fetchClientMeetingRequest>
  | ReturnType<typeof fetchClientMeetingFailure>;

type InitialStateType = {
  meeting: Meeting | null;
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  meeting: null,
  loading: false,
  errors: null,
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_CLIENT_MEETING_REQUEST:
      return { ...state, loading: true };
    case FETCH_CLIENT_MEETING_SUCCESS:
      return { ...state, loading: false, meeting: action.payload, errors: [] };
    case FETCH_CLIENT_MEETING_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return { ...state };
  }
};
export default reducer;
