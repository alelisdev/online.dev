import { call, cps, put, select, take, takeEvery, takeLatest } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import * as API from '../../apis/recordings';
import {
  AUDIO_INPUT_UPDATE,
  AUDIO_OUTPUT_UPDATE,
  CHANGE_VIDEO_BLUR,
  CONFERENCE_JOINED,
  confOptions,
  CONNECTION_ESTABLISHED,
  END_MEETING,
  initOptions,
  LOCAL_TRACK_READY,
  LOCAL_TRACK_STOPPED,
  LOCAL_TRACK_UPDATE,
  MEDIA_DEVICE_REQUEST,
  options,
  RECORD_STATE_CHANGED,
  START_MEETING,
  TRACK_ADDED,
  TRACK_REMOVED,
  TRANSCRIPTION_RECEIVED,
  TURN_CAMERA,
  TURN_DESKTOP,
  TURN_MIC,
  TURN_RECORD,
  USER_JOINED,
  USER_LEFT,
  VIDEO_INPUT_UPDATE,
  VIRTUAL_BACKGROUND_TYPE,
  VIRTUAL_BACKGROUND_UPDATE,
} from './constants';
import * as actions from './actions';
import {
  mutePresenterVideo,
  onReceivedTranscription,
  onRemoteTrack,
  onTrackRemoved,
  processTranscription,
} from './functions';
// import { RootState } from '..';
import { createVirtualBackgroundEffect } from '../../components/virtual-background';
import { CLOSE_MODAL_AND_END_Meeting } from '../app/constants';

export interface IJitsiMeetJS {
  events: any;
  logLevels: any;
  JitsiConnection: any;
  mediaDevices: any;
  init: (obj: any) => void;
  setLogLevel: (obj: any) => void;
  createLocalTracks: any;
  setLocalParticipantProperty: any;
}
export declare const window: {
  JitsiMeetJS: IJitsiMeetJS;
  jQuery: any;
  $: any;
};
export const JitsiMeetJS: IJitsiMeetJS = window.JitsiMeetJS;
window.jQuery = $;
window.$ = $;
// @ts-expect-error check global type
global.jQuery = $;

