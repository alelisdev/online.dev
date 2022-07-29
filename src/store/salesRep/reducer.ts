import {
  FETCH_SALES_REP_REQUEST,
  FETCH_SALES_REP_SUCCESS,
  FETCH_SALES_REP_FAILURE,
  FETCH_SALES_REPS_BY_PAYLOAD_REQUEST,
  FETCH_SALES_REPS_BY_PAYLOAD_SUCCESS,
  FETCH_SALES_REPS_BY_PAYLOAD_FAILURE,
  CREATE_SALES_REP_REQUEST,
  CREATE_SALES_REP_SUCCESS,
  CREATE_SALES_REP_FAILURE,
  UPDATE_SALES_REP_REQUEST,
  UPDATE_SALES_REP_SUCCESS,
  UPDATE_SALES_REP_FAILURE,
  DELETE_SALES_REP_REQUEST,
  DELETE_SALES_REP_SUCCESS,
  DELETE_SALES_REP_FAILURE,
} from './constants';

import {
  fetchSalesRepRequest,
  fetchSalesRepSuccess,
  fetchSalesRepFailure,
  fetchSalesRepsByPayloadRequest,
  fetchSalesRepsByPayloadSuccess,
  fetchSalesRepsByPayloadFailure,
  createSalesRepRequest,
  createSalesRepSuccess,
  createSalesRepFailure,
  updateSalesRepRequest,
  updateSalesRepSuccess,
  updateSalesRepFailure,
  deleteSalesRepRequest,
  deleteSalesRepSuccess,
  deleteSalesRepFailure,
} from './actions';
import { SalesRep } from '../../types/salesRep';

export type Action =
  | ReturnType<typeof fetchSalesRepRequest>
  | ReturnType<typeof fetchSalesRepSuccess>
  | ReturnType<typeof fetchSalesRepFailure>
  | ReturnType<typeof fetchSalesRepsByPayloadRequest>
  | ReturnType<typeof fetchSalesRepsByPayloadSuccess>
  | ReturnType<typeof fetchSalesRepsByPayloadFailure>
  | ReturnType<typeof createSalesRepRequest>
  | ReturnType<typeof createSalesRepSuccess>
  | ReturnType<typeof createSalesRepFailure>
  | ReturnType<typeof updateSalesRepRequest>
  | ReturnType<typeof updateSalesRepSuccess>
  | ReturnType<typeof updateSalesRepFailure>
  | ReturnType<typeof deleteSalesRepRequest>
  | ReturnType<typeof deleteSalesRepSuccess>
  | ReturnType<typeof deleteSalesRepFailure>;

type InitialStateType = {
  salesRep: SalesRep | null;
  salesRepList: SalesRep[];
  loading: boolean;
  errors: any;
};

const initialState: InitialStateType = {
  salesRep: null,
  salesRepList: [],
  loading: false,
  errors: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case FETCH_SALES_REP_REQUEST:
      return { ...state, loading: true };
    case FETCH_SALES_REP_SUCCESS:
      return { ...state, loading: false, salesRep: action.payload, errors: [] };
    case FETCH_SALES_REP_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case FETCH_SALES_REPS_BY_PAYLOAD_REQUEST:
      return { ...state, loading: true };
    case FETCH_SALES_REPS_BY_PAYLOAD_SUCCESS:
      return { ...state, loading: false, salesRepList: action.payload, errors: [] };
    case FETCH_SALES_REPS_BY_PAYLOAD_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case CREATE_SALES_REP_REQUEST:
      return { ...state, loading: true };
    case CREATE_SALES_REP_SUCCESS:
      const oldSalesRepList = state.salesRepList;
      const newSalesRepList = Object.assign([...oldSalesRepList, action.payload]);
      return { ...state, loading: false, salesRepList: newSalesRepList };
    case CREATE_SALES_REP_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case UPDATE_SALES_REP_REQUEST:
      return { ...state, loading: true };
    case UPDATE_SALES_REP_SUCCESS:
      const oldSalesRepList1 = state.salesRepList;
      const newSalesRepList1 = Object.assign([
        ...oldSalesRepList1.map((t: SalesRep) => (t.id === action.payload.id ? action.payload : t)),
      ]);
      return { ...state, loading: false, salesRepList: newSalesRepList1 };
    case UPDATE_SALES_REP_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    case DELETE_SALES_REP_REQUEST:
      return { ...state, loading: true };
    case DELETE_SALES_REP_SUCCESS:
      const _oldSalesRepList = state.salesRepList;
      const _newSalesRepList = _oldSalesRepList.filter((s) => s.id !== action.payload);
      return { ...state, loading: false, salesRepList: _newSalesRepList };
    case DELETE_SALES_REP_FAILURE:
      return { ...state, loading: false, errors: action.errors };
    default:
      return state;
  }
};

export default reducer;
