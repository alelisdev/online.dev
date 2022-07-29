import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchAccessToken, fetchCurrentUser, setAuthenticated } from '../../../store/app/actions';
import UserHeader from '../../userHeader';
import Modal from '../../modals';

type UserLayoutProps = {
  style?: any;
  children: React.ReactElement;
  onChangeFullScreen?: (e: any) => void;
};

const UserLayout = ({ children, style }: UserLayoutProps) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const app = useSelector((state: any) => state.app);

  const [isFetchUser, setIsFetchUser] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      dispatch(fetchCurrentUser());
      dispatch(fetchAccessToken());
      setIsFetchUser(true);
    };
    fetchData();
  }, []);

  // Fetch data that is used throughout the app
  useEffect(() => {
    if (isFetchUser) {
      const authenticate = async () => {
        if (!app?.authenticated) {
          if (app?.userToken === null) {
            history.replace('/login');
            return;
          }
          await dispatch(setAuthenticated());
        }

        if (location.pathname === '/') {
          history.push('/home');
        }
      };

      authenticate();
    }
  }, [app, isFetchUser]);

  return (
    <div className="user_layout">
      <UserHeader />
      <div className="user_layout__container" style={style}>
        {children}
      </div>
      <Modal />
    </div>
  );
};

export default UserLayout;
