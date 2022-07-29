/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInput from '../../../components/input/mainInput';
import {
  createTeamRequest,
  deleteTeamRequest,
  updateTeamRequest,
} from '../../../store/teams/actions';
import { ThemeContext } from '../../../themeProvider';
// import uploadUserImageRequest from '../../../store/user/actions';

type props = {
  closeModal: any;
};

export default function TeamDetailModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const modalParams = useSelector((state: any) => state.app.modalParams);
  const resImage = useSelector((state: any) => state.user.userImage);

  const { formData, action, userId } = modalParams;

  useEffect(() => {
    if (resImage !== '') {
      setFormState({ ...formState, avatar: resImage });
    }
  }, [resImage]);

  const [formState, setFormState] = useState({
    avatar: formData?.avatar,
    name: formData?.name,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const { theme } = useContext(ThemeContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (action === 'add') {
      const payload = {
        name: formState.name,
        userId,
      };

      dispatch(createTeamRequest(payload));
    } else if (action === 'edit') {
      const payload = {
        name: formState.name,
        // avatar: formState.avatar,
      };

      dispatch(updateTeamRequest(formData.id, payload));
    }
    setSubmitting(false);
    closeModal();
  };

  const handleClickDelete = () => {
    if (submitting) return;
    setSubmitting(true);

    dispatch(deleteTeamRequest(formData.id));
    setSubmitting(false);
    closeModal();
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className={`modal-title ${theme === 'Light' ? null : 'text-light'}`}>
            <strong>Team Detail</strong>
          </h4>
          <div className="modal-close-icon" onClick={closeModal}>
            <i className="fas fa-times"></i>
          </div>
        </div>
        <div className="modal-body">
          <div className="contact-modal-form">
            <div className="row align-items-center justify-content-between">
              {/* <div className="col-lg-3 col-md-3 col-sm-12">
                <label htmlFor="contact-form-avatar-input">
                  <img src={formState?.avatar} className="contact-form-avatar" alt="" />
                </label>
                <input
                  type="file"
                  id="contact-form-avatar-input"
                  accept="image/*"
                  onChange={handleUploadImage}
                  hidden
                />
              </div> */}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="contact-form-inputs">
                  <MainInput
                    id="name"
                    type="text"
                    placeholder="Team Name"
                    icon="user-friends"
                    name="name"
                    value={formState.name}
                    onChange={handleInputChange}
                    required
                    theme={theme}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          {action === 'add' ? (
            <>
              <button type="submit" className="btn btn-primary">
                <span className="text-light">Create New</span>
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={closeModal}
              >
                Close Modal
              </button>
            </>
          ) : (
            <>
              <button type="submit" className="btn btn-primary">
                <span className="text-light">Save Changes</span>
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={handleClickDelete}
              >
                Delete Team
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
