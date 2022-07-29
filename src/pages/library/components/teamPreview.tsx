/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/app/actions';

type props = {
  userId: string;
  item: any;
  onClick?: any;
  handleSelectMembersByTeam: any;
};

export default function TeamPreview({ item, userId, handleSelectMembersByTeam }: props) {
  const dispatch = useDispatch();
  // const history = useHistory();

  // const handleClickTeam = () => {
  //   history.push(`/team/${item.id}`);
  // };

  const handleClickDetail = async () => {
    await dispatch(
      openModal({
        modal: 'TEAM_MODAL',
        params: {
          action: 'edit',
          userId,
          formData: item,
        },
      }),
    );
  };

  const handleClickMembers = async (teamId: string) => {
    handleSelectMembersByTeam(teamId);
  };

  return (
    <div className="team-item-wrapper rounded-3">
      <div className="team-image-wrapper">
        <img
          src={item?.image || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'}
          className="team-avatar-img rounded-3"
          alt=""
        />
      </div>
      <div className="team-info-wrapper">
        <h5>{item?.name}</h5>
        <div className="team-detail-button mt-4 d-flex justify-content-between">
          <a onClick={handleClickDetail}>
            <span className="text-primary">Edit</span>
          </a>
          <a onClick={() => handleClickMembers(item.id)}>
            <span className="text-primary">Members</span>
          </a>
        </div>
      </div>
    </div>
  );
}
