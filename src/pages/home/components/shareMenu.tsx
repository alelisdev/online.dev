/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import OutsideAlerter from '../../../components/outsideAlerter';
import { EmailIcon, EmailShareButton, LinkedinIcon, LinkedinShareButton } from 'react-share';
import { CopyButton } from '../../meeting/components/noteColumn';

type IProps = {
  children: any;
  id: any;
};

export default function ShareMenu({ children, id }: IProps) {
  const [isMenu, setIsMenu] = useState(false);

  const handleMenuBtn = (e: any) => {
    e.preventDefault();
    setIsMenu(!isMenu);
  };
  const shareUrl = `${location.origin}/call/${id}`;

  return (
    <div className="position-relative share-menu">
      <a
        className="menu-button"
        href="#"
        role="button"
        id="dropdownMenuLink"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={handleMenuBtn}
      >
        {children}
      </a>
      {isMenu && (
        <OutsideAlerter onClickOutside={() => setIsMenu(false)}>
          <div className={`dropdown-menu ${isMenu && 'd-block'}`} aria-labelledby="btnGroupDrop2">
            <div className="menu-item">
              <CopyButton value={id} isShare></CopyButton>
            </div>
            <div className="menu-item">
              <LinkedinShareButton url={shareUrl}>
                <LinkedinIcon size={40} round />
              </LinkedinShareButton>
            </div>
            <div className="menu-item">
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={40} round />
              </EmailShareButton>
            </div>
          </div>
        </OutsideAlerter>
      )}
    </div>
  );
}
