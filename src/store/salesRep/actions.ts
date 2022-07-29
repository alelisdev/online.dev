import { ICreateSalesRepRequest, SalesRep } from '../../types/salesRep';
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

export const fetchSalesRepRequest = (id: string) => ({ type: FETCH_SALES_REP_REQUEST, meta: id });
export const fetchSalesRepSuccess = (payload: SalesRep) => ({
  type: FETCH_SALES_REP_SUCCESS,
  payload,
});
export const fetchSalesRepFailure = (errors: any) => ({ type: FETCH_SALES_REP_FAILURE, errors });

export const fetchSalesRepsByPayloadRequest = (params: Partial<SalesRep>) => ({
  type: FETCH_SALES_REPS_BY_PAYLOAD_REQUEST,
  payload: params,
});
export const fetchSalesRepsByPayloadSuccess = (payload: SalesRep[]) => ({
  type: FETCH_SALES_REPS_BY_PAYLOAD_SUCCESS,
  payload,
});
export const fetchSalesRepsByPayloadFailure = (errors: any) => ({
  type: FETCH_SALES_REPS_BY_PAYLOAD_FAILURE,
  errors,
});

export const createSalesRepRequest = (params: ICreateSalesRepRequest) => ({
  type: CREATE_SALES_REP_REQUEST,
  payload: params,
});
export const createSalesRepSuccess = (payload: SalesRep) => ({
  type: CREATE_SALES_REP_SUCCESS,
  payload,
});
export const createSalesRepFailure = (errors: any) => ({ type: CREATE_SALES_REP_FAILURE, errors });

export const updateSalesRepRequest = (id: string, params: Partial<SalesRep>) => ({
  type: UPDATE_SALES_REP_REQUEST,
  payload: params,
  meta: id,
});
export const updateSalesRepSuccess = (payload: SalesRep) => ({
  type: UPDATE_SALES_REP_SUCCESS,
  payload,
});
export const updateSalesRepFailure = (errors: any) => ({ type: UPDATE_SALES_REP_FAILURE, errors });

export const deleteSalesRepRequest = (id: string, params: SalesRep) => ({
  type: DELETE_SALES_REP_REQUEST,
  meta: id,
  payload: params,
});
export const deleteSalesRepSuccess = (payload: string) => ({
  type: DELETE_SALES_REP_SUCCESS,
  payload,
});
export const deleteSalesRepFailure = (errors: any) => ({ type: DELETE_SALES_REP_FAILURE, errors });
