import React from 'react';

type InputProps = {
  id: string;
  type: string;
  name?: string;
  icon?: string;
  placeholder?: string;
  label?: string;
  aria?: string;
  helperText?: string;
  onChange: any;
  required?: boolean;
};

//TODO add here general styles

const Input = ({
  label,
  id,
  type,
  name,
  aria,
  helperText,
  placeholder,
  icon,
  onChange,
  required,
}: InputProps) => {
  return (
    <div className="input-component">
      {label && (
        <label htmlFor={id} className="form-label fs-6">
          {label}
        </label>
      )}
      <div className="input-component__container">
        {icon && <i className={`bi-${icon} icon`}></i>}
        <input
          type={type}
          className="form-control fs-6"
          name={name}
          id={id}
          aria-describedby={aria}
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      </div>
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default Input;
