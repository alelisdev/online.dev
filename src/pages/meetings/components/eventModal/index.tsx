/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MainInput from '../../../../components/input/mainInput';
import DateTimePicker from '../../../../components/datetimePicker';
import './index.scss';

import {
  createMeetingRequest,
  updateMeetingRequest,
  deleteMeetingRequest,
} from '../../../../store/meetings/actions';
import { useHistory } from 'react-router';
import GroupedSelect, { GroupedOption } from '../../../../components/select/groupedSelect';
import { RootState } from '../../../../store';
import { UserRole } from '../../../../utils/userRole';
import { ThemeContext } from '../../../../themeProvider';

type props = {
  closeModal: any;
};

export default function CalendarEventModal({ closeModal }: props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const modalParams = useSelector((state: any) => state.app.modalParams);
  const resTeams: any = useSelector((state: RootState) => state.teams);
  const user: any = useSelector((state: any) => state.app.currentUser);
  const { type, userId, formData } = modalParams;

  const { theme } = useContext(ThemeContext);

  const [formState, setFormState] = useState({
    title: formData.title,
    description: formData.description,
    start: formData.start,
    end: formData.end,
    teamId: formData.teamId,
    salesRepId: formData.salesRepId,
  });
  const [submitting, setSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleChangeDateTimePicker = (type: string) => (date: any) => {
    setFormState({ ...formState, [type]: date });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);

    if (type === 'add') {
      const payload = {
        title: formState.title,
        description: formState.description,
        userId,
        teamId: formState.teamId,
        start: new Date(formState.start),
        end: new Date(formState.end),
        salesRepId: formState.salesRepId,
      };

      dispatch(createMeetingRequest(payload));
    } else if (type === 'edit') {
      const payload = {
        title: formState.title,
        description: formState.description,
        userId,
        start: new Date(formState.start),
        end: new Date(formState.end),
        salesRepId: formState.salesRepId,
      };

      dispatch(updateMeetingRequest(formData.meetingId, payload));
    }
    setSubmitting(false);
    closeModal();
  };

  const handleClickDelete = () => {
    if (submitting) return;
    setSubmitting(true);

    dispatch(deleteMeetingRequest(formData.meetingId));
    setSubmitting(false);
    closeModal();
  };

  const handleJoin = (url: string) => {
    closeModal();
    history.push(url);
  };

  const _selectOptions = (teams: Array<any>): GroupedOption[] => {
    let _teams = teams.map((r: { name: string; salesReps: any }) => {
      return {
        label: r.name,
        options: r.salesReps.map((s: { id: string; user: { username: string } }) => {
          return { value: s.id, label: s.user.username };
        }),
      };
    });
    _teams = Object.assign([..._teams]);
    return _teams;
  };

  const selectValue = (teams: Array<any>, selectedSalesRepId: string | null) => {
    let selectedSalesRep;
    for (let i = 0; i < teams.length; i++) {
      for (let j = 0; j < teams[i].salesReps.length; j++) {
        if (teams[i].salesReps[j].id === selectedSalesRepId) {
          selectedSalesRep = teams[i].salesReps[j];
        }
      }
    }
    if (selectedSalesRep) {
      return { label: selectedSalesRep.user.username, value: selectedSalesRep.id };
    } else {
      return null;
    }
  };

  const handleSelectSalesRep = (teams: Array<any>, salesRepId: string) => {
    for (let i = 0; i < teams.length; i++) {
      const selectedSalesRep = teams[i].salesReps.find((s: { id: string }) => s.id === salesRepId);
      if (selectedSalesRep) {
        setFormState({ ...formState, salesRepId: selectedSalesRep.id, teamId: teams[i].id });
      }
    }
  };

  return (
    <div className="modal-content">
      <div className="modal-header">
        <h4 className="modal-title">
          <strong>Meeting Details</strong>
        </h4>
        <div className="modal-close-icon" onClick={closeModal}>
          <i className="fas fa-times"></i>
        </div>
      </div>
      <form className="meeting-form" onSubmit={handleSubmit}>
        <div className="modal-body">
          <MainInput
            id="Title"
            type="text"
            label="Title"
            placeholder="Title"
            name="title"
            value={formState.title}
            onChange={handleInputChange}
            required
            theme={theme}
          />
          <MainInput
            id="description"
            type="textarea"
            label="Description"
            placeholder="Description"
            name="description"
            value={formState.description}
            onChange={handleInputChange}
            required
            theme={theme}
          />
          <div className="row">
            <div className="col-6">
              <div className={`datetime-picker-wrapper ${theme === 'Light' ? 'light-mode' : null}`}>
                <label className="datetime-picker-label">Start Meeting</label>
                <DateTimePicker
                  placeholder="Start Date"
                  onChange={handleChangeDateTimePicker('start')}
                  value={formState.start}
                />
              </div>
            </div>
            <div className="col-6">
              <div className={`datetime-picker-wrapper ${theme === 'Light' ? 'light-mode' : null}`}>
                <label className="datetime-picker-label">End Meeting</label>
                <DateTimePicker
                  placeholder="End Date"
                  onChange={handleChangeDateTimePicker('end')}
                  value={formState.end}
                />
              </div>
            </div>
          </div>
          {user && user.role === UserRole.MANAGER && (
            <div className="datetime-picker-wrapper">
              <label className="datetime-picker-label">Sales Rep</label>
              <div className="contact-form-inputs">
                <GroupedSelect
                  groupedOptions={_selectOptions(resTeams.teamList)}
                  value={selectValue(resTeams.teamList, formState.salesRepId)}
                  onChange={(e: any) => {
                    handleSelectSalesRep(resTeams.teamList, e.value);
                  }}
                />
              </div>
            </div>
          )}
          {type === 'edit' && (
            <div className="meeting-link">
              <label className="form-label fs-6">URL</label>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${location.origin}/call/${formData.meetingId}`);
                }}
                className="btn btn-outline-primary text-light m-2 btn-sm"
              >
                Copy
              </button>
              <button
                type="button"
                onClick={() => handleJoin(`/call/${formData.meetingId}`)}
                className="btn btn-outline-secondary m-2 btn-sm"
              >
                Join
              </button>
              <MainInput
                id="url"
                type="text"
                label=""
                placeholder=""
                name="url"
                value={`${location.origin}/call/${formData.meetingId}`}
                onChange={null}
                readOnly={true}
                required
                theme={theme}
              />
              {/* <input
                type="text"
                value={`${location.origin}/call/${formData.meetingId}`}
                readOnly
                className="form-control fs-6"
              /> */}
            </div>
          )}
        </div>
        {
          <div className="modal-footer">
            {type === 'add' ? (
              <div>
                <button type="submit" className="btn btn-primary text-light mx-2">
                  Add
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button type="submit" className="btn btn-primary text-light mx-2">
                  Save
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-dismiss="modal"
                  onClick={handleClickDelete}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        }
      </form>
    </div>
  );
}
