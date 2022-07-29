import React, { useContext, useEffect, useState } from 'react';
// import { Views } from 'react-big-calendar';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import ReactBigCalendar from '../calendar/reactBigCalendar';
import { ThemeContext } from '../../themeProvider';
import {
  fetchPresetRequest,
  getPresetForMeeting,
  setPresetForMeeting,
} from '../../store/preset/actions';

//TODO refactor here

const Notepad = ({ events, meeting_id }: any) => {
  const dispatch = useDispatch();
  const [activeEl, setActive] = useState<number>(0);
  //Set transcriptions array

  const transcriptionsArr = useSelector((state: RootState) => state.meeting.transcriptionsArray);
  const meetingsState = useSelector((state: RootState) => state.meetings);

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const presetId = meetingsState.meeting.presetId;

  //Set talking points array

  const { theme } = useContext(ThemeContext);

  const resPresetData: any = useSelector((state: any) => state.preset.presetList);

  const pres: any = useSelector((state: any) => state.preset.preset);
  //
  const [presetData, setPresetData] = useState(null);
  const [preset, setPreset] = useState(null);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchPresetRequest());
    };
    const clearState = () => {
      setPreset(null);
    };
    if (!presetId) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      fetchData();
      clearState();
    } else {
      dispatch(getPresetForMeeting(presetId));
      setPreset(pres);
    }
    return clearState;
  }, [presetId, meetingsState]);

  useEffect(() => {
    setPresetData(resPresetData);
  }, [resPresetData]);

  console.log('preset data', preset);

  console.log('talking points', transcriptionsArr);

  const items = [
    { label: 'Talking points' },
    { label: 'Notes' },
    { label: 'Chat' },
    { label: 'Calendar' },
  ];

  const handleSetPreset = (preset: any) => {
    dispatch(setPresetForMeeting({ meeting_id: meeting_id, presetId: preset.id }));
    setPreset(preset);
  };

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
        />
      ) : activeEl ? (
        <textarea className="fs-5 pt-3" />
      ) : (
        <>
          {!preset && <span className="text-light fs-6 ps-4">Choose drug</span>}

          {!preset &&
            presetData &&
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            presetData.map((preset, index) => {
              return (
                <button
                  className="btn btn-primary m-1"
                  key={index}
                  onClick={() => handleSetPreset(preset)}
                >
                  <span className="text-light fs-6 ps-2">{preset.drugName}</span>
                </button>
              );
            })}

          {preset && (
            <ul>
              <li className={''}>
                Drug Name:{' '}
                {
                  // @ts-expect-error check type
                  preset.drugName
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.usageKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Indication and Usage:{' '}
                {
                  // @ts-expect-error check type
                  preset.usageTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.dosageAndAdministrationKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Dosage and Administration:{' '}
                {
                  // @ts-expect-error check type
                  preset.dosageAndAdministrationTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.dosageFormsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Dosage Forms and Strenghts:{' '}
                {
                  // @ts-expect-error check type
                  preset.dosageFormsTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.contraindicationsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Contradictions:{' '}
                {
                  // @ts-expect-error check type
                  preset.contraindicationsTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.warningsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Warnings and Precautions:{' '}
                {
                  // @ts-expect-error check type
                  preset.warningsTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.adverseReactionsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Adverse Reactions:{' '}
                {
                  // @ts-expect-error check type
                  preset.adverseReactionsTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.drugInteractionsKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Drug Interactions:{' '}
                {
                  // @ts-expect-error check type
                  preset.drugInteractionsTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.lactationKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Lactation:{' '}
                {
                  // @ts-expect-error check type
                  preset.lactationTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.discussionFirstKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Discussion:{' '}
                {
                  // @ts-expect-error check type
                  preset.discussionFirstTitle
                }
              </li>
              <li
                className={
                  transcriptionsArr.some((el) =>
                    // @ts-expect-error check type
                    preset?.discussionSecondKeywords
                      .toString()
                      .toLowerCase()
                      .includes(el.transcription.toLowerCase()),
                  )
                    ? 'active'
                    : ''
                }
              >
                Discussion:{' '}
                {
                  // @ts-expect-error check type
                  preset.discussionSecondTitle
                }
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

export default Notepad;
