/** eslint-ignore */
import React, { useContext, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import { useDispatch, useSelector } from 'react-redux';
import AudioPlace from '../../../components/audioPlace';
import Video from '../../../components/videoPlace';
import { RootState } from '../../../store';
import { SSD_MOBILENETV1, TINY_FACE_DETECTOR } from '../../../store/meeting/constants';
import NoteColumn from './noteColumn';
import { turnCamera, turnDesktop, turnMic, turnRecord } from '../../../store/meeting/actions';
import { calculateAttention, setFrameColour } from '../../../utils/attention';
import Check from '../../../components/check';
import { ThemeContext } from '../../../themeProvider';
import colours from '../../../scss/badcss.module.scss';

//TODO refactor here, delete unused code, split on different components

export const ReactionTips = ({ detailsData }: any) => {
  const expressions = detailsData?.expressions;
  const keys = Object.keys(expressions);
  const sorted = keys.sort(function (a, b) {
    return expressions[b] - expressions[a];
  });
  const behaves = sorted.slice(0, 2);

  const { theme } = useContext(ThemeContext);

  return (
    <div
      className="d-flex w-100 align-items-center justify-content-center"
      style={{
        height: 52,
      }}
    >
      {(() => {
        if (behaves.length === 0) {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-50 align-items-center justify-content-center"
            >
              {''}
            </div>
          );
        } else if (behaves[0] === 'happy' && calculateAttention(50, behaves) > 70) {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-25 align-items-center justify-content-center"
            >
              <Check />{' '}
            </div>
          );
        } else if (behaves[0].includes('surprised') && calculateAttention(50, behaves) > 70) {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-25 align-items-center justify-content-center"
            >
              <Check />{' '}
            </div>
          );
        } else if (behaves[0] === 'fearful') {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-75 align-items-center justify-content-center"
            >
              <h4
                className="w-50"
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor:
                    theme === 'Light'
                      ? colours.light_primary_dark_input
                      : colours.primary_dark_input,
                  textAlign: 'center',
                }}
              >
                Stop scaring a doctor
              </h4>
            </div>
          );
        } else if (behaves[0] === 'sad') {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-75 align-items-center justify-content-center"
            >
              <h4
                className="w-50"
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor:
                    theme === 'Light'
                      ? colours.light_primary_dark_input
                      : colours.primary_dark_input,
                  textAlign: 'center',
                }}
              >
                Get Doctor`s attention
              </h4>
            </div>
          );
        } else if (behaves[0] === 'angry') {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-75 align-items-center justify-content-center"
            >
              <h4
                className="w-50"
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor:
                    theme === 'Light'
                      ? colours.light_primary_dark_input
                      : colours.primary_dark_input,
                  textAlign: 'center',
                }}
              >
                Change vector
              </h4>
            </div>
          );
        } else if (behaves[1] === 'angry') {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-75 align-items-center justify-content-center"
            >
              <h4
                className="w-50"
                style={{
                  padding: 10,
                  borderRadius: 20,
                  backgroundColor:
                    theme === 'Light'
                      ? colours.light_primary_dark_input
                      : colours.primary_dark_input,
                  textAlign: 'center',
                }}
              >
                Try a more engaging topic
              </h4>
            </div>
          );
        } else if (behaves[1] === 'sad' && calculateAttention(50, behaves) < 50) {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-25 align-items-center justify-content-center"
            >
              {''}
            </div>
          );
        } else {
          return (
            <div
              style={{
                alignSelf: 'center',
                paddingBottom: 20,
              }}
              className=" d-flex w-50 align-items-center justify-content-center"
            >
              {''}
            </div>
          );
        }
      })()}
    </div>
  );
};

export const Details = ({ detailsData }: any) => {
  const expressions = detailsData?.expressions;
  const keys = Object.keys(expressions);
  const sorted = keys.sort(function (a, b) {
    return expressions[b] - expressions[a];
  });
  const behaves = sorted.slice(0, 2);
  // behaves 'neutral' | 'happy' | 'sad' | 'angry' | 'fearful' | 'disgusted' | 'surprised'

  return (
    <div className="d-flex justify-content-evenly rounded-3 w-50">
      <div className="d-flex flex-column">
        {' '}
        <span>Debug info</span>
      </div>
      <div className="d-flex flex-column">
        {' '}
        <span>Attention</span>
        <span className="fs-5 d-flex mt-2 fw-bold p-2">{calculateAttention(50, behaves)}</span>
      </div>
      <div className="d-flex flex-column">
        <span>Emotional indicator </span>{' '}
        {behaves.map((mood, index) => {
          return (
            <span key={index} className="fs-5 d-flex mt-2 fw-bold">
              Level {index + 1} {mood}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const CallInfo = ({ participant, detailsData }: any) => {
  const dispatch = useDispatch();
  const meetingState = useSelector((state: RootState) => state.meeting);
  const cameraOn = meetingState.isCameraOn;
  const micOn = meetingState.isMicOn;
  const desktopOn = meetingState.isDesktopOn;
  const recordOn = meetingState.isRecordOn;

  const { theme } = useContext(ThemeContext);

  const onCameraClick = (e: any) => {
    if (e.type === 'click') dispatch(turnCamera(!cameraOn));
  };

  const onMicClick = (e: any) => {
    if (e.type === 'click') dispatch(turnMic(!micOn));
  };

  const onRecordClick = (e: any) => {
    if (e.type === 'click') dispatch(turnRecord(!recordOn));
  };

  const onDesktopClick = (e: any) => {
    if (e.type === 'click') dispatch(turnDesktop(!desktopOn));
  };

  const icons = [
    {
      className: `icon ${cameraOn ? 'bi-camera-video' : 'bi-camera-video-off'} fs-4`,
      onClick: onCameraClick,
    },
    { className: `icon ${micOn ? 'bi-mic' : 'bi-mic-mute'} fs-4`, onClick: onMicClick },
    {
      className: `icon bi-record-circle fs-4`,
      onClick: onRecordClick,
      isActive: recordOn,
    },
    {
      className: `icon ${desktopOn ? 'bi-laptop-fill' : 'bi-laptop'} fs-4`,
      onClick: onDesktopClick,
    },
  ];

  return (
    <div className={`main-video_call_info ${theme === 'Light' ? 'light-mode' : null} py-3 px-4`}>
      <div className="d-flex justify-content-between">
        <div>
          <p style={{ color: '#4a9cff' }}>Internist</p>
          <p className="fs-5 fw-bold">{participant ? participant.getDisplayName() : '--------'}</p>
        </div>
        <Details detailsData={detailsData}></Details>
      </div>

      <div className="row d-flex justify-content-end align-items-center">
        <div className="d-flex justify-content-between align-items-center" style={{ width: 300 }}>
          {icons.map(({ className, onClick, isActive }) => (
            <div
              key={className}
              role="button"
              tabIndex={0}
              onClick={onClick}
              onKeyDown={onClick}
              className="video_preview_btn_icons d-flex ms-2 align-items-center justify-content-center rounded-3 babich-button"
            >
              <i className={className} {...(isActive ? { style: { color: 'red' } } : {})} />
            </div>
          ))}
        </div>
        <NoteColumn hideNotepad />
      </div>
    </div>
  );
};

const VideoColumn = (props: any) => {
  const { participant, isOnlyVideo } = props;
  const [showCallInfo, setShowCallInfo] = useState(false);

  const [details, setDetails] = useState({ expressions: {} });
  const expressions = details.expressions;
  const keys = Object.keys(expressions);
  const sorted = keys.sort(function (a, b) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return expressions[b] - expressions[a];
  });
  const behaves = sorted.slice(0, 2);

  //useRef instead?
  useEffect(() => {
    const interval = setInterval(() => {
      const resp = JSON.parse(localStorage.getItem('result') as string);
      if (resp === null) {
        setDetails({ expressions: {} });
      } else {
        setDetails(resp);
        localStorage.removeItem('result');
      }
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setTimeout(() => setShowCallInfo(true), 500);
  }, []);

  const videoTrack = useSelector((state: RootState) => {
    localStorage.removeItem('result');
    const remoteTracks = state.meeting.remoteTracks;
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
  });

  const audioTrack = useSelector((state: RootState) => {
    const remoteTracks = state.meeting.remoteTracks;
    const keys = Object.keys(remoteTracks);
    const participantTracks = keys
      .map((k) => remoteTracks[k])
      .find((ts) => ts.find((t: any) => t.getType() === 'audio'));
    if (participantTracks) {
      return participantTracks.find((t: any) => {
        return t.getType() === 'audio';
      });
    } else {
      return null;
    }
  });

  useEffect(() => {
    const init = async () => {
      await changeFaceDetector();
      await faceapi.loadFaceExpressionModel('/static');
      // changeInputSize(224)
    };
    init();
  }, []);

  const onVideoPlaying = async () => {
    try {
      const options = getFaceDetectorOptions();
      const pId = videoTrack.getParticipantId();
      if (pId) {
        const videoEl = document.getElementById(`${pId}-video`) as HTMLVideoElement;
        if (videoEl) {
          const result = await faceapi.detectSingleFace(videoEl, options).withFaceExpressions();
          if (result && result.detection?.score > 0.8) {
            //result.expressions?.neutral < 0.9
            localStorage.setItem('result', JSON.stringify(result));
          }
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
        }
      }
      setTimeout(() => onVideoPlaying());
    } catch (e) {
      console.log(e);
    }
  };

  const getFaceDetectorOptions = () => {
    // ssd_mobilenetv1 options
    const minConfidence = 0.7;

    // tiny_face_detector options
    const inputSize = 512;
    const scoreThreshold = 0.7;

    const selectedFaceDetector = SSD_MOBILENETV1;
    return selectedFaceDetector === SSD_MOBILENETV1
      ? new faceapi.SsdMobilenetv1Options({ minConfidence })
      : new faceapi.TinyFaceDetectorOptions({ inputSize, scoreThreshold });
  };

  const getCurrentFaceDetectionNet = () => {
    const selectedFaceDetector = 'ssd_mobilenetv1';
    if (selectedFaceDetector === SSD_MOBILENETV1) {
      return faceapi.nets.ssdMobilenetv1;
    }
    if (selectedFaceDetector === TINY_FACE_DETECTOR) {
      return faceapi.nets.tinyFaceDetector;
    }
  };

  const changeFaceDetector = async () => {
    if (!isFaceDetectionModelLoaded()) {
      // @ts-expect-error check type
      await getCurrentFaceDetectionNet().load('/static');
    }
  };

  const isFaceDetectionModelLoaded = () => {
    // @ts-expect-error check type
    return !!getCurrentFaceDetectionNet().params;
  };

  return (
    <div className="h-100" style={{ position: 'relative' }}>
      <ReactionTips detailsData={details} />
      <div
        className="main-video position-relative rounded-3"
        style={{
          borderWidth: 3,
          borderStyle: 'solid',
          borderColor: setFrameColour(calculateAttention(50, behaves)),
        }}
      >
        {videoTrack && (
          <>
            <Video
              id={`${videoTrack.getParticipantId()}-video`}
              onVideoPlaying={onVideoPlaying}
              videoTrack={{ jitsiTrack: videoTrack }}
              className="main-video__video_place position-absolute w-100 h-100 rounded-3"
            />
            <canvas id={`${videoTrack.getParticipantId()}-canvas`} className="overlay" />
          </>
        )}
        {audioTrack && (
          <AudioPlace
            audioTrack={{ jitsiTrack: audioTrack }}
            participantId={audioTrack.getParticipantId()}
          />
        )}
      </div>
      {!isOnlyVideo && (
        <div className="mt-3 babich-call-info" style={{ left: showCallInfo ? 0 : '-200%' }}>
          <CallInfo participant={participant} detailsData={details} />
        </div>
      )}
    </div>
  );
};

export default VideoColumn;
