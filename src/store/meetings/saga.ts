import {
  CREATE_MEETING_REQUEST,
  DELETE_MEETING_REQUEST,
  FETCH_MEETING_REQUEST,
  FETCH_MEETINGS_BY_PAYLOAD_REQUEST,
  UPDATE_MEETING_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/meeting';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from './reducer';
import { IEffect } from '..';
import { ICreateMeetingResponse, Meeting } from '../../types/meeting';
import { ICommonResponse, IResponse } from '../../types/common';

function* fetchMeetingRequestSaga(action: IEffect<Action>) {
  try {
    const id = action.meta as string;
    const response: IResponse<Meeting> = yield call(API.fetchMeeting, id);
    if (response.success) {
      if (response.data) {
        yield put(actions.fetchMeetingSuccess(response.data));
      } else {
        yield put(actions.fetchMeetingFailure('Meeting is invalid.'));
      }
    } else {
      yield put(actions.fetchMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchMeetingFailure(e));
  }
}

function* fetchMeetingsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<Meeting>;
    const response: IResponse<Meeting[]> = yield call(API.fetchMeetingsByPayload, param);

    if (response.success) {
      yield put(actions.fetchMeetingsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchMeetingsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchMeetingsByPayloadFailure(e));
  }
}

function* createMeetingRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<Meeting>;
  try {
    const response: ICreateMeetingResponse = yield call(API.createMeeting, param);
    if (response.success) {
      yield put(actions.createMeetingSuccess(response.meeting));
    } else {
      yield put(actions.createMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createMeetingFailure(e));
  }
}

function* updateMeetingRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<Meeting>;
  const id = action.meta as string;
  try {
    const response: IResponse<Meeting> = yield call(API.updateMeeting, id, param);

    if (response.success) {
      yield put(actions.updateMeetingSuccess(response.data));
    } else {
      yield put(actions.updateMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateMeetingFailure(e));
  }
}

function* deleteMeetingRequestSaga(action: IEffect<Action>) {
  const id = action.meta as string;
  try {
    const response: ICommonResponse = yield call(API.deleteMeeting, id);

    if (response.success) {
      yield put(actions.deleteMeetingSuccess(id));
    } else {
      yield put(actions.deleteMeetingFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteMeetingFailure(e));
  }
}

export default function* meetingsSaga() {
  yield takeLatest(FETCH_MEETING_REQUEST, fetchMeetingRequestSaga);
  yield takeEvery(FETCH_MEETINGS_BY_PAYLOAD_REQUEST, fetchMeetingsByPayloadRequestSaga);
  yield takeEvery(CREATE_MEETING_REQUEST, createMeetingRequestSaga);
  yield takeEvery(UPDATE_MEETING_REQUEST, updateMeetingRequestSaga);
  yield takeEvery(DELETE_MEETING_REQUEST, deleteMeetingRequestSaga);
}
