import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import Logo from '../../assets/icons/logo';

const navigationConfig = [
  {
    type: 'item',
    id: 'dashboard',
    title: 'Dashboard',
    icon: 'house',
    isClick: true,
    isDroppable: false,
    navLink: '/admin/home',
  },
  {
    type: 'item',
    id: 'user',
    title: 'User',
    icon: 'person-fill',
    isClick: false,
    isDroppable: false,
    navLink: '/admin/users',
  },
];

export default function Navigation() {
  const history = useHistory();

  const [mainMenuItems, setMainMenuItems] = useState(navigationConfig);

  const onUpdateMainMenuItems = (updatedMenuItem: any, menuType: string) => {
    const tempMenuItems: any = [];
    mainMenuItems.forEach((item: any) => {
      if (item.id !== updatedMenuItem.id && item.type !== 'groupHeader') {
        if (menuType === 'child' && item.type === 'collapse') {
          item.isClick = true;
          tempMenuItems.push(item);
        } else {
          item.isClick = false;
          tempMenuItems.push(item);
        }
      } else {
        item.isClick = true;
        tempMenuItems.push(item);
      }
    });
    setMainMenuItems(tempMenuItems);
    localStorage.setItem('selectedMenuItemId', updatedMenuItem.id);

    history.push(updatedMenuItem.navLink);
  };

  const handleClickMenu = (item: any, menuType: string) => () => {
    const updatedMenuItem = {
      id: item.id,
      title: item.title,
      type: item.type,
      icon: item.icon,
      whiteIcon: item.whiteIcon,
      isClick: menuType === 'collapse' ? !item.isClick : true,
      isDroppable: menuType === 'yourCollection',
      navLink: item.navLink,
    };

    // dispatch(getCurrentMenu(updatedMenuItem));
    onUpdateMainMenuItems(updatedMenuItem, menuType);
  };

  return (
    <div className="side-nav-wrapper">
      <a className="navbar-brand logo-wrapper" href="/admin/home">
        <Logo size={30} />
      </a>
      <div className="main-menu-wrapper">
        {navigationConfig.map((item: any) => (
          <div className="main-menu-item-wrapper" key={item.id}>
            {item.type === 'item' && (
              <div>
                {item.isClick ? (
                  <div
                    role="button"
                    tabIndex={0}
                    className="main-menu-selected-item"
                    onClick={handleClickMenu(item, 'main')}
                    onKeyDown={handleClickMenu(item, 'main')}
                  >
                    <i className={`bi-${item.icon} icon main-menu-icon fs-3 ms-2`}></i>
                    <div className="main-menu-item-title me-2">{item.title}</div>
                  </div>
                ) : (
                  <div
                    role="button"
                    tabIndex={0}
                    className="main-menu-item"
                    onClick={handleClickMenu(item, 'main')}
                    onKeyDown={handleClickMenu(item, 'main')}
                  >
                    <i className={`bi-${item.icon} icon main-menu-icon fs-3 ms-2`}></i>
                    <div className="main-menu-item-title me-2">{item.title}</div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
