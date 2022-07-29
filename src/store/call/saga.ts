import { put, takeEvery, call, select } from 'redux-saga/effects';
import moment from 'moment';
import * as actions from './actions';
import * as API from '../../apis/call';
import { Action } from './reducer';
import { CREATE_CALL_REQUEST, FETCH_CALLS_BY_PAYLOAD_REQUEST } from './constants';
import { END_MEETING_SUCCESS, SET_PARTICIPANTS, START_MEETING_SUCCESS } from '../meeting/constants';
import { IEffect } from '..';
import { Call, ICreateCallResponse, IUpdateCallResponse } from '../../types/call';
import { IResponse } from '../../types/common';
import { Meeting } from '../../types/meeting';
import { User } from '../../types/user';
import { setParticipants } from '../meeting/actions';

function* fetchCallsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<Call>;
    const response: IResponse<Call[]> = yield call(API.fetchCallsByPayload, param);

    if (response.success) {
      yield put(actions.fetchCallsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchCallsByPayloadFailure(response.message));
    }
  } catch (e) {
    console.info(e);
    yield put(actions.fetchCallsByPayloadFailure(e));
  }
}

function* createCallRequestSaga(action: ReturnType<typeof actions.createCallRequest>) {
  const param = action.payload;
  try {
    const response: ICreateCallResponse = yield call(API.createCall, param);
    if (response.success) {
      yield put(actions.createCallSuccess(response.call));
    } else {
      yield put(actions.createCallFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createCallFailure(e));
  }
}

function* startedMeetingSuccessSaga() {
  try {
    const meeting: Meeting = yield select((state) => state.meetings.meeting);
    const user: User = yield select((state) => state.app.currentUser);
    const param = {
      meeting_id: meeting.id,
      user_id: user.id,
      started_at: moment().format(),
    };
    const response: ICreateCallResponse = yield call(API.createCall, param);
    if (response.success) {
      yield put(actions.createCallSuccess(response.call));
    } else {
      yield put(actions.createCallFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createCallFailure(e));
  }
}

function* endedMeetingSuccessSaga() {
  try {
    const _call: Call = yield select((state) => state.call.call);

    const param = {
      ended_at: moment().format(),
    };
    const response: IUpdateCallResponse = yield call(API.updateCall, _call.id, param);
    if (response.success) {
      yield put(actions.updateCallSuccess(response.call));
    } else {
      yield put(actions.updateCallFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateCallFailure(e));
  }
}

function* setParticipantsSaga(action: ReturnType<typeof setParticipants>) {
  try {
    const _call: Call = yield select((state) => state.call.call);
    if (action.payload && action.payload.length > 0) {
      const param = {
        client: action.payload[0].getDisplayName(),
      };
      const response: IUpdateCallResponse = yield call(API.updateCall, _call.id, param);
      if (response.success) {
        yield put(actions.updateCallSuccess(response.call));
      } else {
        yield put(actions.updateCallFailure(response.message));
      }
    }
  } catch (e) {
    yield put(actions.updateCallFailure(e));
  }
}

export default function* callsSaga() {
  yield takeEvery(FETCH_CALLS_BY_PAYLOAD_REQUEST, fetchCallsByPayloadRequestSaga);
  yield takeEvery(CREATE_CALL_REQUEST, createCallRequestSaga);
  yield takeEvery(START_MEETING_SUCCESS, startedMeetingSuccessSaga);
  yield takeEvery(END_MEETING_SUCCESS, endedMeetingSuccessSaga);
  yield takeEvery(SET_PARTICIPANTS, setParticipantsSaga);
}
