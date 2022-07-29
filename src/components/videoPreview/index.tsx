/** eslint-disable */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { turnCamera, turnDesktop, turnMic, turnRecord } from '../../store/meeting/actions';
import Video from '../videoPlace';

type VideoProps = {
  source?: any;
  username?: string;
  hideUser?: boolean;
  showGrid?: boolean;
  showRecordButton?: boolean;
  showTraining?: boolean;
  isHome?: boolean;
};

const VideoPreview = ({
  showGrid = false,
  hideUser = false,
  showTraining = false,
  isHome = true,
}: VideoProps) => {
  const dispatch = useDispatch();
  const meetingState = useSelector((state: RootState) => state.meeting);
  const currentUser = useSelector((state: RootState) => state.app.currentUser);
  const cameraOn = meetingState.isCameraOn;
  const micOn = meetingState.isMicOn;
  const desktopOn = meetingState.isDesktopOn;
  const recordOn = meetingState.isRecordOn;

  const videoTrack = meetingState.localTracks.find((t) => t.getType() === 'video');
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

  return (
    <div className="position-relative video_preview">
      {videoTrack && (
        <Video
          videoTrack={{ jitsiTrack: videoTrack }}
          className="video_preview__video_place position-absolute"
        />
      )}
      {isHome && (
        <>
          {showGrid && <div className="video_preview__grid" />}
          {!hideUser && (
            <div className="video_preview_user d-flex align-items-center justify-content-center rounded-3 px-3">
              <span>{currentUser?.username}</span>{' '}
              <div className="video_preview_user_record rounded-circle ms-2" />
            </div>
          )}
          {showTraining && (
            <div className="video_preview_training d-flex align-items-center justify-content-center py-2 px-3">
              <span className="fs-4">Training</span>
            </div>
          )}
          <div className="video_preview_btn_grid d-flex">
            <div
              role="button"
              tabIndex={0}
              onClick={onRecordClick}
              onKeyDown={onRecordClick}
              className={`video_preview_btn_icons d-flex align-items-center justify-content-center me-2 rounded-3 ${
                recordOn && 'selected'
              }`}
            >
              <i className="icon bi-record-circle fs-4" />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={onMicClick}
              onKeyDown={onMicClick}
              className={`video_preview_btn_icons d-flex me-2 align-items-center justify-content-center rounded-3 ${
                micOn && 'selected'
              }`}
            >
              <i className={`icon ${micOn ? 'bi-mic' : 'bi-mic-mute'} fs-4`} />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={onCameraClick}
              onKeyDown={onCameraClick}
              className={`video_preview_btn_icons d-flex align-items-center justify-content-center rounded-3  ${
                cameraOn && 'selected'
              }`}
            >
              <i className={`icon ${cameraOn ? 'bi-camera-video' : 'bi-camera-video-off'} fs-4`} />
            </div>
            <div
              role="button"
              tabIndex={0}
              onClick={onDesktopClick}
              onKeyDown={onDesktopClick}
              className={`video_preview_btn_icons d-flex ms-2 align-items-center justify-content-center rounded-3  ${
                desktopOn && 'selected'
              }`}
            >
              <i className={`icon ${desktopOn ? 'bi-laptop-fill' : 'bi-laptop'} fs-4`} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default VideoPreview;
