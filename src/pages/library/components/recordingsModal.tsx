import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { fetchRecordingsByPayloadRequest } from '../../../store/recordings/actions';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../store';
import { useHistory } from 'react-router-dom';

//TODO do something with inline styles here

export default function RecordingsModal(props: any) {
  const history = useHistory();
  const { closeModal, modalParams } = props;
  const dispatch = useDispatch();
  const recordings = useSelector((state: RootState) => state.recordings.recordingsList);
  const transcriptions = useSelector((state: RootState) => state.recordings.transcriptions);
  const meetingDetails = modalParams?.row;
  const [over, setOver] = useState(-1);

  useEffect(() => {
    dispatch(fetchRecordingsByPayloadRequest({ meeting_id: meetingDetails.meeting_id }));
  }, []);

  const handleClick = (recording: any, meetingDetails: any) => {
    history.push('/recording', {
      recording: recording,
      meetingDetails: meetingDetails,
      transcriptions: transcriptions,
    });
    closeModal();
  };

  const handleCloseModal = async () => {
    closeModal();
  };

  const calculateAverageAttention = () => {
    const imprArr = recordings.map((re: any) => +re.attentionLvl);
    const res = imprArr.reduce((a: any, b: any) => a + b) / recordings.length;
    if (!isNaN(res)) {
      return res;
    } else {
      return 'no data';
    }
  };

  return (
    <>
      <div className="modal-content" style={{ width: '120%', height: '140%' }}>
        <div className="modal-header">
          <h4 className="modal-title">
            <strong>
              {recordings.length === 0
                ? 'No records'
                : `Recordings list ${moment(recordings[0]?.created_at).format(
                    'll',
                  )} average attention: ${calculateAverageAttention()}`}
            </strong>
          </h4>
          <div
            className="modal-close-icon"
            onClick={handleCloseModal}
            onKeyDown={handleCloseModal}
            aria-hidden="true"
          >
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">
          {recordings.map((recording: any, index: any) => {
            return (
              <div
                aria-hidden="true"
                key={index}
                className="d-flex flex-column rounded-3 reclist pb-2"
                onClick={() => handleClick(recording, meetingDetails)}
                onKeyDown={() => handleClick(recording, meetingDetails)}
                style={{
                  textDecoration: 'none',
                  backgroundColor: over === index ? '#ff7f50' : '#3c3ce5',
                  width: '100%',
                  padding: 10,
                  marginBottom: 3,
                }}
                onMouseEnter={() => setOver(index)}
                onMouseLeave={() => setOver(-1)}
              >
                <div className="d-flex align-items-center justify-content-between">
                  <text style={{ marginLeft: 5, color: '#fff' }}>
                    Started: {moment(recording.created_at).format('HH:MM')}
                  </text>
                  <text style={{ marginLeft: 5, color: '#fff' }}>
                    {' '}
                    Finished: {moment(recording.updated_at).format('HH:MM')}
                  </text>
                  <text style={{ marginLeft: 5, color: '#fff' }}>
                    {' '}
                    Attention: {recording.attentionLvl}
                  </text>
                  <text style={{ marginLeft: 5, color: '#fff' }}>
                    {' '}
                    Client: {meetingDetails.client}{' '}
                  </text>
                </div>
              </div>
            );
          })}
        </div>
        <div className="modal-footer">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={handleCloseModal}
          >
            Close
          </button>
        </div>
      </div>
    </>
  );
}
