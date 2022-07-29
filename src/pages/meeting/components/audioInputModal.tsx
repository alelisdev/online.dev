/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from '../../../components/select/reactSelect';
import { RootState } from '../../../store';
import { audioInputUpdate } from '../../../store/meeting/actions';
import { JitsiMeetJS } from '../../../store/meeting/saga';
import AudioIndicator from './audioIndicator';

type IProps = {
  closeModal: any;
};

type IAudioInputTrack = {
  disposed: boolean;
  dispose: () => Promise<any>;
  addEventListener: any;
};

export default function AudioInputModal({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { audioInput, audioInputSettings } = useSelector((state: RootState) => state.meeting);
  const [_audioInput, setAudioInput] = useState(audioInput);
  const [audioInputTrack, setAudioInputTrack] = useState<IAudioInputTrack | null>(null);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    handleAudioInputSetting(_audioInput);
  }, [_audioInput]);

  useEffect(() => {
    if (audioInputTrack && !audioInputTrack.disposed) {
      audioInputTrack.addEventListener(
        JitsiMeetJS.events.track.TRACK_AUDIO_LEVEL_CHANGED,
        (_audioLevel: number) => {
          setAudioLevel(_audioLevel);
        },
      );
    }
  }, [audioInputTrack]);

  const handleChange = (e: { label: string; value: string }) => {
    setAudioInput(e.value);
  };

  const handleAudioInputSetting = async (audioInputId: string) => {
    if (audioInputTrack && !audioInputTrack.disposed) {
      try {
        await audioInputTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    if (audioInputId) {
      const localTracks = await JitsiMeetJS.createLocalTracks({
        devices: ['audio'],
        micDeviceId: audioInputId,
      });
      if (localTracks.length > 0) {
        setAudioInputTrack(localTracks[0]);
      }
    }
  };

  const _options = (audioInputSettings: Array<{ label: string; deviceId: string }>) =>
    audioInputSettings.map((input) => ({ label: input.label, value: input.deviceId }));

  const _selectedOption = (deviceId: string) =>
    audioInputSettings.find((input) => input.deviceId == deviceId);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    if (audioInputTrack && !audioInputTrack.disposed) {
      try {
        await audioInputTrack.dispose();
      } catch (e) {
        console.info(e);
      }
    }
    dispatch(audioInputUpdate(_audioInput));
    setSubmitting(false);
    closeModal();
  };

  const handleCloseModal = async () => {
    if (audioInputTrack && !audioInputTrack.disposed) {
      try {
        await audioInputTrack.dispose();
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
            <strong>Audio Input Setting</strong>
          </h4>
          <div className="modal-close-icon" onClick={handleCloseModal}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ReactSelect
                options={_options(audioInputSettings)}
                value={_selectedOption(_audioInput)}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <AudioIndicator audioLevel={audioLevel} />
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
