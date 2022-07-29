/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext, useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import Logo from '../../assets/icons/logo';
import Switch from '../switch';
import HeaderDropdown from './HeaderDropdown';
import OutsideAlerter from '../outsideAlerter';
import { fetchCurrentUser, logout, openModal } from '../../store/app/actions';
import { changeFullScreen } from '../../store/meeting/actions';
import { RootState } from '../../store';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../themeProvider';
import colours from '../../scss/badcss.module.scss';

const navigation = [
  {
    label: 'Home',
    slug: 'home',
    icon: 'house-door-fill',
    link: '/home',
  },
  {
    label: 'Meetings',
    slug: 'meetings',
    icon: 'calendar2',
    link: '/meetings',
  },
  {
    label: 'Analytics',
    slug: 'library',
    icon: 'folder',
    link: '/library',
  },
  {
    label: 'Contacts',
    slug: 'contacts',
    icon: 'journal-plus',
    link: '/contacts',
  },
  {
    label: 'Settings',
    slug: 'settings',
    icon: 'gear',
    link: '/settings',
  },
];

const dropDownList = [{ id: 'settings', title: 'Account Settings' }];

type ICurrentUser = {
  username: string | null;
  avatar: string | null;
} | null;

//TODO fix inline styles here

const UserHeader = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation();
  const isMeetingPage = location.pathname.includes('meeting/');

  const [currentUser, setCurrentUser] = useState<ICurrentUser>(null);
  // const [userNav, setUserNav] = useState(navigation);
  const [selectedNav, setSelectedNav] = useState('');
  const [isClickDropIcon, setIsClickDropIcon] = useState(false);
  const { isStarted, isFullScreen } = useSelector((state: RootState) => state.meeting);
  const [isHamburgerMenu, setIsHamburgerMenu] = useState(false);
  const userImage = useSelector((state: any) => state.user.userImage);
  //
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const path = location.pathname;

    if (path === '/home') setSelectedNav('home');
    if (path.includes('/meetings')) setSelectedNav('meetings');
    if (path.includes('/library')) setSelectedNav('library');
    if (path.includes('/contacts')) setSelectedNav('contacts');
    if (path.includes('/settings')) setSelectedNav('settings');
  }, [location]);

  useEffect(() => {
    const result = fetchCurrentUser();
    setCurrentUser(result.payload);
  }, [userImage]);

  const handleClickLogout = () => {
    if (isStarted) {
      dispatch(
        openModal({
          modal: 'PREVENT_MODAL',
          params: {},
        }),
      );
      setIsClickDropIcon(false);
      return;
    }

    localStorage.setItem('currentUser', '');
    localStorage.setItem('accessToken', '');

    dispatch(logout());
    history.push('/admin/login');
  };

  const handleClickUserIcon = (e: any) => {
    e.preventDefault();
    if (currentUser !== null) {
      setIsClickDropIcon(!isClickDropIcon);
    } else {
      handleClickLogout();
    }
  };

  const _onChangeFullScreen = () => {
    dispatch(changeFullScreen(!isFullScreen));
  };
  return (
    <div
      className={`user_header${
        theme === 'Light' ? 'light-mode' : null
      } w-100 d-flex justify-content-between align-items-center text-light position-relative navbar navbar-expand-md p-lg-3 p-rg-3 pb-2`}
    >
      <div className="d-flex align-items-center">
        <Link to="/">
          <Logo size={30} theme={theme} />
        </Link>
        {isMeetingPage && (
          <div className="ms-2 ms-md-3 ms-lg-5">
            <Switch
              theme={theme}
              isChecked={isFullScreen}
              label="Focus mode"
              isInline={true}
              onChange={_onChangeFullScreen}
            />
          </div>
        )}
      </div>
      <button
        className="navbar-toggler"
        type="button"
        onClick={() => setIsHamburgerMenu(!isHamburgerMenu)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          fill="currentColor"
          className="bi bi-list"
          viewBox="0 0 16 16"
        >
          <path
            fillRule="evenodd"
            d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
          />
        </svg>
      </button>
      <div
        className={`align-items-center justify-content-end navbar-collapse collapse ${
          isHamburgerMenu ? 'show' : ''
        }`}
      >
        {/*TODO refactor this itmes themes usage like on home page 136-138 */}
        {navigation.map((nav) => (
          <div
            role={'menuitem'}
            tabIndex={0}
            key={nav.label}
            className={`d-flex flex-column menu-item align-items-center mx-1 mx-md-2 mx-lg-3 ${
              selectedNav === nav.slug && 'text-primary user_header__menu_selected'
            }`}
            onClick={() => {
              history.push(`${nav.link}`);
            }}
          >
            <i
              className={`bi-${nav.icon} icon fs-3`}
              style={theme === 'Light' ? { color: colours.light_grey } : undefined}
            ></i>
            <span
              className={`fs-6 ${selectedNav === nav.slug && 'fw-bold'}`}
              style={theme === 'Light' ? { color: colours.light_grey } : undefined}
            >
              {nav.label}
            </span>
          </div>
        ))}
        <hr className="d-md-none text-white-50" />
        {isClickDropIcon && (
          <OutsideAlerter onClickOutside={() => setIsClickDropIcon(false)}>
            <HeaderDropdown
              listItems={dropDownList}
              onLogout={handleClickLogout}
              onClose={() => setIsClickDropIcon(false)}
            />
          </OutsideAlerter>
        )}
        <div className="d-flex align-items-center justify-content-center ms-md-5">
          <span
            className="fw-bold"
            style={theme === 'Light' ? { color: 'grey' } : undefined}
          >{`Hi, ${currentUser?.username}`}</span>
          <div className="ms-2 rounded-circle user_header__image" onClick={handleClickUserIcon}>
            <img
              src={
                currentUser?.avatar
                  ? currentUser?.avatar
                  : '//ssl.gstatic.com/accounts/ui/avatar_2x.png'
              }
              className="user-avatar-image rounded-circle"
              style={{ width: '100%', height: '100%' }}
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
