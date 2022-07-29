import React, { useCallback, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { closeModal } from '../../store/app/actions';

import CalendarEventModal from '../../pages/meetings/components/eventModal';
import TeamModal from '../../pages/library/components/teamModal';
import SalesRepModal from '../../pages/team/components/salesRepModal';
import EditContactModal from '../../pages/contacts/components/modals/editModal';
import DeleteContactModal from '../../pages/contacts/components/modals/deleteModal';
import PreventModal from '../../pages/meeting/components/preventModal';
import VideoModal from '../../pages/meeting/components/videoModal';
import AudioInputModal from '../../pages/meeting/components/audioInputModal';
import AudioOutputModal from '../../pages/meeting/components/audioOutputModal';
import BackgroundModal from '../../pages/meeting/components/backgroundModal';
import RecordingsModal from '../../pages/library/components/recordingsModal';
import { ThemeContext } from '../../themeProvider';

const Modal = () => {
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);
  const modalParams = useSelector((state: any) => state.app.modalParams);

  const handleCloseModal = useCallback(() => {
    dispatch(closeModal());
  }, []);

  const { theme } = useContext(ThemeContext);

  const renderModal = () => {
    switch (app.currentModal) {
      case 'CALENDAR_EVENT_MODAL':
        return <CalendarEventModal closeModal={handleCloseModal} />;
      case 'TEAM_MODAL':
        return <TeamModal closeModal={handleCloseModal} />;
      case 'SALES_REP_MODAL':
        return <SalesRepModal closeModal={handleCloseModal} />;
      case 'EDIT_CONTACT':
        return <EditContactModal closeModal={handleCloseModal} />;
      case 'DELETE_CONTACT':
        return <DeleteContactModal closeModal={handleCloseModal} />;
      case 'PREVENT_MODAL':
        return <PreventModal closeModal={handleCloseModal} />;
      case 'VIDEO_SETTING':
        return <VideoModal closeModal={handleCloseModal} />;
      case 'SELECT_BACKGROUND':
        return <BackgroundModal closeModal={handleCloseModal} />;
      case 'AUDIO_INPUT_SETTING':
        return <AudioInputModal closeModal={handleCloseModal} />;
      case 'AUDIO_OUTPUT_SETTING':
        return <AudioOutputModal closeModal={handleCloseModal} />;
      case 'RECORDINGS_MODAL':
        return <RecordingsModal closeModal={handleCloseModal} modalParams={modalParams} />;
      default:
        return null;
    }
  };

  if (!app.modalOpen) {
    return null;
  }

  return (
    <div className={`modal-wrapper ${theme === 'Light' ? 'light-mode' : null}`}>
      <div className={`modal-container ${modalParams.classes ?? ''}`}>{renderModal()}</div>
    </div>
  );
};

export default Modal;
