import { Call, ICallPayloadRequest, ICreateCallRequest } from '../../types/call';
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

export const fetchCallsByPayloadRequest = (params: ICallPayloadRequest) => ({
  type: FETCH_CALLS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchCallsByPayloadSuccess = (payload: Call[]) => ({
  type: FETCH_CALLS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchCallsByPayloadFailure = (errors: any) => ({
  type: FETCH_CALLS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createCallRequest = (params: ICreateCallRequest) => ({
  type: CREATE_CALL_REQUEST,
  payload: params,
});
export const createCallSuccess = (payload: Call) => ({ type: CREATE_CALL_SUCCESS, payload });
export const createCallFailure = (errors: any) => ({ type: CREATE_CALL_FAILURE, errors });
export const updateCallRequest = (id: string, params: Partial<Call>) => ({
  type: UPDATE_CALL_REQUEST,
  payload: params,
  meta: id,
});
export const updateCallSuccess = (payload: Call) => ({ type: UPDATE_CALL_SUCCESS, payload });
export const updateCallFailure = (errors: any) => ({ type: UPDATE_CALL_FAILURE, errors });
