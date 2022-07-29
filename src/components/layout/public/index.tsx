import React from 'react';

type props = {
  children: React.ReactElement;
};

const PublicLayout = ({ children }: props) => {
  return <div className="public-wrapper">{children}</div>;
};

export default PublicLayout;
