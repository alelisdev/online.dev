export const START_MEETING = 'START_MEETING' as const;
export const START_MEETING_SUCCESS = 'START_MEETING_SUCCESS' as const;
export const END_MEETING = 'END_MEETING' as const;
export const END_MEETING_SUCCESS = 'END_MEETING_SUCCESS' as const;
export const CONNECTION_ESTABLISHED = 'CONNECTION_ESTABLISHED' as const;
export const CONFERENCE_JOINED = 'CONFERENCE_JOINED' as const;
export const USER_JOINED = 'USER_JOINED' as const;
export const USER_LEFT = 'USER_LEFT' as const;
export const TRACK_ADDED = 'TRACK_ADDED' as const;
export const TRACK_REMOVED = 'TRACK_REMOVED' as const;
export const SET_PARTICIPANTS = 'SET_PARTICIPANTS' as const;
export const LOCAL_TRACK_READY = 'LOCAL_TRACK_READY' as const;
export const TRACK_AUDIO_OUTPUT_CHANGED = 'TRACK_AUDIO_OUTPUT_CHANGED' as const;
export const LOCAL_TRACK_UPDATE = 'LOCAL_TRACK_UPDATE' as const;
export const LOCAL_TRACK_STOPPED = 'LOCAL_TRACK_STOPPED' as const;
export const TURN_CAMERA = 'TURN_CAMERA' as const;
export const TURN_MIC = 'TURN_MIC' as const;
export const TURN_RECORD = 'TURN_RECORD' as const;
export const TURN_DESKTOP = 'TURN_DESKTOP' as const;
export const START_RECORDING_SUCCESS = 'START_RECORDING_SUCCESS' as const;
export const STOP_RECORDING_SUCCESS = 'STOP_RECORDING_SUCCESS' as const;
export const CHANGE_FULL_SCREEN = 'CHANGE_FULL_SCREEN' as const;

export const SSD_MOBILENETV1 = 'ssd_mobilenetv1' as const;
export const TINY_FACE_DETECTOR = 'tiny_face_detector' as const;
export const CHANGE_VIDEO_BLUR = 'CHANGE_VIDEO_BLUR' as const;

export const RECORD_STATE_CHANGED = 'RECORD_STATE_CHANGED' as const;
export const initOptions = {
  // The ID of the jidesha extension for Chrome.
  desktopSharingChromeExtId: 'mbocklcggfhnbahlnepmldehdhpjfcjp',

  // Whether desktop sharing should be disabled on Chrome.
  desktopSharingChromeDisabled: false,

  // The media sources to use when using screen sharing with the Chrome
  // extension.
  desktopSharingChromeSources: ['screen', 'window'],

  // Required version of Chrome extension
  desktopSharingChromeMinExtVersion: '0.1',

  // Whether desktop sharing should be disabled on Firefox.
  desktopSharingFirefoxDisabled: false,
  enableAnalyticsLogging: true,

  disableSimulcast: false,
  resolution: 720,

  constraints: {
    video: {
      aspectRatio: 16 / 9,
      height: {
        ideal: 1080,
        max: 2160,
        min: 240,
      },
    },
  },
  disableAP: true,
  disableAEC: true,
  disableNS: true,
  disableAGC: true,
  disableHPF: true,
  stereo: true,
  disableAudioLevels: false,
};

export const options = {
  hosts: {
    domain: process.env.REACT_APP_DOMAIN,
    muc: process.env.REACT_APP_MUC, // FIXME: use XEP-0030
  },
  serviceUrl: process.env.REACT_APP_SERVICE_URL, // FIXME: use xep-0156 for that

  // The name of client node advertised in XEP-0115 'c' stanza
  clientNode: process.env.REACT_APP_CLIENT_NODE,
  channelLastN: -1,
};

export const confOptions = {
  statisticsId: null,
  p2p: {
    enabled: false,
  },
};
/**
 * An enumeration of the different virtual background types.
 *
 * @enum {string}
 */
export const VIRTUAL_BACKGROUND_TYPE = {
  IMAGE: 'image',
  DESKTOP_SHARE: 'desktop-share',
  BLUR: 'blur',
  NONE: 'none',
};

export const MEDIA_DEVICE_REQUEST = 'MEDIA_DEVICE_REQUEST' as const;
export const VIRTUAL_BACKGROUND_UPDATE = 'VIRTUAL_BACKGROUND_UPDATE' as const;
export const VIDEO_INPUT_UPDATE = 'VIDEO_INPUT_UPDATE' as const;
export const AUDIO_INPUT_UPDATE = 'AUDIO_INPUT_UPDATE' as const;
export const AUDIO_OUTPUT_UPDATE = 'AUDIO_OUTPUT_UPDATE' as const;
export const VIDEO_INPUT_SETTINGS_UPDATE = 'VIDEO_INPUT_SETTINGS_UPDATE' as const;
export const AUDIO_INPUT_SETTINGS_UPDATE = 'AUDIO_INPUT_SETTINGS_UPDATE' as const;
export const AUDIO_OUTPUT_SETTINGS_UPDATE = 'AUDIO_OUTPUT_SETTINGS_UPDATE' as const;

export const TRANSCRIPTION_RECEIVED = 'TRANSCRIPTION_RECEIVED' as const;
export const SET_TRANSCRIPTIONS = 'SET_TRANSCRIPTIONS' as const;
