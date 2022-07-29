/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactSelect from '../../../components/select/reactSelect';
import { RootState } from '../../../store';
import { audioOutputUpdate } from '../../../store/meeting/actions';

type IProps = {
  closeModal: any;
};

export default function AudioOutputModal({ closeModal }: IProps) {
  const dispatch = useDispatch();
  const [submitting, setSubmitting] = useState(false);
  const { audioOutput, audioOutputSettings } = useSelector((state: RootState) => state.meeting);
  const [_audioOutput, setAudioOutput] = useState(audioOutput);
  const [isPlay, setIsPlay] = useState(false);
  const audio = useRef<any>(null);

  useEffect(() => {
    handleAudioOutputSetting(_audioOutput);
  }, [_audioOutput]);

  const handleChange = (e: { label: string; value: string }) => {
    setAudioOutput(e.value);
  };

  const handleAudioOutputSetting = async (audioOutputId: string) => {
    if (audioOutputId) {
      if (audio.current) {
        await audio.current.setSinkId(audioOutputId);
      }
    }
  };

  const _options = (audioOutputSettings: Array<{ label: string; deviceId: string }>) =>
    audioOutputSettings.map((input) => ({ label: input.label, value: input.deviceId }));

  const _selectedOption = (deviceId: string) =>
    audioOutputSettings.find((input) => input.deviceId == deviceId);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    dispatch(audioOutputUpdate(_audioOutput));
    setSubmitting(false);

    if (audio.current) {
      audio.current.pause();
    }
    setIsPlay(false);
    closeModal();
  };

  const handlePlay = () => {
    if (!isPlay) {
      audio.current = new Audio('audio/call_test.mp3');
      audio.current.play();
    } else {
      audio.current.pause();
    }
    setIsPlay((prev) => !prev);
  };

  const handleCloseModal = async () => {
    if (audio.current) {
      audio.current.pause();
    }
    setIsPlay(false);
    closeModal();
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className="modal-title">
            <strong>Audio Output Setting</strong>
          </h4>
          <div className="modal-close-icon" onClick={handleCloseModal}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">
          <div className="row align-items-center justify-content-between">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <ReactSelect
                options={_options(audioOutputSettings)}
                value={_selectedOption(_audioOutput)}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-12 col-md-12 col-sm-12">
              <button
                type="button"
                className="btn btn-outline-primary mt-2"
                onClick={handlePlay}
                data-dismiss="modal"
              >
                <i className={`bi ${isPlay ? 'bi-pause' : 'bi-play'}`}></i>
              </button>
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
