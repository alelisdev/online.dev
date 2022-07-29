import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInput from '../../../../components/input/mainInput';
import {
  updateContactRequest,
  fetchContactsByPayloadRequest,
} from '../../../../store/contact/actions';
import { uploadUserImageRequest } from '../../../../store/user/actions';
import { IUserImageRequest } from '../../../../types/user';
import { ThemeContext } from '../../../../themeProvider';

type props = {
  closeModal: any;
};

export default function EditContactModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const modalParams = useSelector((state: any) => state.app.modalParams);
  const resImage = useSelector((state: any) => state.user.userImage);

  const { id, username, avatar, email, userId } = modalParams;

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (resImage !== '') {
      setContactState({ ...contactState, avatar: resImage });
    }
  }, [resImage]);

  const [contactState, setContactState] = useState({
    avatar,
    username,
    email,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    setContactState({ ...contactState, [e.target.name]: e.target.value });
  };

  const handleUploadImage = (e: any) => {
    try {
      const imagePure = e.target.files[0];
      const src = URL.createObjectURL(imagePure);

      const formData = new FormData() as IUserImageRequest;
      formData.append('photo', imagePure, imagePure.name);

      setContactState({ ...contactState, avatar: src });

      dispatch(uploadUserImageRequest(formData));
    } catch (err) {
      console.log(err);
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      username: contactState.username,
      email: contactState.email,
      avatar: contactState.avatar,
      userId,
    };

    await dispatch(updateContactRequest(id, payload));
    await dispatch(
      fetchContactsByPayloadRequest({
        userId,
      }),
    );
    setSubmitting(false);
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className={`modal-title ${theme === 'Light' ? null : 'text-light'}`}>
            <strong>Edit Contact</strong>
          </h4>
        </div>
        <div className="modal-body">
          <div className="contact-modal-form">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-3 col-md-3 col-sm-12">
                <label htmlFor="contact-form-avatar-input">
                  <img src={contactState?.avatar} className="contact-form-avatar" alt="" />
                </label>
                <input
                  type="file"
                  id="contact-form-avatar-input"
                  accept="image/*"
                  onChange={handleUploadImage}
                  hidden
                />
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12">
                <div className="contact-form-inputs">
                  <MainInput
                    id="username"
                    type="text"
                    placeholder="Username"
                    icon="user"
                    name="username"
                    value={contactState.username}
                    onChange={handleInputChange}
                    required
                    theme={theme}
                  />
                  <MainInput
                    id="email-address"
                    type="email"
                    placeholder="Email address"
                    icon="envelope"
                    name="email"
                    value={contactState.email}
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
          <button type="submit" className="btn btn-primary">
            <span className="text-light">Save changes</span>
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
      </form>
    </div>
  );
}
