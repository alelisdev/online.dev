import {
  FETCH_USER_REQUEST,
  FETCH_USERS_BY_PAYLOAD_REQUEST,
  UPDATE_USER_REQUEST,
  UPLOAD_USER_IMAGE_REQUEST,
} from './constants';
import * as actions from './actions';
import * as appActions from '../app/actions';
import * as API from '../../apis/user';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { Action } from './reducer';
import { IEffect } from '..';
import { IUpdateUserResponse, IUserImageRequest, User } from '../../types/user';
import { IResponse } from '../../types/common';

function* fetchUserRequestSaga(action: IEffect<Action>) {
  try {
    const id = action.meta as string;
    const response: IResponse<User> = yield call(API.fetchUser, id);

    yield put(actions.fetchUserSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchUserFailure(e));
  }
}

function* fetchUsersByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<User>;
    const response: IResponse<User[]> = yield call(API.fetchUsersByPayload, param);

    yield put(actions.fetchUsersByPayloadSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchUsersByPayloadFailure(e));
  }
}

function* updateUserRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<User>;
  const id = action.meta as string;
  try {
    const response: IUpdateUserResponse = yield call(API.updateUser, id, param);

    localStorage.setItem('currentUser', JSON.stringify(response.user));

    yield put(actions.updateUserSuccess(response.user));
  } catch (e) {
    yield put(actions.updateUserFailure(e));
  }
}

function* uploadUserImageRequestSaga(action: ReturnType<typeof actions.uploadUserImageRequest>) {
  const param = action.payload as IUserImageRequest;
  try {
    const response: IResponse<string> = yield call(API.uploadUserImage, param);

    if (response.success) {
      const currentUser = appActions.fetchCurrentUser();
      const payload = currentUser.payload;
      if (param.hasOwnProperty('avatar')) {
        payload.avatar = response.data;
      }
      if (param.hasOwnProperty('background')) {
        payload.background = response.data;
      }
      localStorage.setItem('currentUser', JSON.stringify(payload));
      yield put(actions.uploadUserImageSuccess(response.data));
    } else {
      yield put(actions.uploadUserImageFailure(response.message));
    }
  } catch (e) {
    yield put(actions.uploadUserImageFailure(e));
  }
}

export default function* userSaga() {
  yield takeLatest(FETCH_USER_REQUEST, fetchUserRequestSaga);
  yield takeEvery(FETCH_USERS_BY_PAYLOAD_REQUEST, fetchUsersByPayloadRequestSaga);
  yield takeEvery(UPDATE_USER_REQUEST, updateUserRequestSaga);
  yield takeEvery(UPLOAD_USER_IMAGE_REQUEST, uploadUserImageRequestSaga);
}
