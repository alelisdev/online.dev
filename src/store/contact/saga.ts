import {
  FETCH_CONTACT_REQUEST,
  FETCH_CONTACTS_BY_PAYLOAD_REQUEST,
  CREATE_CONTACT_REQUEST,
  UPDATE_CONTACT_REQUEST,
  DELETE_CONTACT_REQUEST,
} from './constants';
import * as actions from './actions';
import * as API from '../../apis/contact';
import { call, put, takeEvery, takeLatest } from 'redux-saga/effects';
import { IEffect } from '..';
import { Action } from './reducer';
import { ICommonResponse, IResponse } from '../../types/common';
import { Contact, ICreateContactRequest } from '../../types/contact';

function* fetchContactRequestSaga(action: IEffect<Action>) {
  try {
    const id = action.meta as string;
    const response: IResponse<Contact> = yield call(API.fetchContact, id);

    if (response.success) {
      yield put(actions.fetchContactSuccess(response.data));
    } else {
      yield put(actions.fetchContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchContactFailure(e));
  }
}

function* fetchContactsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<Contact>;
    const response: IResponse<Contact[]> = yield call(API.fetchContactsByPayload, param);

    if (response.success) {
      yield put(actions.fetchContactsByPayloadSuccess(response.data));
    } else {
      yield put(actions.fetchContactsByPayloadFailure(response.message));
    }
  } catch (e) {
    yield put(actions.fetchContactsByPayloadFailure(e));
  }
}

function* createContactRequestSaga(action: ReturnType<typeof actions.createContactRequest>) {
  const param = action.payload as ICreateContactRequest;
  try {
    const response: IResponse<Contact> = yield call(API.createContact, param);

    if (response.success) {
      yield put(actions.createContactSuccess(response.data));
    } else {
      yield put(actions.createContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.createContactFailure(e));
  }
}

function* updateContactRequestSaga(action: IEffect<Action>) {
  const param = action.payload as Partial<Contact>;
  const id = action.meta as string;
  try {
    const response: IResponse<Contact> = yield call(API.updateContact, id, param);

    if (response.success) {
      yield put(actions.updateContactSuccess(response.data));
    } else {
      yield put(actions.updateContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.updateContactFailure(e));
  }
}

function* deleteContactRequestSaga(action: IEffect<Action>) {
  const id = action.meta as string;
  try {
    const response: ICommonResponse = yield call(API.deleteContact, id);

    if (response.success) {
      yield put(actions.deleteContactSuccess(id));
    } else {
      yield put(actions.deleteContactFailure(response.message));
    }
  } catch (e) {
    yield put(actions.deleteContactFailure(e));
  }
}

export default function* contactSaga() {
  yield takeLatest(FETCH_CONTACT_REQUEST, fetchContactRequestSaga);
  yield takeEvery(FETCH_CONTACTS_BY_PAYLOAD_REQUEST, fetchContactsByPayloadRequestSaga);
  yield takeEvery(CREATE_CONTACT_REQUEST, createContactRequestSaga);
  yield takeEvery(UPDATE_CONTACT_REQUEST, updateContactRequestSaga);
  yield takeEvery(DELETE_CONTACT_REQUEST, deleteContactRequestSaga);
}
