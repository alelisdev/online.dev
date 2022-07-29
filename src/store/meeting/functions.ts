import _ from 'lodash';
import { createPresenterEffect } from '../../components/presenter';
import { JitsiMeetJS } from './saga';

export const onRemoteTrack = (state: any, track: any) => {
  if (track.isLocal()) {
    return null;
  }
  const participantId = track.getParticipantId();
  if (!state.remoteTracks[participantId]) {
    state.remoteTracks[participantId] = [track];
  } else {
    for (let i = 0; i < state.remoteTracks[participantId].length; i++) {
      const _track = state.remoteTracks[participantId][i];
      if (_track.getType() === track.getType()) {
        _.remove(state.remoteTracks[participantId], state.remoteTracks[participantId][i]);
        break;
      }
    }
    state.remoteTracks[participantId].push(track);
  }
  const participantTrack = {};
  // @ts-expect-error check index type
  participantTrack[participantId] = state.remoteTracks[participantId];
  return participantTrack;
};

export const onTrackRemoved = (state: any, track: any) => {
  if (track.isLocal()) {
    return null;
  }
  const participantId = track.getParticipantId();
  if (state.remoteTracks[participantId]) {
    for (let i = 0; i < state.remoteTracks[participantId].length; i++) {
      const _track = state.remoteTracks[participantId][i];
      if (_track.getType() === track.getType()) {
        _.remove(state.remoteTracks[participantId], state.remoteTracks[participantId][i]);
        break;
      }
    }
  }
  const participantTrack = {};
  // @ts-expect-error check index type
  participantTrack[participantId] = state.remoteTracks[participantId];
  return participantTrack;
};

export const getRemoteVideoTrack = (remoteTracks: any) => {
  const keys = Object.keys(remoteTracks);
  const participantTracks = keys
    .map((k) => remoteTracks[k])
    .find((ts) => ts.find((t: any) => t.getType() === 'video'));
  if (participantTracks) {
    return participantTracks.find((t: any) => {
      return t.getType() === 'video';
    });
  } else {
    return null;
  }
};

export async function mutePresenterVideo(localTrack: any, cameraDeviceId: any) {
  const height = localTrack.track.getSettings().height;
  const effect = await _createPresenterStreamEffect(height, cameraDeviceId);
  return effect;
}

async function _createPresenterStreamEffect(height: number, cameraDeviceId = null) {
  const localPresenterVideo = await _createLocalPresenterTrack({ cameraDeviceId }, height);
  const effect = await createPresenterEffect(localPresenterVideo.stream);
  return effect;
}

async function _createLocalPresenterTrack(options: { cameraDeviceId: any }, desktopHeight: number) {
  const { cameraDeviceId } = options;
  const cameraHeights = [180, 270, 360, 540, 720, 1080, 2160];
  const proportion = 5;
  const result = cameraHeights.find((height) => desktopHeight / proportion <= height);
  const constraints = {
    video: {
      aspectRatio: 16 / 9,
      height: {
        ideal: result,
      },
    },
  };
  const [videoTrack] = await JitsiMeetJS.createLocalTracks({
    cameraDeviceId,
    constraints,
    devices: ['video'],
  });
  return videoTrack;
}

export const onReceivedTranscription = (state: any, transcription: any) => {
  return state.transcriptionsArray.push(transcription);
};

//TODO receive this from adminpanel, improve logics here
export const processTranscription = (transcriptionObj: any, preset: any) => {
  const transcript = transcriptionObj.transcription;
  const hugeArr = [];
  for (const [key, value] of Object.entries(preset)) {
    if (key.toLowerCase().includes('keywords')) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hugeArr.push(...value.toLowerCase().split(','));
    }
    console.log('arr', hugeArr);
    if (
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      hugeArr.some((el: any) => transcript.toLowerCase().includes(el))
    ) {
      transcriptionObj.isTalkingPoint = true;
    }
  }
  return transcriptionObj;
};
