import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserLayout from '../../components/layout/user';
import { ThemeContext } from '../../themeProvider';

const Optimize = () => {
  const { theme } = useContext(ThemeContext);
  return (
    <UserLayout>
      <div
        className={`optimize-page ${
          theme === 'Light' ? 'light-mode' : null
        } d-flex align-items-center justify-content-center position-relative`}
      >
        <div className="optimize-page_optimize position-absolute p-3 top-0 start-0">
          <span className="fs-3">Optimize</span>
        </div>
        <div className="d-flex flex-column text-center align-items-center optimize-page_content">
          <div className="mb-4 optimize-page_content_icon rounded-circle d-flex justify-content-center align-items-center">
            <i className="bi-camera-video-fill" />
          </div>
          <p className="fw-bold fs-5 mb-0 mt-5">We will take you through some steps to optimise </p>{' '}
          <p className="fw-bold fs-5">
            Your environment and yourself. Please click begin when you are ready
          </p>
          <Link to="/loading">
            <button className="btn btn-primary px-5 btn-lg rounded-pill text-light mt-3">
              Begin
            </button>
          </Link>
        </div>
      </div>
    </UserLayout>
  );
};

export default Optimize;
