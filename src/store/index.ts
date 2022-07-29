import { combineReducers } from 'redux';
import { all, SimpleEffect } from 'redux-saga/effects';

import app from './app/reducer';
import user from './user/reducer';
import contact from './contact/reducer';
import meeting from './meeting/reducer';
import meetings from './meetings/reducer';
import teams from './teams/reducer';
import salesRep from './salesRep/reducer';
import client from './client/reducer';
import call from './call/reducer';
import recordings from './recordings/reducer';
import preset from './preset/reducer';

import appSaga from './app/saga';
import userSaga from './user/saga';
import contactSaga from './contact/saga';
import meetingSaga from './meeting/saga';
import meetingsSaga from './meetings/saga';
import teamsSaga from './teams/saga';
import salesRepSaga from './salesRep/saga';
import clientSaga from './client/saga';
import callsSaga from './call/saga';
import recordingsSaga from './recordings/saga';
import presetSaga from './preset/saga';

const rootReducer = combineReducers({
  app,
  user,
  contact,
  meeting,
  meetings,
  teams,
  salesRep,
  client,
  call,
  recordings,
  preset,
});

export function* rootSaga() {
  yield all([
    appSaga(),
    userSaga(),
    contactSaga(),
    meetingSaga(),
    meetingsSaga(),
    teamsSaga(),
    salesRepSaga(),
    clientSaga(),
    callsSaga(),
    recordingsSaga(),
    presetSaga(),
  ]);
}

export interface IEffect<TP, T = string, P = TP> extends SimpleEffect<T, P> {
  meta?: string;
  type: T;
  payload: P;
}

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
