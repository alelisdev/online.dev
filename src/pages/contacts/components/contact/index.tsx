import React from 'react';
import { useDispatch } from 'react-redux';
import { openModal } from '../../../../store/app/actions';

type props = {
  item: any;
};

export default function ContactItem({ item }: props) {
  const dispatch = useDispatch();

  const handleClickIcon = (type: string) => () => {
    if (type === 'edit') {
      dispatch(
        openModal({
          modal: 'EDIT_CONTACT',
          params: item,
        }),
      );
    } else {
      dispatch(
        openModal({
          modal: 'DELETE_CONTACT',
          params: item,
        }),
      );
    }
  };

  return (
    <div className="contact-item-wrapper row align-items-center justify-content-between">
      <div className="col-lg-3 col-md-3 col-sm-12">
        <img
          src={item?.avatar ? item?.avatar : '//ssl.gstatic.com/accounts/ui/avatar_2x.png'}
          className="contact-avatar-img"
          alt=""
        />
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12 d-flex justify-content-between align-items-center">
        <div className="contact-info-wrapper">
          <h4>{item?.username}</h4>
          <p>{item?.email}</p>
        </div>
        <div className="contact-icon-wrapper">
          <button
            type="button"
            className="btn btn-outline-primary mx-2"
            onClick={handleClickIcon('edit')}
          >
            <i className="fas fa-user-edit"></i>
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={handleClickIcon('delete')}
          >
            <i className="fas fa-user-minus"></i>
          </button>
        </div>
      </div>
    </div>
  );
}
