import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactTooltip from 'react-tooltip';
import Notepad from '../../../components/notepad';
import OutsideAlerter from '../../../components/outsideAlerter';
import VideoPreview from '../../../components/videoPreview';
import { RootState } from '../../../store';
import { openModal } from '../../../store/app/actions';
import { endMeeting, startMeeting } from '../../../store/meeting/actions';
import { fetchMeetingsByPayloadRequest } from '../../../store/meetings/actions';
import { Meeting } from '../../../types/meeting';

type IProps = {
  value: any;
  style?: any;
  isShare?: boolean;
};
const ORIGINAL = 'Copy meeting link';
const COPIED = 'Link is copied';
export const CopyButton = ({ value, style, isShare }: IProps) => {
  const [tContent, setTContent] = useState(false);
  return (
    <>
      {!isShare ? (
        <>
          <button
            className={`btn ${
              tContent ? 'btn-outline-success' : 'btn-outline-primary'
            } btn-lg mt-4 ms-2 align-items-center justify-content-center rounded-3 text-light fs-6`}
            data-tip
            onClick={() => {
              navigator.clipboard.writeText(`${location.origin}/call/${value}`);
              setTContent(true);
            }}
            data-for="overTime"
            style={style}
          >
            {tContent ? 'Copied' : 'Copy'}
          </button>
          <ReactTooltip
            id="overTime"
            place="top"
            type="dark"
            effect="solid"
            getContent={[
              () => {
                if (tContent) {
                  setTimeout(() => {
                    setTContent(false);
                  }, 2000);
                }
                return tContent ? COPIED : ORIGINAL;
              },
              2000,
            ]}
          />
        </>
      ) : (
        <>
          <button
            className={`btn ${
              tContent ? 'btn-outline-success' : 'btn-outline-primary-dark'
            } btn-lg mt-1 ms-2 align-items-center justify-content-center rounded-10  fs-6`}
            data-tip
            onClick={() => {
              navigator.clipboard.writeText(`${location.origin}/call/${value}`);
              setTContent(true);
            }}
            data-for="overTime"
          >
            <i className="bi-share icon fs-3"></i>
          </button>
          <ReactTooltip
            id="overTime"
            place="top"
            type="dark"
            effect="solid"
            getContent={[
              () => {
                if (tContent) {
                  setTimeout(() => {
                    setTContent(false);
                  }, 2000);
                }
                return tContent ? COPIED : ORIGINAL;
              },
              2000,
            ]}
          />
        </>
      )}
    </>
  );
};

const NoteColumn = ({ hideNotepad, meeting_id }: any) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const [isSettingMenu, setIsSettingMenu] = useState(false);
  const isStarted = useSelector((state: RootState) => state.meeting.isStarted);
  const meeting = useSelector((state: RootState) => state.meetings.meeting);
  const resMeeting = useSelector((state: RootState) => state.meetings);
  const [events, setEvents] = useState<Meeting[]>([]);

  useEffect(() => {
    dispatch(fetchMeetingsByPayloadRequest({}));
    setTimeout(() => {
      setShowSidebar(true);
    }, 500);
  }, []);

  useEffect(() => {
    setLoading(false);
    return () => {
      setLoading(false);
    };
  }, [isStarted]);

  useEffect(() => {
    if (resMeeting.meetingList) {
      const meetingList: Meeting[] = [];

      for (let i = 0; i < resMeeting.meetingList.length; i++) {
        const item = resMeeting.meetingList[i];
        const payload = {
          id: item.id,
          title: item.title,
          description: item.description,
          start: new Date(item?.start),
          end: new Date(item.end),
          teamId: item.teamId,
          salesRepId: item.salesRepId,
        };

        meetingList.push(payload);
      }

      setEvents(meetingList);
    }
  }, [resMeeting.meetingList]);

  const handleMeetingBtn = () => {
    setLoading(true);
    if (isStarted) dispatch(endMeeting());
    else dispatch(startMeeting());
  };

  const handleSettingBtn = () => {
    setIsSettingMenu(true);
  };

  const handleSettingModal = (e: any, slug: string) => {
    e.preventDefault();
    let params = {};
    if (slug === 'SELECT_BACKGROUND') {
      params = {
        classes: 'virtual-modal-container',
      };
    }
    dispatch(
      openModal({
        modal: slug,
        params,
      }),
    );
  };

  return (
    <div
      className={`note-column`}
      {...(hideNotepad ? { style: { width: 350, marginLeft: 30, marginTop: -24 } } : {})}
    >
      {!hideNotepad && (
        <div className="note-column_preview">
          <VideoPreview isHome={false} />
        </div>
      )}
      {hideNotepad && (
        <div className="d-flex justify-content-end">
          <button
            onClick={handleMeetingBtn}
            className={`btn btn-${
              isStarted ? 'danger' : 'primary'
            } btn-lg mt-4 align-items-center justify-content-center rounded-3`}
            disabled={loading}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm text-light"
                role="status"
                aria-hidden="true"
              ></span>
            ) : (
              <i
                className={`${isStarted ? 'bi-telephone-minus' : 'bi-telephone'} icon text-light`}
              />
            )}
            <span className="text-light fs-6 ps-2">
              {isStarted ? 'End Meeting' : 'Start Meeting'}
            </span>
          </button>
          {meeting?.id && <CopyButton value={meeting.id} />}

          <div className="position-relative setting-menu">
            <button
              id="btnGroupDrop1"
              className="btn btn-outline-primary btn-lg mt-4 ms-2 align-items-center justify-content-center rounded-3 dropdown-toggle"
              onClick={handleSettingBtn}
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i className="bi bi-gear icon text-light" />
            </button>
            {isSettingMenu && (
              <OutsideAlerter onClickOutside={() => setIsSettingMenu(false)}>
                <ul
                  className={`dropdown-menu ${isSettingMenu && 'd-block'}`}
                  aria-labelledby="btnGroupDrop1"
                >
                  <li>
                    <a
                      className="dropdown-item"
                      href="#1"
                      onClick={(e) => handleSettingModal(e, 'VIDEO_SETTING')}
                    >
                      Video Input
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#2"
                      onClick={(e) => handleSettingModal(e, 'AUDIO_INPUT_SETTING')}
                    >
                      Audio Input
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#3"
                      onClick={(e) => handleSettingModal(e, 'AUDIO_OUTPUT_SETTING')}
                    >
                      Audio Output
                    </a>
                  </li>
                  <li>
                    <a
                      className="dropdown-item"
                      href="#select-background"
                      onClick={(e) => handleSettingModal(e, 'SELECT_BACKGROUND')}
                    >
                      Select Background
                    </a>
                  </li>
                </ul>
              </OutsideAlerter>
            )}
          </div>
        </div>
      )}
      {!hideNotepad && (
        <div className={`mt-4 babich-sidebar`} style={{ right: showSidebar ? 0 : '-200%' }}>
          <Notepad events={events} meeting_id={meeting_id} />
        </div>
      )}
    </div>
  );
};

export default NoteColumn;
