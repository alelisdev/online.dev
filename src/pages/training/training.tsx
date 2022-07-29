import React from 'react';
// import { Link } from 'react-router-dom';
import HandClose from '../../assets/icons/handClose';
import HandOpen from '../../assets/icons/handOpen';
import UserLayout from '../../components/layout/user';
import ProgressBar from '../../components/progressBar';
import VideoPreview from '../../components/videoPreview';

const guidelines = [
  {
    label: 'Shoulder Posture Guideline',
    percentage: 50,
    isPlay: true,
  },
  {
    label: 'Hand Placement Limit',
    percentage: 80,
    isPlay: false,
  },
  {
    label: 'Optimum Voice Tone',
    percentage: 60,
    isPlay: false,
  },
  {
    label: 'Hand Movement Harshness',
    percentage: 50,
    isPlay: true,
  },
];

type Guideline = {
  label: string;
  isPlay: boolean;
  percentage: number;
};

const Guideline = ({ label, percentage, isPlay }: Guideline) => {
  return (
    <div className="user_training__guideline py-4 d-flex w-100">
      <div className="d-flex w-100">
        {isPlay ? (
          <i className="bi-pause-circle icon fs-4" />
        ) : (
          <i className="bi-play-circle text-primary  icon fs-4" />
        )}
        <div className="ms-4 d-flex flex-column user_training__guideline__progress">
          <span className="fs-5 mb-2">
            {label}
            <i className="bi-info-circle icon fs-5 ms-2" />
          </span>
          <ProgressBar percentage={percentage} />
        </div>
      </div>
    </div>
  );
};

const Training = () => {
  return (
    <UserLayout>
      <div className="row user_training">
        <div className="col-7">
          <div style={{ height: '500px' }}>
            <VideoPreview
              showGrid={true}
              hideUser={true}
              showTraining={true}
              showRecordButton={true}
            />
          </div>
        </div>
        <div className="col-5">
          <div className="user_meeting__guidelines d-flex flex-column p-4 rounded-3">
            <h3 className="fw-bold">Guidelines</h3>
            <div className="d-flex flex-column mt-4">
              {guidelines.map((guideline) => (
                <Guideline key={guideline.label} {...guideline} />
              ))}
            </div>
            <div className="user_meeting__guideline py-4 d-flex w-100 justify-content-between align-items-start">
              <div className="d-flex w-100">
                <i className="bi-play-circle text-primary  icon fs-4" />
                <div className="ms-4 d-flex flex-column user_meeting__guideline__progress">
                  <span className="fs-5 mb-2">
                    Hand Shapes
                    <i className="bi-info-circle icon fs-5 ms-2" />
                  </span>
                  <div className="d-flex mt-2">
                    <div>
                      <HandOpen size={30} />
                    </div>
                    <div className="ms-4">
                      <HandClose size={30} />
                    </div>
                  </div>
                </div>
              </div>
              {/* <Link to="/optimize/123">
                <button className="btn btn-primary text-light rounded-pill">Practice</button>
              </Link> */}
            </div>
          </div>
        </div>
      </div>
    </UserLayout>
  );
};

export default Training;
