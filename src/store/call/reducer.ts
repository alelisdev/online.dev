import { Call } from '../../types/call';
import {
  createCallFailure,
  createCallRequest,
  createCallSuccess,
  fetchCallsByPayloadFailure,
  fetchCallsByPayloadRequest,
  fetchCallsByPayloadSuccess,
  updateCallFailure,
  updateCallRequest,
  updateCallSuccess,
} from './actions';
import {
  CREATE_CALL_FAILURE,
  CREATE_CALL_REQUEST,
  CREATE_CALL_SUCCESS,
  FETCH_CALLS_BY_PAYLOAD_FAILURE,
  FETCH_CALLS_BY_PAYLOAD_REQUEST,
  FETCH_CALLS_BY_PAYLOAD_SUCCESS,
  UPDATE_CALL_FAILURE,
  UPDATE_CALL_REQUEST,
  UPDATE_CALL_SUCCESS,
} from './constants';

export type Action =
  | ReturnType<typeof fetchCallsByPayloadRequest>
  | ReturnType<typeof fetchCallsByPayloadSuccess>
  | ReturnType<typeof fetchCallsByPayloadFailure>
  | ReturnType<typeof createCallRequest>
  | ReturnType<typeof createCallSuccess>
  | ReturnType<typeof createCallFailure>
  | ReturnType<typeof updateCallRequest>
  | ReturnType<typeof updateCallSuccess>
  | ReturnType<typeof updateCallFailure>;

type InitialStateType = {
  call: Call | null;
  callList: Call[];
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  call: null,
  callList: [],
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_CALLS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_CALLS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, callList: action.payload, errors: [] };
    case FETCH_CALLS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_CALL_REQUEST:
      return { ...state, loading: true };
    case CREATE_CALL_SUCCESS:
      return { ...state, loading: false, call: action.payload };
    case CREATE_CALL_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_CALL_REQUEST:
      return { ...state, loading: true };
    case UPDATE_CALL_SUCCESS:
      return { ...state, loading: false, call: action.payload };
    case UPDATE_CALL_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
