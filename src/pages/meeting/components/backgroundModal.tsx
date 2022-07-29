/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Video from '../../../components/videoPlace';
import { createVirtualBackgroundEffect } from '../../../components/virtual-background';
import { RootState } from '../../../store';
import { virtualBackgroundUpdate } from '../../../store/meeting/actions';
import { VIRTUAL_BACKGROUND_TYPE } from '../../../store/meeting/constants';
import { JitsiMeetJS } from '../../../store/meeting/saga';

type IProps = {
  closeModal: any;
};

type IVideoTrack = {
  disposed: boolean;
  dispose: () => Promise<any>;
  setEffect: (effect: any) => Promise<any>;
};

export default function BackgroundModal({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { videoInput, virtualBackground, virtualBackkgroundSetting } = useSelector(
    (state: RootState) => state.meeting,
  );
  const [_virtualBackground, setVirtualBackground] = useState(virtualBackground);
  const [videoTrack, setVideoTrack] = useState<IVideoTrack | null>(null);

  useEffect(() => {
    handleVirtualBackgroundSetting(_virtualBackground);
  }, [_virtualBackground]);

  const handleChange = (_vb: string) => {
    setVirtualBackground(_vb);
  };

  const handleVirtualBackgroundSetting = async (vb: string) => {
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.setEffect(undefined);
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }

    if (vb) {
      const [_videoTrack] = await JitsiMeetJS.createLocalTracks({
        devices: ['video'],
        cameraDeviceId: videoInput,
      });
      if (_videoTrack) {
        const virtualSource: any = document.getElementById(`vb-${vb}`);
        const virtualBackground = {
          backgroundType: VIRTUAL_BACKGROUND_TYPE.IMAGE,
          virtualSource: virtualSource.src,
        };
        const vbEffect = await createVirtualBackgroundEffect(virtualBackground);
        await _videoTrack.setEffect(vbEffect);
        setVideoTrack(_videoTrack);
      }
    } else {
      const [_videoTrack] = await JitsiMeetJS.createLocalTracks({
        devices: ['video'],
        cameraDeviceId: videoInput,
      });
      if (_videoTrack) {
        setVideoTrack(_videoTrack);
      }
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.setEffect(undefined);
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    dispatch(virtualBackgroundUpdate(_virtualBackground));
    setSubmitting(false);
    closeModal();
  };

  const handleCloseModal = async () => {
    if (videoTrack && !videoTrack.disposed) {
      try {
        await videoTrack.setEffect(undefined);
        await videoTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    closeModal();
  };

  const _selectedClass = (url: string, selected: string) => {
    if (url === selected) {
      return 'virtual-bg-image-option active';
    } else {
      return 'virtual-bg-image-option';
    }
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className="modal-title">
            <strong>Virtual backgrounds</strong>
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
            <div className="col-lg-6 col-md-12 col-sm-12 align-self-start virtual-bg-image-wrapper">
              {virtualBackkgroundSetting.map((vb, index) => (
                <div key={index} onClick={() => handleChange(vb.url)}>
                  {vb.name === 'None' ? (
                    <div className={_selectedClass(vb.url, _virtualBackground)}>
                      <div>{vb.name}</div>
                    </div>
                  ) : (
                    <img
                      alt={vb.name}
                      id={`vb-${vb.url}`}
                      src={`images/virtual-background/${vb.url}`}
                      className={_selectedClass(vb.url, _virtualBackground)}
                    />
                  )}
                </div>
              ))}
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
