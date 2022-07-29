import * as React from 'react';
import type { IconProps } from '../../types/icon';

function Facebook({ size }: IconProps) {
  return (
    <svg
      data-name="facebook (5)"
      xmlns="http://www.w3.org/2000/svg"
      width={size * 1}
      height={size}
      viewBox="0 0 38 38"
    >
      <circle data-name="Elipse 17" cx={19} cy={19} r={19} fill="#417cf7" />
      <path
        data-name="Trazado 43"
        d="M23.777 19.744h-3.39v12.421H15.25V19.744h-2.443v-4.365h2.443v-2.825c0-2.02.96-5.183 5.182-5.183l3.8.016v4.237h-2.755a1.046 1.046 0 00-1.09 1.19v2.569h3.839z"
        fill="#fff"
      />
    </svg>
  );
}

export default Facebook;
