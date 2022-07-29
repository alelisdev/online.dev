import React, { useContext } from 'react';
import UserLayout from '../../components/layout/user';
import { useLocation } from 'react-router-dom';
import VideoColumn from './components/videoColumn';
import NoteColumn from './components/noteColumn';
import { ThemeContext } from '../../themeProvider';

//TODO fetch one single recording with generated url for it

export default function Recording() {
  const { state } = useLocation();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore

  const { recording, meetingDetails, transcriptions } = state;

  const { theme } = useContext(ThemeContext);
  return (
    <>
      <UserLayout>
        <div className="row analysis-page pb-2">
          <h4 className={`modal-title ${theme === 'Light' ? null : 'text-light'} pb-2`}>
            <strong className="p-4 ps-0">
              Recordings user: {meetingDetails?.user.username} meeting:{' '}
              {meetingDetails?.meeting.title}
            </strong>
          </h4>
          <div className="col-md-7 col-lg-8 col-xl-9">
            <VideoColumn recording={recording} />
          </div>
          <div className="col-md-5 col-lg-4 col-xl-3 pt-3 pt-md-0">
            <NoteColumn
              meetingDetails={meetingDetails}
              recording={recording}
              transcriptions={transcriptions}
            />
          </div>
        </div>
      </UserLayout>
    </>
  );
}
