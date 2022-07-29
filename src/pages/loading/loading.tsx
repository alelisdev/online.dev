import React from 'react';
// import { Link } from 'react-router-dom';
import UserLayout from '../../components/layout/user';

const Loading = () => {
  return (
    <UserLayout>
      <div className="w-100 loading-page d-flex justify-content-center align-items-center">
        {/* <Link to="/meetings"> */}
        <div className="d-flex justify-content-center align-items-center loading-page_button rounded-circle">
          <i className="bi-play-fill icon text-light" />
        </div>
        {/* </Link> */}
      </div>
    </UserLayout>
  );
};

export default Loading;
