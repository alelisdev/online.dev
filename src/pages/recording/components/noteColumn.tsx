import React, { useContext } from 'react';
import RecordingsNotepad from './recordingsNotepad';
import moment from 'moment';
import { ThemeContext } from '../../../themeProvider';

const NoteColumn = ({ meetingDetails, recording, transcriptions }: any) => {
  const talkingPoints = transcriptions;

  const { theme } = useContext(ThemeContext);

  return (
    <div className="note-column">
      <div
        className={`d-flex flex-column justify-content-evenly rounded-3 call-detail ${
          theme === 'Light' ? 'light-mode' : null
        }`}
      >
        <h5 className={`${theme === 'Light' ? null : 'text-light '}call-detail-title`}>
          <strong>Call details</strong>
        </h5>
        <div className="row justify-content-between rounded-3 pb-1">
          <div className="col">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className="call-detail-label">Client Name:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">{meetingDetails.client}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="call-detail-label">Attention level:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">{recording.attentionLvl}</span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="call-detail-label">Status:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">First Call</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="col">
            <table>
              <tbody>
                <tr>
                  <td>
                    <span className="call-detail-label">Date:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">
                      {moment(meetingDetails.started_at).format('ll')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="call-detail-label">Call started:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">
                      {moment(meetingDetails.started_at).format('HH:MM')}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>
                    <span className="call-detail-label">Call ended:</span>
                  </td>
                  <td>
                    <span className="call-detail-value">
                      {moment(meetingDetails.ended_at).format('HH:MM')}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-4 babich-sidebar" style={{ right: 0 }}>
        <RecordingsNotepad meetingDetails={meetingDetails} talkingPoints={talkingPoints} />
      </div>
    </div>
  );
};

export default NoteColumn;
