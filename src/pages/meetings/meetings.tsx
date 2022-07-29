import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactBigCalendar from '../../components/calendar/reactBigCalendar';
import UserLayout from '../../components/layout/user';

import { openModal } from '../../store/app/actions';
import { fetchMeetingsByPayloadRequest, updateMeetingRequest } from '../../store/meetings/actions';
import { fetchTeamsByPayloadRequest } from '../../store/teams/actions';
import { UserRole } from '../../utils/userRole';
import { ThemeContext } from '../../themeProvider';

//TODO move meetings and calls fetch to AppInitializer module

export default function Meetings() {
  const dispatch = useDispatch();
  const user: any = useSelector((state: any) => state.app.currentUser);
  const resMeeting = useSelector((state: any) => state.meetings);

  const [events, setEvents] = useState([]);
  const [draggedEvent, setDraggedEvent] = useState<any>();
  const [displayDragItemInCell] = useState(true);
  //
  const { theme } = useContext(ThemeContext);

  // initial load
  useEffect(() => {
    dispatch(fetchMeetingsByPayloadRequest({}));
  }, []);

  useEffect(() => {
    if (user && user.role === UserRole.MANAGER)
      dispatch(fetchTeamsByPayloadRequest({ userId: user.id }));
  }, [user]);

  useEffect(() => {
    if (resMeeting.meetingList) {
      const meetingList: any = [];

      for (let i = 0; i < resMeeting.meetingList.length; i++) {
        const item = resMeeting.meetingList[i];
        const payload = {
          id: item.id,
          title: item.title,
          description: item.description,
          start: new Date(item.start),
          end: new Date(item.end),
          teamId: item.teamId,
          salesRepId: item.salesRepId,
        };

        meetingList.push(payload);
      }

      setEvents(meetingList);
    }
  }, [resMeeting.meetingList]);

  const handleSelectSlot = ({ start, end }: any) => {
    dispatch(
      openModal({
        modal: 'CALENDAR_EVENT_MODAL',
        params: {
          type: 'add',
          userId: user?.id,
          classes: 'calendar-modal-container',
          formData: {
            title: '',
            description: '',
            start,
            end,
            teamId: '',
            salesRepId: '',
          },
        },
      }),
    );
  };

  const handleSelectEvent = (event: any) => {
    dispatch(
      openModal({
        modal: 'CALENDAR_EVENT_MODAL',
        params: {
          type: 'edit',
          userId: user?.id,
          classes: 'calendar-modal-container',
          formData: {
            meetingId: event.id,
            title: event.title,
            description: event.description,
            start: event.start,
            end: event.end,
            teamId: event.teamId,
            salesRepId: event.salesRepId,
          },
        },
      }),
    );
  };

  const handleDragStart = (event: any) => {
    setDraggedEvent(event);
  };

  const onDropFromOutside = ({ start, end, allDay }: any) => {
    const event = {
      id: draggedEvent.id,
      title: draggedEvent.title,
      description: draggedEvent.description,
      start,
      end,
      allDay: allDay,
      teamId: draggedEvent.teamId,
      salesRepId: draggedEvent.salesRepId,
    };

    setDraggedEvent(null);
    handleMoveEvent({ event, start, end });
  };

  const handleMoveEvent = ({ event, start, end, isAllDay: droppedOnAllDaySlot }: any) => {
    let allDay = event.allDay;

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true;
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false;
    }

    const moveEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      start,
      end,
      allDay: allDay,
      teamId: event.teamId,
      salesRepId: event.salesRepId,
    };

    const nextEvents: any = events.map((existingEvent: any) => {
      return existingEvent.id == moveEvent.id ? moveEvent : existingEvent;
    });
    setEvents(nextEvents);

    dispatch(updateMeetingRequest(event.id, moveEvent));
  };

  const handleResizeEvent = ({ event, start, end }: any) => {
    const resizeEvent = {
      id: event.id,
      title: event.title,
      description: event.description,
      start: start ? start : event.start,
      end,
      teamId: event.teamId,
      salesRepId: event.salesRepId,
    };

    const nextEvents: any = events.map((existingEvent: any) => {
      return existingEvent.id == resizeEvent.id ? resizeEvent : existingEvent;
    });
    setEvents(nextEvents);

    dispatch(updateMeetingRequest(event.id, resizeEvent));
  };

  return (
    <UserLayout>
      <div className={`meeting-calendar ${theme === 'Light' ? 'light-mode' : null}`}>
        <ReactBigCalendar
          events={events}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleSelectEvent}
          onEventDrop={handleMoveEvent}
          onResizeEvent={handleResizeEvent}
          dragFromOutsideItem={displayDragItemInCell ? draggedEvent : null}
          onDropFromOutside={onDropFromOutside}
          handleDragStart={handleDragStart}
        />
      </div>
    </UserLayout>
  );
}
