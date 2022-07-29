import _ from 'lodash';
import {
  audioInputSettingsUpdate,
  audioInputUpdate,
  audioOutputSettingsUpdate,
  audioOutputUpdate,
  changeFullScreen,
  changeVideoBlur,
  conferenceJoined,
  connectionEstablished,
  endMeetingSuccess,
  localTrackUpdate,
  setParticipants,
  startMeetingSuccess,
  startRecordingSuccess,
  stopRecordingSuccess,
  trackAdded,
  trackRemoved,
  transcriptionReceived,
  turnCamera,
  turnDesktop,
  turnMic,
  turnRecord,
  userJoined,
  videoInputSettingsUpdate,
  videoInputUpdate,
  virtualBackgroundUpdate,
  setTranscriptions,
} from './actions';
import {
  AUDIO_INPUT_SETTINGS_UPDATE,
  AUDIO_INPUT_UPDATE,
  AUDIO_OUTPUT_SETTINGS_UPDATE,
  AUDIO_OUTPUT_UPDATE,
  CHANGE_FULL_SCREEN,
  CHANGE_VIDEO_BLUR,
  CONFERENCE_JOINED,
  CONNECTION_ESTABLISHED,
  END_MEETING_SUCCESS,
  LOCAL_TRACK_UPDATE,
  SET_PARTICIPANTS,
  START_MEETING_SUCCESS,
  START_RECORDING_SUCCESS,
  STOP_RECORDING_SUCCESS,
  TRACK_ADDED,
  TRACK_REMOVED,
  TRANSCRIPTION_RECEIVED,
  TURN_CAMERA,
  TURN_DESKTOP,
  TURN_MIC,
  TURN_RECORD,
  USER_JOINED,
  VIDEO_INPUT_SETTINGS_UPDATE,
  VIDEO_INPUT_UPDATE,
  VIRTUAL_BACKGROUND_UPDATE,
  SET_TRANSCRIPTIONS,
} from './constants';

type Action =
  | ReturnType<typeof startMeetingSuccess>
  | ReturnType<typeof endMeetingSuccess>
  | ReturnType<typeof connectionEstablished>
  | ReturnType<typeof conferenceJoined>
  | ReturnType<typeof localTrackUpdate>
  | ReturnType<typeof userJoined>
  | ReturnType<typeof setParticipants>
  | ReturnType<typeof trackAdded>
  | ReturnType<typeof trackRemoved>
  | ReturnType<typeof turnCamera>
  | ReturnType<typeof turnMic>
  | ReturnType<typeof turnDesktop>
  | ReturnType<typeof turnRecord>
  | ReturnType<typeof startRecordingSuccess>
  | ReturnType<typeof stopRecordingSuccess>
  | ReturnType<typeof changeFullScreen>
  | ReturnType<typeof changeVideoBlur>
  | ReturnType<typeof virtualBackgroundUpdate>
  | ReturnType<typeof videoInputSettingsUpdate>
  | ReturnType<typeof audioInputSettingsUpdate>
  | ReturnType<typeof audioOutputSettingsUpdate>
  | ReturnType<typeof audioInputUpdate>
  | ReturnType<typeof audioOutputUpdate>
  | ReturnType<typeof videoInputUpdate>
  | ReturnType<typeof transcriptionReceived>
  | ReturnType<typeof setTranscriptions>;

export type InitialStateType = {
  isStarted: boolean;
  connection: any;
  room: any;
  participants: Array<any>;
  localTracks: Array<any>;
  remoteTracks: any;
  isCameraOn: boolean;
  isMicOn: boolean;
  isRecordOn: boolean;
  isDesktopOn: boolean;
  isFullScreen: boolean;
  videoBlur: number;
  recordSession: any;
  virtualBackground: any;
  videoInput: any;
  audioInput: any;
  audioOutput: any;
  virtualBackkgroundSetting: Array<any>;
  videoInputSettings: Array<any>;
  audioInputSettings: Array<any>;
  audioOutputSettings: Array<any>;
  transcriptionsArray: Array<any>;
};

