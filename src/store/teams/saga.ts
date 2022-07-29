import {
  FETCH_TEAM_REQUEST,
  FETCH_TEAMS_BY_PAYLOAD_REQUEST,
  CREATE_TEAM_REQUEST,
  UPDATE_TEAM_REQUEST,
  DELETE_TEAM_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/teams';
import { Action } from './reducer';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { IEffect } from '..';
import { ICreateTeamRequest, Team } from '../../types/team';
import { ICommonResponse, IResponse } from '../../types/common';

function* fetchTeamRequestSaga(action: IEffect<Action>) {
  try {
    const id = action.meta as string;
    const response: IResponse<Team> = yield call(API.fetchTeam, id);

    if (response.success) {
      yield put(actions.fetchTeamSuccess(response.data));
    } else {
      yield put(actions.fetchTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchTeamFailure(e));
  }
}

function* fetchTeamsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<Team>;
    const response: IResponse<Team[]> = yield call(API.fetchTeamsByPayload, param);

    if (response.success) {
      yield put(actions.fetchTeamsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchTeamsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchTeamsByPayloadFailure(e));
  }
}

function* createTeamRequestSaga(action: ReturnType<typeof actions.createTeamRequest>) {
  const param = action.payload as ICreateTeamRequest;
  try {
    const response: IResponse<Team> = yield call(API.createTeam, param);

    if (response.success) {
      yield put(actions.createTeamSuccess(response.data));
    } else {
      yield put(actions.createTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createTeamFailure(e));
  }
}

function* updateTeamRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<Team>;
  const id = action.meta as string;
  try {
    const response: IResponse<Team> = yield call(API.updateTeam, id, param);

    if (response.success) {
      yield put(actions.updateTeamSuccess(response.data));
    } else {
      yield put(actions.updateTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateTeamFailure(e));
  }
}

function* deleteTeamRequestSaga(action: IEffect<Action>) {
  const id = action.meta as string;
  try {
    const response: ICommonResponse = yield call(API.deleteTeam, id);

    if (response.success) {
      yield put(actions.deleteTeamSuccess(id));
    } else {
      yield put(actions.deleteTeamFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteTeamFailure(e));
  }
}

export default function* teamsSaga() {
  yield takeLatest(FETCH_TEAM_REQUEST, fetchTeamRequestSaga);
  yield takeEvery(FETCH_TEAMS_BY_PAYLOAD_REQUEST, fetchTeamsByPayloadRequestSaga);
  yield takeEvery(CREATE_TEAM_REQUEST, createTeamRequestSaga);
  yield takeEvery(UPDATE_TEAM_REQUEST, updateTeamRequestSaga);
  yield takeEvery(DELETE_TEAM_REQUEST, deleteTeamRequestSaga);
}
