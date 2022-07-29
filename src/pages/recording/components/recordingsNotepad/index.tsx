import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ReactBigCalendar from '../../../../components/calendar/reactBigCalendar';
import { fetchMeetingsByPayloadRequest } from '../../../../store/meetings/actions';
import { ThemeContext } from '../../../../themeProvider';
import { fetchPresetRequest, getPresetForMeeting } from '../../../../store/preset/actions';
import { useLocation } from 'react-router-dom';

//TODO refactor here

type IRecordingsNotepadProps = {
  talkingPoints: any;
  meetingDetails: any;
};

const RecordingsNotepad = (props: IRecordingsNotepadProps) => {
  const dispatch = useDispatch();
  const [activeEl, setActive] = useState<number>(0);
  const resMeeting = useSelector((state: any) => state.meetings);
  const [events, setEvents] = useState([]);

  const { theme } = useContext(ThemeContext);

  const location = useLocation();

  //
  const transcriptionsArr = props.talkingPoints;
  const meetingDetails = props.meetingDetails;

  const presetId = meetingDetails.meeting.presetId;

  const preset: any = useSelector((state: any) => state.preset.preset);
  //

  //TODO refactor here
  console.log('rrr', preset);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchPresetRequest());
    };
    if (!presetId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchData();
    } else {
      dispatch(getPresetForMeeting(presetId));
    }
  }, [location]);

  useEffect(() => {
    dispatch(fetchMeetingsByPayloadRequest({}));
  }, []);

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

  const items = [
    { label: 'Talking points' },
    { label: 'Notes' },
    { label: 'Chat' },
    { label: 'Calendar' },
  ];

  return (
    <div
      className={`d-flex flex-column rounded-3 notepad pb-2 ${
        theme === 'Light' ? 'light-mode' : null
      }`}
    >
      <div className="d-flex align-items-center justify-content-between">
        {items.map(({ label }, idx) => (
          <button
            key={label}
            className={activeEl === idx ? 'tab-button active' : 'tab-button'}
            onClick={() => setActive(idx)}
          >
            <span>{label}</span>
          </button>
        ))}
      </div>
      {activeEl === 3 ? (
        <ReactBigCalendar
          events={events}
          onSelectSlot={null}
          onSelectEvent={null}
          onEventDrop={null}
          onResizeEvent={null}
          dragFromOutsideItem={null}
          onDropFromOutside={null}
          handleDragStart={null}
          // formats={{
          //   dateFormat: 'dd',

          //   // dayFormat: (date: any, a: null, localizer: any) => localizer.format(date, 'DDD'),

          //   // dayRangeHeaderFormat: ({ start, end }: any, culture: any, localizer: any) =>
          //   //   localizer.format(start, { date: 'short' }, culture) +
          //   //   ' — ' +
          //   //   localizer.format(end, { date: 'short' }, culture),
          // }}
        />
      ) : activeEl ? (
        <textarea className="fs-5 pt-3" />
      ) : (
        <>
          {preset && (
            <ul>
              <li className={''}>Drug Name: {preset.drugName}</li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.usageKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Indication and Usage: {preset.usageTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.dosageAndAdministrationKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Dosage and Administration: {preset.dosageAndAdministrationTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.dosageFormsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Dosage Forms and Strenghts: {preset.dosageFormsTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.contraindicationsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Contradictions: {preset.contraindicationsTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.warningsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Warnings and Precautions: {preset.warningsTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.adverseReactionsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Adverse Reactions: {preset.adverseReactionsTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.drugInteractionsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Drug Interactions: {preset.drugInteractionsTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.lactationKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Lactation: {preset.lactationTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.discussionFirstKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Discussion: {preset.discussionFirstTitle}
              </li>
              <li
                className={
                  transcriptionsArr.some((el: { transcription: string }) =>
                    preset?.discussionSecondKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Discussion: {preset.discussionSecondTitle}
              </li>
            </ul>
          )}
        </>
      )}
      <div
        className={`${activeEl === 1 ? 'd-flex' : 'd-none'}`}
        style={{ visibility: activeEl === 1 ? 'visible' : 'hidden', marginLeft: 10 }}
      >
        <button className="btn btn-primary btn-lg w-75">
          <i className="bi-upload icon text-light" />
          <span className="text-light fs-6 ps-2">Upload File</span>
        </button>
        <button className="btn btn-outline-dark ms-3 btn-lg" style={{ background: '#2C2D55' }}>
          <i className="bi-share icon text-light" />
        </button>
      </div>
    </div>
  );
};

export default RecordingsNotepad;
