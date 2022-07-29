import * as React from 'react';
import { IconProps } from '../../types/icon';

function UserLoggedIn({ size, color }: IconProps) {
  return (
    <svg
      width={size}
      height={1.25 * size}
      viewBox="0 0 16 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 0C5.247 0 3 2.247 3 5s2.247 5 5 5c2.752 0 5-2.247 5-5s-2.248-5-5-5zM2.25 12A2.261 2.261 0 000 14.25v.6c0 1.47.932 2.789 2.354 3.696C3.777 19.453 5.722 20 8 20s4.223-.547 5.646-1.454C15.068 17.639 16 16.32 16 14.85v-.6A2.261 2.261 0 0013.75 12H2.25z"
        fill={color}
      />
    </svg>
  );
}

export default UserLoggedIn;
