import { FETCH_RECORDINGS_BY_PAYLOAD_REQUEST } from './constants';
import * as actions from './actions';
import * as API from '../../apis/recordings';
import { call, put, takeEvery } from 'redux-saga/effects';
import { IEffect } from '..';
import { Action } from './reducer';
import { IGetRecordingByPayloadResponse, Recording } from '../../types/recording';
import { IGetTranscriptionsResponse } from '../../types/transcription';

function* fetchMeetingsByPayloadRequestSaga(action: IEffect<Action>) {
  try {
    const param = action.payload as Partial<Recording>;
    const response: IGetRecordingByPayloadResponse = yield call(
      API.getRecordingsByMeetingId,
      param,
    );
    // Added transcriptions here
    const transcriptionsOBJ: IGetTranscriptionsResponse = yield call(
      API.getTranscriptionsByMeetingId,
      param,
    );
    //transcriptionsOBJ.transcriptions
    if (response.success) {
      yield put(
        actions.fetchRecordingsByPayloadSuccess({
          recordings: response.recording,
          transcriptions: transcriptionsOBJ.transcriptions,
        }),
      );
    } else {
      yield put(actions.fetchRecordingsByPayloadFailure(response.message));
    }
  } catch (e) {
    console.info(e);
    yield put(actions.fetchRecordingsByPayloadFailure(e));
  }
}

export default function* recordingsSaga() {
  yield takeEvery(FETCH_RECORDINGS_BY_PAYLOAD_REQUEST, fetchMeetingsByPayloadRequestSaga);
}
