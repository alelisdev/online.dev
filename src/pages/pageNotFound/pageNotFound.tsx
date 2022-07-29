import React from 'react';
import UserLayout from '../../components/layout/user';

export default function PageNotFound() {
  return (
    <UserLayout>
      <div className="d-flex flex-column align-items-center mt-5">
        <h2>404, Page no found</h2>
        <a href="/home">Back to home</a>
      </div>
    </UserLayout>
  );
}
