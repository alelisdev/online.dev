import { AUTHENTICATE_REQUEST } from './constants';
import * as actions from './actions';
import * as API from '../../apis/auth';
import { call, put, takeEvery } from 'redux-saga/effects';
import { IAuthenticateRequest, IAuthenticateResponse } from '../../types/authenticate';

function* authenticateRequestSaga(action: ReturnType<typeof actions.authenticateRequest>) {
  const payload = action.payload as IAuthenticateRequest;
  try {
    const response: IAuthenticateResponse = yield call(API.authenticate, payload);

    if (response?.accessToken) {
      localStorage.setItem('currentUser', JSON.stringify(response.user));
      localStorage.setItem('accessToken', JSON.stringify(response.accessToken));

      yield put(actions.authenticateSuccess(response));
    } else {
      yield put(actions.authenticateFailure(response.message));
    }
  } catch (e) {
    yield put(actions.authenticateFailure(e));
  }
}

export default function* appSaga() {
  yield takeEvery(AUTHENTICATE_REQUEST, authenticateRequestSaga);
}
