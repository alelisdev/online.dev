import React from 'react';
import colours from '../../../scss/badcss.module.scss';

type InputProps = {
  id: string;
  type: string;
  name?: string;
  icon?: string;
  placeholder?: string;
  label?: string;
  aria?: string;
  helperText?: string;
  value: string;
  onChange: any;
  required?: boolean;
  readOnly?: boolean;
  theme: any;
};

const MainInput = ({
  label,
  id,
  type,
  name,
  aria,
  helperText,
  placeholder,
  icon,
  value,
  onChange,
  required,
  readOnly,
  theme,
}: InputProps) => {
  return (
    <div className={`main-input-component`}>
      {label && (
        <label htmlFor={id} className="form-label fs-6">
          {label}
        </label>
      )}
      <div
        className={`main-input-component__container`}
        style={
          theme === 'Light' ? { backgroundColor: colours.light_primary_dark_input } : undefined
        }
      >
        {icon && <i className={`fas fa-${icon} icon`}></i>}
        {type === 'textarea' ? (
          readOnly ? (
            <textarea
              className={`form-control fs-6 ${theme === 'Light' ? 'light-mode' : null}`}
              name={name}
              id={id}
              aria-describedby={aria}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              readOnly
              style={
                theme === 'Light'
                  ? { backgroundColor: colours.light_primary_dark_input }
                  : undefined
              }
            >
              {value}
            </textarea>
          ) : (
            <textarea
              className={`form-control fs-6 ${theme === 'Light' ? 'light-mode' : null}`}
              name={name}
              id={id}
              aria-describedby={aria}
              placeholder={placeholder}
              onChange={onChange}
              required={required}
              style={
                theme === 'Light'
                  ? { backgroundColor: colours.light_primary_dark_input }
                  : undefined
              }
            >
              {value}
            </textarea>
          )
        ) : readOnly ? (
          <input
            type={type}
            className={`form-control fs-6 ${theme === 'Light' ? 'light-mode' : null}`}
            name={name}
            id={id}
            aria-describedby={aria}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            readOnly
            style={
              theme === 'Light' ? { backgroundColor: colours.light_primary_dark_input } : undefined
            }
          />
        ) : (
          <input
            type={type}
            className={`form-control fs-6 ${theme === 'Light' ? 'light-mode' : null}`}
            name={name}
            id={id}
            aria-describedby={aria}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            required={required}
            style={
              theme === 'Light' ? { backgroundColor: colours.light_primary_dark_input } : undefined
            }
          />
        )}
      </div>
      {helperText && <div className="form-text">{helperText}</div>}
    </div>
  );
};

export default MainInput;
