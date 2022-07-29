import { IParticipant } from '../../types/call';
import {
  AUDIO_INPUT_SETTINGS_UPDATE,
  AUDIO_INPUT_UPDATE,
  AUDIO_OUTPUT_SETTINGS_UPDATE,
  AUDIO_OUTPUT_UPDATE,
  CHANGE_FULL_SCREEN,
  CHANGE_VIDEO_BLUR,
  CONFERENCE_JOINED,
  CONNECTION_ESTABLISHED,
  END_MEETING,
  END_MEETING_SUCCESS,
  LOCAL_TRACK_READY,
  LOCAL_TRACK_STOPPED,
  LOCAL_TRACK_UPDATE,
  MEDIA_DEVICE_REQUEST,
  RECORD_STATE_CHANGED,
  SET_PARTICIPANTS,
  START_MEETING,
  START_MEETING_SUCCESS,
  START_RECORDING_SUCCESS,
  STOP_RECORDING_SUCCESS,
  TRACK_ADDED,
  TRACK_AUDIO_OUTPUT_CHANGED,
  TRACK_REMOVED,
  TRANSCRIPTION_RECEIVED,
  TURN_CAMERA,
  TURN_DESKTOP,
  TURN_MIC,
  TURN_RECORD,
  USER_JOINED,
  USER_LEFT,
  VIDEO_INPUT_SETTINGS_UPDATE,
  VIDEO_INPUT_UPDATE,
  VIRTUAL_BACKGROUND_UPDATE,
  SET_TRANSCRIPTIONS,
} from './constants';

export const startMeeting = () => ({
  type: START_MEETING,
});

export const startMeetingSuccess = () => ({
  type: START_MEETING_SUCCESS,
});

export const endMeeting = () => ({
  type: END_MEETING,
});

export const endMeetingSuccess = () => ({
  type: END_MEETING_SUCCESS,
});

export const connectionEstablished = (payload: any) => ({
  type: CONNECTION_ESTABLISHED,
  payload: payload,
});

export const conferenceJoined = (payload: any) => ({
  type: CONFERENCE_JOINED,
  payload: payload,
});

export const userJoined = (payload: any) => ({
  type: USER_JOINED,
  payload: payload,
});

export const userLeft = (payload: any) => ({
  type: USER_LEFT,
  payload: payload,
});

export const trackAdded = (payload: any) => ({
  type: TRACK_ADDED,
  payload: payload,
});

export const trackRemoved = (payload: any) => ({
  type: TRACK_REMOVED,
  payload: payload,
});

export const setParticipants = (payload: IParticipant[]) => ({
  type: SET_PARTICIPANTS,
  payload: payload,
});

export const localTrackReady = (payload: any) => ({
  type: LOCAL_TRACK_READY,
  payload: payload,
});

export const localTrackUpdate = (payload: any) => ({
  type: LOCAL_TRACK_UPDATE,
  payload: payload,
});

export const localTrackStopped = (payload: any) => ({
  type: LOCAL_TRACK_STOPPED,
  payload: payload,
});

export const trackAudioOutputChanged = (payload: any) => ({
  type: TRACK_AUDIO_OUTPUT_CHANGED,
  payload: payload,
});

export const turnCamera = (payload: any) => ({
  type: TURN_CAMERA,
  payload: payload,
});

export const turnMic = (payload: any) => ({
  type: TURN_MIC,
  payload: payload,
});

export const startRecordingSuccess = (payload: any) => ({
  type: START_RECORDING_SUCCESS,
  payload: payload,
});

export const stopRecordingSuccess = () => ({
  type: STOP_RECORDING_SUCCESS,
});

export const turnRecord = (payload: any) => ({
  type: TURN_RECORD,
  payload: payload,
});

export const turnDesktop = (payload: any) => ({
  type: TURN_DESKTOP,
  payload: payload,
});

export const changeFullScreen = (payload: any) => ({
  type: CHANGE_FULL_SCREEN,
  payload: payload,
});

export const changeVideoBlur = (payload: any) => ({
  type: CHANGE_VIDEO_BLUR,
  payload: payload,
});

export const recordStateChanged = (payload: any) => ({
  type: RECORD_STATE_CHANGED,
  payload,
});

export const mediaDeviceRequest = () => ({ type: MEDIA_DEVICE_REQUEST });
export const virtualBackgroundUpdate = (payload: any) => ({
  type: VIRTUAL_BACKGROUND_UPDATE,
  payload,
});
export const videoInputUpdate = (payload: any) => ({ type: VIDEO_INPUT_UPDATE, payload });
export const audioInputUpdate = (payload: any) => ({ type: AUDIO_INPUT_UPDATE, payload });
export const audioOutputUpdate = (payload: any) => ({ type: AUDIO_OUTPUT_UPDATE, payload });
export const videoInputSettingsUpdate = (payload: any) => ({
  type: VIDEO_INPUT_SETTINGS_UPDATE,
  payload,
});
export const audioInputSettingsUpdate = (payload: any) => ({
  type: AUDIO_INPUT_SETTINGS_UPDATE,
  payload,
});
export const audioOutputSettingsUpdate = (payload: any) => ({
  type: AUDIO_OUTPUT_SETTINGS_UPDATE,
  payload,
});
export const transcriptionReceived = (payload: any) => ({
  type: TRANSCRIPTION_RECEIVED,
  payload,
});

export const setTranscriptions = (payload: any) => ({
  type: SET_TRANSCRIPTIONS,
  payload,
});
