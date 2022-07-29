/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from '../../../components/select/reactSelect';
import Video from '../../../components/videoPlace';
import { RootState } from '../../../store';
import { videoInputUpdate } from '../../../store/meeting/actions';
import { JitsiMeetJS } from '../../../store/meeting/saga';

type IProps = {
  closeModal: any;
};

type IVideoTrack = {
  disposed: boolean;
  dispose: () => Promise<any>;
};

export default function VideoModal({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { videoInput, videoInputSettings } = useSelector((state: RootState) => state.meeting);
  const [_videoInput, setVideoInput] = useState(videoInput);
  const [videoTrack, setVideoTrack] = useState<IVideoTrack | null>(null);

  useEffect(() => {
    handleVideoSetting(_videoInput);
  }, [_videoInput]);

  const handleChange = (e: { label: string; value: string }) => {
    setVideoInput(e.value);
  };

  const handleVideoSetting = async (videoId: string) => {
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    if (videoId) {
      const localTracks = await JitsiMeetJS.createLocalTracks({
        devices: ['video'],
        cameraDeviceId: videoId,
      });
      if (localTracks.length > 0) {
        setVideoTrack(localTracks[0]);
      }
    }
  };

  const _options = (videoInputSettings: Array<{ label: string; deviceId: string }>) =>
    videoInputSettings.map((input) => ({ label: input.label, value: input.deviceId }));

  const _selectedOption = (deviceId: string) =>
    videoInputSettings.find((input) => input.deviceId == deviceId);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    dispatch(videoInputUpdate(_videoInput));
    setSubmitting(false);
    closeModal();
  };

  const handleCloseModal = async () => {
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    closeModal();
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className="modal-title">
            <strong>Video Setting</strong>
          </h4>
          <div className="modal-close-icon" onClick={handleCloseModal}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-start">
              <div className="video-setting-wrapper">
                {videoTrack && (
                  <Video
                    id={`videoTrack-video`}
                    videoTrack={{ jitsiTrack: videoTrack }}
                    className="main-video__video_place position-absolute w-100 h-100 rounded-3"
                  />
                )}
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-start">
              <ReactSelect
                options={_options(videoInputSettings)}
                value={_selectedOption(_videoInput)}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button type="submit" className="btn btn-danger" data-dismiss="modal">
            Save
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}
