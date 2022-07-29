import React, { useState } from 'react';

type RangeProps = {
  label: string;
  id: string;
  onChange?: any;
};

const Range = ({ label, id, onChange }: RangeProps) => {
  const [range, setRange] = useState(0);

  const _onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
    setRange(Number(e.target.value));
  };

  return (
    <div className="d-flex flex-column range-component">
      <div className="d-flex justify-content-between mb-3">
        <label className="fs-5" htmlFor={id}>
          {label}
        </label>
        <span className="fs-5">{`${range}%`}</span>
      </div>
      <input
        type="range"
        id={id}
        name={id}
        min="0"
        max="100"
        value={range}
        className="w-100"
        onChange={_onChange}
      />
    </div>
  );
};

export default Range;
