import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteContactRequest,
  fetchContactsByPayloadRequest,
} from '../../../../store/contact/actions';

type props = {
  closeModal: any;
};

export default function DeleteContactModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const modalParams = useSelector((state: any) => state.app.modalParams);

  const { id, userId } = modalParams;

  const [submitting, setSubmitting] = useState(false);

  const handleClickDelete = async () => {
    if (submitting) return;
    setSubmitting(true);

    await dispatch(deleteContactRequest(id));
    await dispatch(
      fetchContactsByPayloadRequest({
        userId,
      }),
    );
    setSubmitting(false);
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">
          <strong>Delete Contact</strong>
        </h4>
      </div>
      <div className="modal-body">
        <p>Would you delete the contact?</p>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-primary text-light" onClick={handleClickDelete}>
          Delete Contact
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          data-dismiss="modal"
          onClick={closeModal}
        >
          Close
        </button>
      </div>
    </div>
  );
}