function* startMeetingSaga() {
  yield JitsiMeetJS.init(initOptions);
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
  const connection = new JitsiMeetJS.JitsiConnection(null, null, options);
  // @ts-expect-error check yield and call type
  const connectionChannel = yield call(createConnection, connection);

  yield connection.connect();

  // Create local track
  if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    // let _devices = [];
    try {
      yield cps((cb) =>
        JitsiMeetJS.mediaDevices.enumerateDevices((devices: Array<any>) => {
          cb(null, devices);
        }),
      );
    } catch (err) {
      console.log(err);
    }
  }

  while (true) {
    try {
      // @ts-expect-error check yield and take type
      const _action = yield take(connectionChannel);
      switch (_action.type) {
        case CONNECTION_ESTABLISHED:
          yield put(actions.connectionEstablished(connection));
          break;
        default:
          yield put(_action);
          break;
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

function* endMeetingSaga() {
  // @ts-expect-error check yield and select type
  const state = yield select((state) => state.meeting);
  if (state.room && state.room.isJoined()) {
    const localTracks = state.room.getLocalTracks();
    for (let i = 0; i < localTracks.length; i++) {
      if (!localTracks[i].disposed) {
        yield localTracks[i].dispose();
      }
    }
    yield state.room.leave();
    yield state.connection.disconnect();
    yield put(actions.endMeetingSuccess());
  }
}

const createConnection = (connection: any) => {
  return eventChannel((emit) => {
    const connectionEstablished = () => {
      emit(actions.connectionEstablished(connection));
    };

    connection.addEventListener(
      JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
      connectionEstablished,
    );

    const removeEventListeners = () => {
      connection.removeEventListener(
        JitsiMeetJS.events.connection.CONNECTION_ESTABLISHED,
        connectionEstablished,
      );
    };

    return removeEventListeners;
  });
};

function* connectionEstablishedSaga(action: any) {
  const connection = action.payload;
  // @ts-expect-error check select and yield type
  const meetingsState = yield select((state) => state.meetings);
  const room = connection.initJitsiConference(meetingsState.meeting.id ?? 'conference', {
    ...confOptions,
  });
  //TODO change it to english and cleanup a bit
  // @ts-expect-error check select and yield type
  const currentUser = yield select((state) => state.app.currentUser);
  room.setReceiverVideoConstraint(1080);
  room.setSenderVideoConstraint(1080);
  room.setDisplayName(currentUser.username);
  yield room.join();
  //TODO enable transcriber after jitsi restart in  meeting saga

  yield room.setLocalParticipantProperty('translation_language');
  yield room.setLocalParticipantProperty('requestingTranscription', true);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const transcriptionsOBJ = yield call(API.getTranscriptionsByMeetingId, {
    meeting_id: room.options.name,
  });
  yield put(actions.setTranscriptions(transcriptionsOBJ.transcriptions));
  //
  // @ts-expect-error check yield and call type
  const roomChannel = yield call(joinRoom, room);

  while (true) {
    try {
      // @ts-expect-error check yield and take type
      const _action = yield take(roomChannel);
      switch (_action.type) {
        case CONFERENCE_JOINED:
          yield put(actions.startMeetingSuccess());
          yield put(actions.conferenceJoined(_action.payload));
          break;
        case USER_JOINED:
          console.log(USER_JOINED, room.getParticipants());
          yield put(actions.setParticipants(room.getParticipants()));
          break;
        case USER_LEFT:
          console.log(USER_LEFT, room.getParticipants());
          yield put(actions.setParticipants(room.getParticipants()));
          break;
        case TRACK_ADDED:
          const track = _action.payload;
          // @ts-expect-error check yield and select type
          const state = yield select((state) => state.meeting);
          const participantTracks = onRemoteTrack(state, track);
          if (participantTracks) {
            yield put(actions.trackAdded(participantTracks));
          }
          break;
        case TRACK_REMOVED:
          const _track = _action.payload;
          // @ts-expect-error check yield and select type
          const _state = yield select((state) => state.meeting);
          const _participantTracks = onTrackRemoved(_state, _track);
          if (_participantTracks) {
            yield put(actions.trackRemoved(_participantTracks));
          }
          break;
        case TRANSCRIPTION_RECEIVED:
          const _transcription = _action.payload;
          // @ts-expect-error check yield and select type
          const meetState = yield select((state) => state.meeting);
          // @ts-expect-error check yield and select type
          const preset = yield select((state) => state.preset.preset);
          const processedTranscription = processTranscription(_transcription, preset);
          const _transcriptions = onReceivedTranscription(meetState, processedTranscription);
          if (_transcriptions) {
            const params = {
              meeting_id: meetState.room.options.name,
              confidence: processedTranscription.confidence,
              transcription: processedTranscription.transcription,
              isTalkingPoint: processedTranscription.isTalkingPoint,
            };
            yield call(API.addTranslation, params);
            yield put(actions.transcriptionReceived(_transcriptions));
          }
          break;
        default:
          yield put(_action);
          break;
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

const joinRoom = (room: any) => {
  return eventChannel((emit) => {
    const conferenceJoined = () => {
      emit(actions.conferenceJoined(room));
    };
    const userJoined = (id: string, participant: any) => {
      emit(actions.userJoined({ id, participant }));
    };
    const userLeft = (id: string, participant: any) => {
      emit(actions.userLeft({ id, participant }));
    };
    //TODO change it to english and cleanup a bit
    const endpointMessageRecieved = (participant: any, data: any) => {
      /**
       * The type of json-message which indicates that json carries a
       * transcription result.
       */
      const JSON_TYPE_TRANSCRIPTION_RESULT = 'transcription-result';

      if (data.stability === 0 && data.type === JSON_TYPE_TRANSCRIPTION_RESULT) {
        const transcriptionObject = {
          transcription: data.transcript[0]?.text,
          confidence: data.transcript[0]?.confidence,
          isTalkingPoint: false,
        };
        emit(actions.transcriptionReceived(transcriptionObject));
      }

      /**
       * The type of json-message which indicates that json carries a
       * translation result.
       */
      const JSON_TYPE_TRANSLATION_RESULT = 'translation-result';
      //TODO check do we need this part
      if (
        !(
          data &&
          (data.type === JSON_TYPE_TRANSCRIPTION_RESULT ||
            data.type === JSON_TYPE_TRANSLATION_RESULT)
        )
      ) {
        console.log(
          'msg',
          participant && participant._displayName ? participant._displayName : null,
        );
        return;
      }
    };
    const trackAdded = (track: any) => {
      console.log('trackAdded:', track);
      emit(actions.trackAdded(track));
    };
    const trackRemoved = (track: any) => {
      console.log('trackRemoved: ', track);
      emit(actions.trackRemoved(track));
    };
    const trackMuteChanged = (track: any) => {
      console.log('trackMuteChanged', track);
      if (track.isMuted()) {
        emit(actions.trackRemoved(track));
      } else {
        emit(actions.trackAdded(track));
      }
    };
    const recordStateChanged = (data: any, arg1: any) => {
      console.log('recorecordStateChanged', data);
      console.info(arg1);
      emit(actions.recordStateChanged(data));
    };

    room.addEventListener(JitsiMeetJS.events.conference.CONFERENCE_JOINED, conferenceJoined);
    room.addEventListener(JitsiMeetJS.events.conference.USER_JOINED, userJoined);
    room.addEventListener(JitsiMeetJS.events.conference.USER_LEFT, userLeft);
    room.addEventListener(JitsiMeetJS.events.conference.TRACK_ADDED, trackAdded);
    room.addEventListener(JitsiMeetJS.events.conference.TRACK_REMOVED, trackRemoved);
    room.addEventListener(JitsiMeetJS.events.conference.TRACK_MUTE_CHANGED, trackMuteChanged);
    room.addEventListener(JitsiMeetJS.events.conference.RECORDER_STATE_CHANGED, recordStateChanged);
    //TODO for chat implementation check is this is from transcription
    room.addEventListener(
      JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED,
      endpointMessageRecieved,
    );

    const removeEventListeners = () => {
      room.removeEventListener(JitsiMeetJS.events.conference.CONFERENCE_JOINED, conferenceJoined);
      room.removeEventListener(JitsiMeetJS.events.conference.USER_JOINED, userJoined);
      room.removeEventListener(JitsiMeetJS.events.conference.USER_LEFT, userLeft);
      room.removeEventListener(JitsiMeetJS.events.conference.TRACK_ADDED, trackAdded);
      room.removeEventListener(JitsiMeetJS.events.conference.TRACK_REMOVED, trackRemoved);
      room.removeEventListener(JitsiMeetJS.events.conference.TRACK_MUTE_REMOVED, trackMuteChanged);
      room.removeEventListener(
        JitsiMeetJS.events.conference.ENDPOINT_MESSAGE_RECEIVED,
        endpointMessageRecieved,
      );
    };

    return removeEventListeners;
  });
};

function* localTrackReadySaga(action: any) {
  const localTracks: Array<any> = action.payload;
  const localTrackChannels = [];
  for (let i = 0; i < localTracks.length; i++) {
    // @ts-expect-error check yield and call type
    localTrackChannels[i] = yield call(addTrack, localTracks[i]);
  }

  yield put(actions.localTrackUpdate(localTracks));

  while (true) {
    try {
      for (let i = 0; i < localTrackChannels.length; i++) {
        // @ts-expect-error check yield and take type
        const _action = yield take(localTrackChannels[i]);
        switch (_action.type) {
          case LOCAL_TRACK_STOPPED:
            // TODO: check if setEffect is processing
            // if (!_action.payload.disposed) {
            //   yield _action.payload.dispose();
            // }
            // Handle when stop sharing button of the browser is clicked
            if (
              _action.payload.getType() === 'video' &&
              _action.payload.getVideoType() === 'desktop'
            ) {
              yield put(actions.turnDesktop(false));
            }
            break;
          default:
            yield put(_action);
            break;
        }
      }
    } catch (err) {
      console.error('socket error:', err);
    }
  }
}

const addTrack = (localTrack: any) => {
  return eventChannel((emit) => {
    const trackAudioOutputChanged = () => {
      emit(actions.trackAudioOutputChanged(localTrack));
    };
    const localTrackStopped = () => {
      emit(actions.localTrackStopped(localTrack));
    };
    localTrack.addEventListener(
      JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
      trackAudioOutputChanged,
    );
    localTrack.addEventListener(JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED, localTrackStopped);

    const removeEventListeners = () => {
      localTrack.removeEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_OUTPUT_CHANGED,
        trackAudioOutputChanged,
      );
      localTrack.removeEventListener(
        JitsiMeetJS.events.track.LOCAL_TRACK_STOPPED,
        localTrackStopped,
      );
    };
    return removeEventListeners;
  });
};

function* conferenceJoinedSaga() {
  const { room, localTracks } = yield select((state) => state.meeting);
  if (room) {
    for (let i = 0; i < localTracks.length; i++) {
      yield room.addTrack(localTracks[i]);
    }
  }
}

function* turnCameraDesktopSaga(action: any) {
  // @ts-expect-error check yield and select type
  const meetingState = yield select((state) => state.meeting);
  let videoInput = meetingState.videoInput;
  let isCameraOn = meetingState.isCameraOn;
  let isDesktopOn = meetingState.isDesktopOn;
  let virtualBackground = meetingState.virtualBackground;
  if (action.type === VIDEO_INPUT_UPDATE) {
    videoInput = action.payload;
  }
  if (action.type === TURN_CAMERA) {
    isCameraOn = action.payload;
  }
  if (action.type === TURN_DESKTOP) {
    isDesktopOn = action.payload;
  }
  if (action.type === VIRTUAL_BACKGROUND_UPDATE) {
    virtualBackground = action.payload;
  }

  const room = meetingState.room;
  const currentLocalVideoTrack =
    room && room.isJoined()
      ? room.getLocalVideoTrack()
      : meetingState.localTracks.find((t: any) => t.getType() === 'video');

  if (currentLocalVideoTrack) {
    if (isCameraOn) {
      if (isDesktopOn) {
        let _desktopTrack;
        if (currentLocalVideoTrack.videoType === 'desktop') {
          _desktopTrack = currentLocalVideoTrack;
        } else {
          yield currentLocalVideoTrack.dispose();
          // @ts-expect-error check yield and select type
          _desktopTrack = yield _turnDesktop();
        }
        // @ts-expect-error check yield and select type
        const effect = yield mutePresenterVideo(_desktopTrack, videoInput);
        yield _desktopTrack.setEffect(effect);
        yield put(actions.localTrackReady([_desktopTrack]));
      } else {
        if (currentLocalVideoTrack.videoType === 'desktop') {
          yield currentLocalVideoTrack.setEffect(undefined);
        }
        yield currentLocalVideoTrack.dispose();
        // @ts-expect-error check yield and select type
        const newLocalTrack = yield _virtualBackground(videoInput, virtualBackground);
        yield put(actions.localTrackReady([newLocalTrack]));
      }
    } else {
      if (isDesktopOn) {
        let _desktopTrack;
        if (currentLocalVideoTrack.videoType === 'desktop') {
          yield currentLocalVideoTrack.setEffect(undefined);
          _desktopTrack = currentLocalVideoTrack;
        } else {
          yield currentLocalVideoTrack.dispose();
          // @ts-expect-error check yield and select type
          _desktopTrack = yield _turnDesktop();
        }
        yield put(actions.localTrackReady([_desktopTrack]));
      } else {
        yield currentLocalVideoTrack.dispose();
        yield put(actions.localTrackReady([currentLocalVideoTrack]));
      }
    }
  } else {
    yield JitsiMeetJS.init(initOptions);
    JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);
    if (isCameraOn) {
      // @ts-expect-error check yield and select type
      const newVideoTrack = yield _virtualBackground(videoInput, virtualBackground);

      yield put(actions.localTrackReady([newVideoTrack]));
      // room.addTrack(newVideoTrack);
    } else {
      if (isDesktopOn) {
        // @ts-expect-error check yield and select type
        const newDesktopTrack = yield _turnDesktop();
        yield put(actions.localTrackReady([newDesktopTrack]));
      }
    }
  }
}

async function _turnCamera(videoInput: string) {
  const [newVideoTrack] = await JitsiMeetJS.createLocalTracks({
    devices: ['video'],
    cameraDeviceId: videoInput,
    maxFps: 60,
    minFps: 30,
  });
  return newVideoTrack;
}

async function _turnDesktop() {
  const [newVideoTrack] = await JitsiMeetJS.createLocalTracks({
    devices: ['desktop'],
    maxFps: 60,
    minFps: 30,
  });
  return newVideoTrack;
}

async function _virtualBackground(videoInput: string, virtualBackground: string) {
  const newVideoTrack = await _turnCamera(videoInput);
  if (virtualBackground) {
    const _virtualBackground = {
      backgroundType: VIRTUAL_BACKGROUND_TYPE.IMAGE,
      virtualSource:
        // @ts-expect-error check yield virtual background type
        window.location.origin + `/images/virtual-background/${virtualBackground}`,
    };
    const vbEffect = await createVirtualBackgroundEffect(_virtualBackground);
    await newVideoTrack.setEffect(vbEffect);
  }
  return newVideoTrack;
}

function* turnRecordSaga(action: any) {
  const isRecordOn = action.payload;
  // @ts-expect-error check yield and select type
  const meetingState = yield select((state) => state.meeting);
  const room = meetingState.room;
  if (isRecordOn) {
    if (room && room.isJoined()) {
      const confOptions = {
        openBridgeChannel: true,
        mode: 'file',
        appData: null,
      };

      room.sendCommand('follow-me', {
        attributes: { tileViewEnabled: true, filmstripVisible: false },
      });

      // @ts-expect-error check yield and select type
      const recordSession = yield room.startRecording(confOptions);
      yield put(actions.startRecordingSuccess(recordSession));
    }
  } else {
    const recordSession = meetingState.recordSession;
    if (recordSession) {
      yield room.stopRecording(recordSession.getID());
      yield put(actions.stopRecordingSuccess());
    }
  }
}
// @ts-expect-error check type lack
function* turnMicSaga(action) {
  // @ts-expect-error check yield and select type
  const meetingState = yield select((state) => state.meeting);
  let audioInput = meetingState.audioInput;
  let isMicOn = meetingState.isMicOn;
  if (action.type === AUDIO_INPUT_UPDATE) {
    audioInput = action.payload;
  }
  if (action.type === TURN_MIC) {
    isMicOn = action.payload;
  }
  const room = meetingState.room;
  const currentLocalAudioTrack =
    room && room.isJoined()
      ? room.getLocalAudioTrack()
      : meetingState.localTracks.find((t: any) => t.getType() === 'audio');
  if (currentLocalAudioTrack) {
    // Remove old and current disposed track
    yield currentLocalAudioTrack.dispose();
    if (isMicOn) {
      const [newVideoTrack] = yield JitsiMeetJS.createLocalTracks({
        devices: ['audio'],
        micDeviceId: audioInput,
      });
      yield put(actions.localTrackReady([newVideoTrack]));
    } else {
      yield put(actions.localTrackUpdate([currentLocalAudioTrack]));
    }
  } else {
    if (isMicOn) {
      yield JitsiMeetJS.init(initOptions);
      JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

      const [newVideoTrack] = yield JitsiMeetJS.createLocalTracks({
        devices: ['audio'],
        micDeviceId: audioInput,
      });
      yield put(actions.localTrackReady([newVideoTrack]));
      // room.addTrack(newVideoTrack);
    }
  }
}

function* localTrackUpdateSaga() {
  const { room, localTracks: tracks } = yield select((state) => state.meeting);
  if (room && room.isJoined()) {
    const currentVideoTrack = room.getLocalVideoTrack();
    const currentAudioTrack = room.getLocalAudioTrack();
    for (let i = 0; i < tracks.length; i++) {
      if (tracks[i].getType() === 'audio' && !tracks[i].disposed) {
        if ((currentAudioTrack && currentAudioTrack.disposed) || !currentAudioTrack) {
          try {
            yield room.addTrack(tracks[i]);
          } catch (err) {
            console.info(err);
          }
        }
      }

      if (tracks[i].getType() === 'video' && !tracks[i].disposed) {
        if ((currentVideoTrack && currentVideoTrack.disposed) || !currentVideoTrack) {
          try {
            yield room.addTrack(tracks[i]);
          } catch (err) {
            console.info(err);
          }
        }
      }
    }
  }
}

function* changeVideoBlurSaga(action: any) {
  console.log(action.payload);
  // const isCameraOn = action.payload;
  // @ts-expect-error check yield and select type
  const meetingState = yield select((state) => state.meeting);
  const room = meetingState.room;
  const currentLocalVideoTrack =
    room && room.isJoined()
      ? room.getLocalVideoTrack()
      : meetingState.localTracks.find((t: any) => t.getType() === 'video');

  if (currentLocalVideoTrack) {
    if (
      action.payload.backgroundType === VIRTUAL_BACKGROUND_TYPE.BLUR &&
      parseInt(action.payload.blurValue) > 0
    ) {
      // @ts-expect-error check yield and effect type
      const vbEffect = yield createVirtualBackgroundEffect(action.payload);
      yield currentLocalVideoTrack.setEffect(vbEffect);
    }
  }
}

function* recordStateChangeSaga(action: any) {
  const jibriSession = action.payload;
  if (jibriSession && jibriSession.getStatus() === 'on') {
    // @ts-expect-error check yield and select type
    const meetingsState = yield select((state) => state.meetings);
    const params = {
      session_id: jibriSession.getID(),
      meeting_id: meetingsState.meeting.id,
    };
    yield call(API.createRecording, params);
  }
}

function* requestMediaDeviceSaga() {
  yield JitsiMeetJS.init(initOptions);
  JitsiMeetJS.setLogLevel(JitsiMeetJS.logLevels.ERROR);

  if (JitsiMeetJS.mediaDevices.isDeviceChangeAvailable('output')) {
    let _devices = [];
    try {
      _devices = yield cps((cb) =>
        JitsiMeetJS.mediaDevices.enumerateDevices((devices: Array<any>) => {
          cb(null, devices);
        }),
      );
    } catch (err) {
      console.log(err);
    }
    if (_devices && _devices.length > 0) {
      const videoInputSettings = [],
        audioInputSettings = [],
        audioOutputSettings = [];
      for (const device of _devices) {
        switch (device.kind) {
          case 'audiooutput':
            audioOutputSettings.push(device);
            break;
          case 'audioinput':
            audioInputSettings.push(device);
            break;
          case 'videoinput':
            videoInputSettings.push(device);
            break;
          default:
            break;
        }
      }

      const deviceOptions: Array<any> = [];
      if (videoInputSettings.length > 0) {
        deviceOptions.push('video');
      }
      if (audioInputSettings.length > 0) {
        deviceOptions.push('audio');
      }
      try {
        if (deviceOptions.length > 0) {
          // @ts-expect-error check yield type
          const localTracks = yield JitsiMeetJS.createLocalTracks({ devices: deviceOptions });
          yield put(actions.videoInputSettingsUpdate(videoInputSettings));
          yield put(actions.audioInputSettingsUpdate(audioInputSettings));
          yield put(actions.audioOutputSettingsUpdate(audioOutputSettings));

          if (audioOutputSettings.length > 0) {
            yield put(actions.audioOutputUpdate(audioOutputSettings[0].deviceId));
          }

          for (const localTrack of localTracks) {
            if (localTrack.getType() === 'audio') {
              yield put(actions.audioInputUpdate(localTrack.getDeviceId()));
            }
            if (localTrack.getType() === 'video' && localTrack.getVideoType() === 'camera') {
              yield put(actions.videoInputUpdate(localTrack.getDeviceId()));
            }

            yield localTrack.dispose();
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
}

function* updateAudioOutputSaga(action: any) {
  try {
    // setSinkId - audioOutputDevice
    yield JitsiMeetJS.mediaDevices.setAudioOutputDevice(action.payload);
  } catch (err) {
    console.log(err);
  }
}

export default function* meetingSaga() {
  yield takeEvery(MEDIA_DEVICE_REQUEST, requestMediaDeviceSaga);
  yield takeEvery(START_MEETING, startMeetingSaga);
  yield takeEvery(END_MEETING, endMeetingSaga);
  yield takeEvery(CLOSE_MODAL_AND_END_Meeting, endMeetingSaga);
  yield takeEvery(CONNECTION_ESTABLISHED, connectionEstablishedSaga);
  yield takeEvery(LOCAL_TRACK_READY, localTrackReadySaga);
  yield takeEvery(LOCAL_TRACK_UPDATE, localTrackUpdateSaga);
  yield takeEvery(CONFERENCE_JOINED, conferenceJoinedSaga);
  yield takeEvery(VIRTUAL_BACKGROUND_UPDATE, turnCameraDesktopSaga);
  yield takeEvery(TURN_CAMERA, turnCameraDesktopSaga);
  yield takeEvery(VIDEO_INPUT_UPDATE, turnCameraDesktopSaga);
  yield takeEvery(TURN_DESKTOP, turnCameraDesktopSaga);
  yield takeEvery(TURN_MIC, turnMicSaga);
  yield takeEvery(AUDIO_INPUT_UPDATE, turnMicSaga);
  yield takeEvery(TURN_RECORD, turnRecordSaga);
  yield takeLatest(CHANGE_VIDEO_BLUR, changeVideoBlurSaga);
  yield takeEvery(RECORD_STATE_CHANGED, recordStateChangeSaga);
  yield takeEvery(AUDIO_OUTPUT_UPDATE, updateAudioOutputSaga);
}
