/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInput from '../../../components/input/mainInput';
import ReactSelect from '../../../components/select/reactSelect';
import { RootState } from '../../../store';
import {
  createSalesRepRequest,
  deleteSalesRepRequest,
  updateSalesRepRequest,
} from '../../../store/salesRep/actions';
import { ThemeContext } from '../../../themeProvider';
// import uploadUserImageRequest from '../../../store/user/actions';

type props = {
  closeModal: any;
};

export default function SalesRepModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const modalParams = useSelector((state: any) => state.app.modalParams);
  const resImage = useSelector((state: any) => state.user.userImage);
  const resTeams: any = useSelector((state: RootState) => state.teams);
  const { formData, action } = modalParams;

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (resImage !== '') {
      setFormState({ ...formState, avatar: resImage });
    }
  }, [resImage]);

  const [formState, setFormState] = useState({
    teamId: formData.teamId,
    avatar: formData.avatar,
    salesRepName: formData.username,
    salesRepEmail: formData.email,
    salesRepPassword: '',
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  // const handleUploadImage = async (e: any) => {
  //   try {
  //     const imagePure = e.target.files[0];
  //     const src = URL.createObjectURL(imagePure);

  //     const formData = new FormData();
  //     formData.append('photo', imagePure, imagePure.name);

  //     setFormState({ ...formState, avatar: src });

  //     await dispatch(uploadUserImageRequest(formData));
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (action === 'add') {
      const payload = {
        username: formState.salesRepName,
        email: formState.salesRepEmail,
        password: formState.salesRepPassword,
        teamId: formState.teamId,
      };

      dispatch(createSalesRepRequest(payload));
    } else if (action === 'edit') {
      const payload = {
        username: formState.salesRepName,
        email: formState.salesRepEmail,
        teamId: formState.teamId,
        userId: formData.userId,
        // avatar: formState.avatar,
      };

      dispatch(updateSalesRepRequest(formData.id, payload));
    }
    setSubmitting(false);
    closeModal();
  };

  const handleClickDelete = () => {
    if (submitting) return;
    setSubmitting(true);

    const payload = {
      id: formData.id,
      teamId: formState.teamId,
      userId: formData.userId,
    };

    dispatch(deleteSalesRepRequest(formData.id, payload));
    setSubmitting(false);
    closeModal();
  };

  const _selectOptions = (teams: Array<any>) => {
    let _teams = teams.map((r: { name: string; id: string }) => {
      return { label: r.name, value: r.id };
    });
    _teams = Object.assign([..._teams]);
    return _teams;
  };

  const selectValue = (teams: Array<any>, selectedTeamId: string | null) => {
    const selectedTeam = teams.find((r) => r.id === selectedTeamId);
    if (selectedTeam) {
      return { label: selectedTeam.name, value: selectedTeam.id };
    } else {
      return null;
    }
  };

  const handleSelectTeam = (teamId: string) => {
    setFormState({ ...formState, teamId });
  };

  return (
    <div className="modal-content">
      <form onSubmit={handleSubmit}>
        <div className="modal-header">
          <h4 className="modal-title">
            <strong>Sales Rep Detail</strong>
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
                    id="salesRepName"
                    type="text"
                    placeholder="Username"
                    icon="user-friends"
                    name="salesRepName"
                    value={formState.salesRepName}
                    onChange={handleInputChange}
                    required
                    theme={theme}
                  />
                </div>
              </div>
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="contact-form-inputs">
                  <MainInput
                    id="salesRepEmail"
                    type="email"
                    placeholder="Email"
                    icon="envelope"
                    name="salesRepEmail"
                    value={formState.salesRepEmail}
                    onChange={handleInputChange}
                    required
                    theme={theme}
                  />
                </div>
              </div>
              {action === 'add' && (
                <div className="col-lg-12 col-md-12 col-sm-12">
                  <div className="contact-form-inputs">
                    <MainInput
                      id="salesRepPassword"
                      type="password"
                      placeholder="Password"
                      icon="lock"
                      name="salesRepPassword"
                      value={formState.salesRepPassword}
                      onChange={handleInputChange}
                      required
                      theme={theme}
                    />
                  </div>
                </div>
              )}
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="contact-form-inputs">
                  <ReactSelect
                    options={_selectOptions(resTeams.teamList)}
                    value={selectValue(resTeams.teamList, formState.teamId)}
                    onChange={(e: any) => {
                      handleSelectTeam(e.value);
                    }}
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
                Delete Sales Rep
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
