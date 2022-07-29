import React, { MouseEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

type props = {
  listItems: any;
  onClose: any;
  onLogout: any;
};

export default function HeaderDropdown({ listItems, onClose, onLogout }: props) {
  const history = useHistory();
  const user = useSelector((state: any) => state.app.currentUser);

  const handleClickMenuItem = (item: any) => (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (item.id === 'settings') {
      history.push(`/settings`);
    }
    // if (item.id === 'logout') {
    //   onLogout();
    // }
    onClose();
  };

  return (
    <div className="header-dropdown-wrapper position-absolute pt-4 p-lg-3">
      <div className="user-dropdown-header">
        <div className="user-dropdown-header-username">{user?.username}</div>
      </div>
      <div className="menu-container">
        {listItems.map((item: any, index: number) => (
          <button
            key={item.id}
            className={`menu-item ${index === listItems.length - 1 && 'menu-last-item'}`}
            onClick={handleClickMenuItem(item)}
          >
            <div className="menu-item-wrapper">
              <div className="menu-item-title">{item.title}</div>
            </div>
          </button>
        ))}
      </div>
      <div className="user-dropdown-footer">
        <button className="btn btn-primary text-light" onClick={() => onLogout()}>
          Logout
        </button>
      </div>
    </div>
  );
}
