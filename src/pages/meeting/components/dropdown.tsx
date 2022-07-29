import React, { useState } from 'react';

type DropdownProps = {
  children: React.ReactElement;
  title: string;
};

const Dropdown = ({ children, title }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={`rounded-3 p-4 d-flex flex-column dropdown-meeting ${!isOpen && 'is-closed'}`}>
      <div
        className="d-flex justify-content-between align-items-center pb-4"
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={() => setIsOpen(!isOpen)}
        role="presentation"
        aria-label="dropdown-header"
      >
        <span className="fs-5 fw-bold">{title}</span>
        <div
          className={`rounded-circle dropdown-meeting_toggle_button d-flex align-items-center justify-content-center ${
            isOpen && 'is-open'
          }`}
        >
          <i className="bi-triangle-fill" style={{ fontSize: '12px' }} />
        </div>
      </div>
      <div className={`dropdown-meeting_content ${isOpen && 'is-open'}`}>{children}</div>
    </div>
  );
};

export default Dropdown;
