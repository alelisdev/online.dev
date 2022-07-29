import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import Navigation from '../../navigation';
import Header from '../../userHeader';
import Modal from '../../modals';

import { fetchCurrentUser, fetchAccessToken, setAuthenticated } from '../../../store/app/actions';

type props = {
  children: React.ReactElement;
};

const MainLayout = ({ children }: props) => {
  const history = useHistory();
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
      const authenticate = () => {
        if (!app?.authenticated) {
          if (app?.userToken === null) {
            history.replace('/home');
            return;
          }
          dispatch(setAuthenticated());
        }
      };

      authenticate();
    }
  }, [app, isFetchUser]);

  return (
    <div className="main-container">
      <Header />
      <Navigation />
      {children}
      <Modal />
    </div>
  );
};

export default MainLayout;
