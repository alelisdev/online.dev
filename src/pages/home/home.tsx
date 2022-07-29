import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import moment from 'moment';
import UserLayout from '../../components/layout/user';
import VideoPreview from '../../components/videoPreview';
import { RootState } from '../../store';
import { createMeetingRequest, fetchMeetingsByPayloadRequest } from '../../store/meetings/actions';
import { fetchCurrentUser } from '../../store/app/actions';
import ShareMenu from './components/shareMenu';
import { ThemeContext } from '../../themeProvider';
import colours from '../../scss/badcss.module.scss';

const menuOptions = [
  {
    label: 'Start Meeting',
    icon: 'camera-video-fill',
    slug: 'meeting',
  },
  {
    label: 'Optimize',
    icon: 'ui-checks',
    slug: 'optimize',
  },
  {
    label: 'Training',
    icon: 'easel-fill',
    slug: 'training',
  },
];

type ScheduleProps = {
  redirect: string;
  selected: boolean;
  id: number;
  start: string;
  end?: string;
  description: string;
  theme: any;
};

const Schedule = ({ redirect, selected, start, end, description, id, theme }: ScheduleProps) => {
  const getScheduleTime = (start: string, end?: string) => {
    const startTime = new Date(start);
    let endTime = null;
    if (end) {
      endTime = new Date(end);
    }
    return `${startTime.toLocaleString()} - ${endTime ? endTime.toLocaleString() : ''}`;
  };
  return (
    <div
      style={theme === 'Light' && selected ? { backgroundColor: colours.light_primary } : undefined}
      className={`d-flex justify-content-between rounded-3 p-3 border-bottom border-dark ${
        theme !== 'Light' && selected && 'bg-primary'
      }`}
    >
      <div className="d-flex">
        <i className="bi-clock icon fs-4"></i>
        <div className="d-flex flex-column ms-4">
          <span className="fs-4">{getScheduleTime(start, end)}</span>
          <span>{description}</span>
        </div>
      </div>
      <div className="d-flex align-items-center">
        <ShareMenu id={id}>
          <i className="bi-share icon fs-3"></i>
        </ShareMenu>

        {selected && (
          <Link to={`/${redirect}/${id}`}>
            <button className="ms-4 btn btn-light rounded-pill start-button">Start</button>
          </Link>
        )}
      </div>
    </div>
  );
};

type props = {
  history: any;
};
const Home = (props: props) => {
  const dispatch = useDispatch();
  const meetingsState = useSelector((state: RootState) => state.meetings);
  const [selectedOption, setSelectedOption] = useState('meeting');
  const [isNewMeetingCreated, setIsNewMeetingCreated] = useState(false);
  const schedules = meetingsState.meetingList;
  const user: any = useSelector((state: RootState) => state.app.currentUser);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    dispatch(fetchCurrentUser());
    dispatch(fetchMeetingsByPayloadRequest({ start: new Date(), upcoming: true }));
  }, []);

  useEffect(() => {
    if (selectedOption === 'optimize') {
      props.history.push('optimize');
    } else if (selectedOption === 'training') {
      props.history.push('training');
    }
  }, [selectedOption]);

  useEffect(() => {
    if (meetingsState.meeting && isNewMeetingCreated) {
      if (meetingsState.meeting) props.history.push(`meeting/${meetingsState.meeting.id}`);
    }
  }, [meetingsState.meeting]);

  const handleClick = (slug: string) => {
    if (slug === 'meeting') {
      const startDate = moment().add(5, 'm').toDate();
      const payload = {
        title: 'Meeting ' + startDate.toLocaleString(),
        description: 'Meeting ' + startDate.toLocaleString(),
        userId: user ? user.id : null,
        start: startDate,
        end: moment(startDate).add(30, 'm').toDate(),
      };
      dispatch(createMeetingRequest(payload));
      setIsNewMeetingCreated(true);
    }
    setSelectedOption(slug);
  };

  return (
    <UserLayout>
      <div className="row">
        <div className="col-12 col-sm home_info">
          <h2 className="fw-bold">Welcome back</h2>
          <div className="d-flex justify-content-between mt-3 mb-5">
            {menuOptions.map((option) => (
              <div
                role="menuitem"
                tabIndex={0}
                key={option.label}
                className={`d-flex rounded-3 flex-column align-items-center home_info__menu text-center ${
                  selectedOption === option.slug && 'selected'
                } ${theme === 'Light' ? 'light-mode' : null}`}
                onClick={() => handleClick(option.slug)}
                onKeyDown={() => setSelectedOption(option.slug)}
              >
                <i className={`bi-${option.icon} icon fs-1`}></i>
                <span className={`fs-5 ${selectedOption === option.slug && 'fw-bold'}`}>
                  {meetingsState.loading ? (
                    <span
                      className="spinner-border spinner-border-sm text-light"
                      role="status"
                      aria-hidden="true"
                    ></span>
                  ) : (
                    option.label
                  )}
                </span>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <h4>Upcoming schedules</h4>
            <div className="mt-4">
              {schedules &&
                schedules.map((schedule: any, i: number) => (
                  <Schedule
                    theme={theme}
                    redirect={selectedOption}
                    selected={i === 0}
                    {...schedule}
                    key={i}
                  />
                ))}
            </div>
          </div>
        </div>
        <div className="col-12 col-sm">
          <div className="home_video_preview">
            <VideoPreview />
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Home;
