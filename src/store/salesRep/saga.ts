import {
  FETCH_SALES_REP_REQUEST,
  FETCH_SALES_REPS_BY_PAYLOAD_REQUEST,
  CREATE_SALES_REP_REQUEST,
  UPDATE_SALES_REP_REQUEST,
  DELETE_SALES_REP_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/salesRep';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from './reducer';
import { IEffect } from '..';
import { ICommonResponse, IResponse } from '../../types/common';
import { ICreateSalesRepRequest, SalesRep } from '../../types/salesRep';

function* fetchSalesRepRequestSaga(action: IEffect<Action>) {
  try {
    const id = action.meta as string;
    const response: IResponse<SalesRep> = yield call(API.fetchSalesRep, id);

    if (response.success) {
      yield put(actions.fetchSalesRepSuccess(response.data));
    } else {
      yield put(actions.fetchSalesRepFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchSalesRepFailure(e));
  }
}

function* fetchSalesRepsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<SalesRep>;
    const response: IResponse<SalesRep[]> = yield call(API.fetchSalesRepsByPayload, param);

    if (response.success) {
      yield put(actions.fetchSalesRepsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchSalesRepsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchSalesRepsByPayloadFailure(e));
  }
}

function* createSalesRepRequestSaga(action: ReturnType<typeof actions.createSalesRepRequest>) {
  const param = action.payload as ICreateSalesRepRequest;
  try {
    const response: IResponse<SalesRep> = yield call(API.createSalesRep, param);
    if (response.success) {
      yield put(actions.createSalesRepSuccess(response.data));
    } else {
      yield put(actions.createSalesRepFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createSalesRepFailure(e));
  }
}

function* updateSalesRepRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<SalesRep>;
  const id = action.meta as string;
  try {
    const response: IResponse<SalesRep> = yield call(API.updateSalesRep, id, param);

    yield put(actions.updateSalesRepSuccess(response.data));
  } catch (e) {
    yield put(actions.updateSalesRepFailure(e));
  }
}

function* deleteSalesRepRequestSaga(action: IEffect<Action>) {
  const id = action.meta as string;
  const param = action.payload as Partial<SalesRep>;
  try {
    const response: ICommonResponse = yield call(API.deleteSalesRep, id, param);

    if (response.success) {
      yield put(actions.deleteSalesRepSuccess(id));
    } else {
      yield put(actions.deleteSalesRepFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteSalesRepFailure(e));
  }
}

export default function* salesRepsSaga() {
  yield takeLatest(FETCH_SALES_REP_REQUEST, fetchSalesRepRequestSaga);
  yield takeEvery(FETCH_SALES_REPS_BY_PAYLOAD_REQUEST, fetchSalesRepsByPayloadRequestSaga);
  yield takeEvery(CREATE_SALES_REP_REQUEST, createSalesRepRequestSaga);
  yield takeEvery(UPDATE_SALES_REP_REQUEST, updateSalesRepRequestSaga);
  yield takeEvery(DELETE_SALES_REP_REQUEST, deleteSalesRepRequestSaga);
}
