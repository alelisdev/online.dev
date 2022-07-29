import React from 'react';

type SwitchProps = {
  isChecked?: boolean;
  label?: string;
  isInline?: boolean;
  theme?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

const Switch = ({ isChecked, label, isInline, onChange, theme }: SwitchProps) => {
  return (
    <div
      className={`form-check form-switch d-flex ps-0 switch-component ${
        isInline ? '' : 'justify-content-between'
      }`}
    >
      <label className={`form-check-label${theme} fs-5`} htmlFor="flexSwitchCheckDefault">
        {label}
      </label>
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={onChange}
        checked={isChecked}
      />
    </div>
  );
};

export default Switch;
