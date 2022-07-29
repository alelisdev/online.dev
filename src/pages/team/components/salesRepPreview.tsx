/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../store/app/actions';

type props = {
  userId: string;
  item: any;
  onClick?: EventListener;
  handleSelectSaleRepCalls: any;
};

export default function SaleRepPreview({ item, handleSelectSaleRepCalls }: props) {
  const dispatch = useDispatch();

  const { user, teamId } = item;

  const handleClick = () => {
    dispatch(
      openModal({
        modal: 'SALES_REP_MODAL',
        params: {
          action: 'edit',
          formData: {
            id: item.id,
            username: user.username,
            email: user.email,
            userId: user.id,
            teamId: teamId,
          },
        },
      }),
    );
  };

  const handleClickCalls = (itemId: string) => {
    handleSelectSaleRepCalls(itemId);
  };

  return (
    <div className="team-item-wrapper rounded-3">
      <div className="team-image-wrapper text-center">
        <img
          src={user?.image || '//ssl.gstatic.com/accounts/ui/avatar_2x.png'}
          className="team-avatar-img rounded-circle"
          alt=""
        />
      </div>
      <div className="team-info-wrapper rounded-3">
        <h5>{user?.username}</h5>
        <p className="team-info-email">{user?.email}</p>
        <div className="team-detail-button mt-4 d-flex justify-content-between">
          <a onClick={handleClick}>
            <span className="text-primary">Edit</span>
          </a>
          <a onClick={() => handleClickCalls(item.id)}>
            <span className="text-primary">Calls</span>
          </a>
        </div>
      </div>
    </div>
  );
}
