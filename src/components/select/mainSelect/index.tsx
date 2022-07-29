/* eslint-disable jsx-a11y/no-onchange */
import React from 'react';
import './index.scss';

type props = {
  label: string;
  options: any;
  onSelect: any;
};

export default function MainSelect({ label, options, onSelect }: props) {
  return (
    <div className="form-group main-select">
      <label htmlFor="main-select">{label}</label>
      <select className="form-control" id="main-select" onChange={onSelect}>
        {options.map((option: any, index: number) => (
          <option value={option.value} key={index}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
