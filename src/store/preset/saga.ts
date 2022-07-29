import { FETCH_PRESET_REQUEST, GET_PRESET_REQUEST, SET_PRESET_REQUEST } from './constants';
import * as actions from './actions';
import * as API from '../../apis/preset';
import * as meetingAPI from '../../apis/meeting';
import { call, put, takeLatest } from 'redux-saga/effects';

function* fetchPresetRequestSaga() {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = yield call(API.fetchPresets, null);
    yield put(actions.fetchPresetSuccess(response.data));
  } catch (e) {
    yield put(actions.fetchPresetFailure(e));
  }
}

function* getPresetForMeetingSaga(action: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line import/namespace

    const response = yield call(API.getPreset, action.payload);
    yield put(actions.getPresetForMeetingSuccess(response.data));
  } catch (e) {
    yield put(actions.getPresetForMeetingFailure(e));
  }
}

function* setPresetForMeetingSaga(action: any) {
  try {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line import/namespace

    const presetId = action.payload.presetId;
    const meetingId = action.payload.meeting_id;
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const response = yield call(meetingAPI.updateMeeting, meetingId, { presetId: presetId });
    yield put(actions.setPresetForMeetingSuccess(response.data));
  } catch (e) {
    yield put(actions.setPresetForMeetingFailure(e));
  }
}

export default function* presetSaga() {
  yield takeLatest(FETCH_PRESET_REQUEST, fetchPresetRequestSaga);
  yield takeLatest(GET_PRESET_REQUEST, getPresetForMeetingSaga);
  yield takeLatest(SET_PRESET_REQUEST, setPresetForMeetingSaga);
}
