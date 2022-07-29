import React from 'react';
import { useDispatch } from 'react-redux';
import { closeModalAndEndMeeting } from '../../../store/app/actions';

type props = {
  closeModal: any;
  // endMeeting: any;
};

export default function PreventModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const handleEndMeeting = () => {
    dispatch(closeModalAndEndMeeting());
  };
  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">
          <strong>Warning</strong>
        </h4>
      </div>
      <div className="modal-body">
        <p>Do you want to leave a call?</p>
      </div>
      <div className="modal-footer">
        <button
          type="button"
          className="btn btn-danger"
          data-dismiss="modal"
          onClick={handleEndMeeting}
        >
          End meeting
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={closeModal}
        >
          Abort
        </button>
      </div>
    </div>
  );
}
