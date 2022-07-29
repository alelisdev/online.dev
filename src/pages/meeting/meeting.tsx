import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/icons/logo';
import UserLayout from '../../components/layout/user';
import VideoPreview from '../../components/videoPreview';
import { RootState } from '../../store';
import { changeFullScreen, mediaDeviceRequest } from '../../store/meeting/actions';
import { fetchMeetingRequest } from '../../store/meetings/actions';
import NoteColumn from './components/noteColumn';
import VideoColumn, { Details } from './components/videoColumn';
import PreventTransitionPrompt from './components/preventTransitionPrompt';
import { openModal } from '../../store/app/actions';
import * as actions from '../../store/meeting/actions';

type props = {
  match: { params: { id: string } };
};

const Meeting = (props: props) => {
  const dispatch = useDispatch();
  const handle = useFullScreenHandle();
  const participants = useSelector((state: RootState) => state.meeting.participants);
  const [showColumn, setShowColumn] = useState(true);
  const { isFullScreen, isStarted } = useSelector((state: RootState) => state.meeting);
  const meetingState = useSelector((state: RootState) => state.meetings);
  const [isValidMeeting, setValidMeeting] = useState(false);
  const meeting_id = props.match.params.id;

  const handleFullScreen = (e: boolean) => {
    dispatch(changeFullScreen(e));
  };

  useEffect(() => {
    dispatch(mediaDeviceRequest());
  }, []);

  useEffect(() => {
    if (meeting_id) {
      dispatch(actions.setTranscriptions([]));
      dispatch(fetchMeetingRequest(meeting_id));
    }
  }, [meeting_id]);

  useEffect(() => {
    if (meetingState.meeting) {
      setValidMeeting(true);
    }
  }, [meetingState]);

  useEffect(() => {
    if (isFullScreen) {
      setTimeout(() => {
        handle.enter();
      }, 100);
    }
  }, [isFullScreen]);

  const handleOpenModal = (callback: any) => {
    dispatch(
      openModal({
        modal: 'PREVENT_MODAL',
        params: {},
      }),
    );
    callback();
  };

  return isValidMeeting ? (
    <>
      <UserLayout
        onChangeFullScreen={handleFullScreen}
        style={!isFullScreen ? { marginTop: -30 } : null}
      >
        <div className="row meeting-page pb-2">
          <div className="col-md-7 col-lg-8 col-xl-9">
            <VideoColumn
              participant={participants && participants.length > 0 ? participants[0] : null}
              isOnlyVideo={false}
            />
          </div>
          <div className="col-md-5 col-lg-4 col-xl-3 pt-5">
            <NoteColumn meeting_id={meeting_id} />
          </div>
        </div>
      </UserLayout>

      <FullScreen handle={handle} onChange={handleFullScreen}>
        {isFullScreen && (
          <div className="w-100 position-relative meeting-fullscreen">
            <div className="main-video">
              <VideoColumn
                participant={participants && participants.length > 0 ? participants[0] : null}
                isOnlyVideo={true}
              />
            </div>
            {/*TODO check this part*/}
            {showColumn ? (
              <div className="meeting-fullscreen_column p-5">
                <div className="d-flex">
                  <button className="btn btn-dark me-4" onClick={() => setShowColumn(!showColumn)}>
                    <i className="bi-x-lg icon text-light" />
                  </button>
                  <Logo size={40} />
                </div>
                <div className="mt-5 d-flex flex-column justify-content-between meeting-fullscreen_column_details">
                  <div className="d-flex align-items-center">
                    <div className="rounded-circle d-flex justify-content-center align-items-center me-2 main-video_details_button">
                      <i className="bi-camera-video-fill icon text-primary" />
                    </div>
                    <span className="me-3"> Client</span>
                    <h2 className="fw-bold mb-0 ps-2 border-start border-light">
                      {participants && participants.length > 0
                        ? participants[0].getDisplayName()
                        : null}
                    </h2>
                  </div>
                </div>
              </div>
            ) : (
              <div className="meeting-fullscreen_open_column">
                <button className="btn btn-dark" onClick={() => setShowColumn(!showColumn)}>
                  <i className="bi-list icon text-light fs-4" />
                </button>
              </div>
            )}
            <div className="meeting-fullscreen_video">
              <VideoPreview />
            </div>
            <div
              className={`meeting-fullscreen_notes ${
                showColumn ? '' : 'w-100'
              } d-flex justify-content-between`}
            >
              <div className="w-75">
                {/*Set or delete expressions here*/}
                <Details detailsData={{ expressions: {} }} />
              </div>
              <button
                className="btn btn-dark"
                onClick={() => {
                  handle.exit();
                  handleFullScreen(false);
                }}
              >
                <i className="bi-fullscreen-exit icon text-light fs-4" />
              </button>
            </div>
          </div>
        )}
        {/* @ts-expect-error check type */}
        <PreventTransitionPrompt openModal={handleOpenModal} when={isStarted} />
      </FullScreen>
    </>
  ) : (
    !meetingState.loading && meetingState.errors && (
      <UserLayout>
        <div className="justify-content-center text-light position-relative">
          {meetingState.errors}
        </div>
      </UserLayout>
    )
  );
};

export default Meeting;