const initialState: InitialStateType = {
  isStarted: false,
  connection: null,
  room: null,
  participants: [],
  localTracks: [],
  remoteTracks: {},
  isCameraOn: false,
  isMicOn: false,
  isRecordOn: false,
  isDesktopOn: false,
  isFullScreen: false,
  videoBlur: 0,
  recordSession: null,
  virtualBackground: '',
  videoInput: null,
  audioInput: null,
  audioOutput: null,
  virtualBackkgroundSetting: [
    { name: 'None', url: '' },
    { name: 'Beach', url: 'background-1.jpg' },
    { name: 'White neutral wall', url: 'background-2.jpg' },
    { name: 'White empty room', url: 'background-3.jpg' },
    { name: 'Black floor lamp', url: 'background-4.jpg' },
    { name: 'Mountain', url: 'background-5.jpg' },
    { name: 'MountainForest ', url: 'background-6.jpg' },
    { name: 'Sunrise ', url: 'background-7.jpg' },
  ],
  videoInputSettings: [],
  audioInputSettings: [],
  audioOutputSettings: [],
  transcriptionsArray: [],
};

const reducer = (state: InitialStateType = initialState, action: Action): InitialStateType => {
  switch (action.type) {
    case START_MEETING_SUCCESS:
      return { ...state, isStarted: true };
    case END_MEETING_SUCCESS:
      return { ...state, isStarted: false };
    case CONNECTION_ESTABLISHED:
      return { ...state, connection: action.payload };
    case CONFERENCE_JOINED:
      return { ...state, room: action.payload };
    case LOCAL_TRACK_UPDATE:
      const localTracks = _updatedLocalTracks(state, action);
      return { ...state, localTracks: localTracks };
    case USER_JOINED:
      return { ...state, participants: action.payload };
    case SET_PARTICIPANTS:
      return { ...state, participants: action.payload };
    case TRACK_ADDED:
      return { ...state, remoteTracks: Object.assign(state.remoteTracks, { ...action.payload }) };
    case TRACK_REMOVED:
      return { ...state, remoteTracks: Object.assign(state.remoteTracks, { ...action.payload }) };
    case TURN_CAMERA:
      return { ...state, isCameraOn: action.payload };
    case TURN_MIC:
      return { ...state, isMicOn: action.payload };
    case TURN_RECORD:
      return { ...state, isRecordOn: action.payload };
    case TURN_DESKTOP:
      return { ...state, isDesktopOn: action.payload };
    case START_RECORDING_SUCCESS:
      return { ...state, recordSession: action.payload };
    case STOP_RECORDING_SUCCESS:
      return { ...state, recordSession: null };
    case CHANGE_FULL_SCREEN:
      return { ...state, isFullScreen: action.payload };
    case CHANGE_VIDEO_BLUR:
      return { ...state, videoBlur: action.payload.blurVlaue };
    case VIRTUAL_BACKGROUND_UPDATE:
      return { ...state, virtualBackground: action.payload };
    case VIDEO_INPUT_SETTINGS_UPDATE:
      return { ...state, videoInputSettings: action.payload };
    case AUDIO_INPUT_SETTINGS_UPDATE:
      return { ...state, audioInputSettings: action.payload };
    case AUDIO_OUTPUT_SETTINGS_UPDATE:
      return { ...state, audioOutputSettings: action.payload };
    case AUDIO_INPUT_UPDATE:
      return { ...state, audioInput: action.payload };
    case AUDIO_OUTPUT_UPDATE:
      return { ...state, audioOutput: action.payload };
    case VIDEO_INPUT_UPDATE:
      return { ...state, videoInput: action.payload };
    case TRANSCRIPTION_RECEIVED:
      return {
        ...state,
        transcriptionsArray: Object.assign(state.transcriptionsArray, {
          ...action.payload,
        }),
      };
    case SET_TRANSCRIPTIONS:
      return {
        ...state,
        transcriptionsArray: action.payload,
      };
    default:
      return state;
  }
};

const _updatedLocalTracks = (
  state: InitialStateType,
  action: ReturnType<typeof localTrackUpdate>,
) => {
  try {
    if (action.payload.length === 0) {
      return [];
    }
    const oldLocalTracks = [...state.localTracks];
    const addedLocalTracks = [...action.payload];
    for (let i = 0; i < addedLocalTracks.length; i++) {
      const sameTypeTrack = oldLocalTracks.find(
        (ot) => ot.disposed || ot.getType() === addedLocalTracks[i].getType(),
      );
      if (sameTypeTrack) {
        _.remove(oldLocalTracks, sameTypeTrack);
      }
      if (!addedLocalTracks[i].disposed) {
        oldLocalTracks.push(addedLocalTracks[i]);
      }
    }
    return oldLocalTracks;
  } catch (err) {
    return state.localTracks;
  }
};

export default reducer;
