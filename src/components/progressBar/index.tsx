import React from 'react';

type ProgressBar = {
  percentage: number;
};

const ProgressBar = ({ percentage }: ProgressBar) => {
  const calculate = Math.round((percentage / 100) * 12);

  const isGood = percentage >= 80;

  return (
    <div className="d-flex align-items-center justify-content-between progress_bar">
      <div className="d-flex">
        {Array.from(Array(12).keys()).map((e) => (
          <div
            key={e}
            className={`me-1 bar ${isGood && calculate >= e && 'active-green'} ${
              !isGood && calculate >= e && 'active-red'
            }`}
          />
        ))}
      </div>
      <span className={`me-1 ${isGood ? 'text-green' : 'text-red'}`}>
        {isGood ? 'Done' : 'Need Adjustments'}
      </span>
    </div>
  );
};

export default ProgressBar;
