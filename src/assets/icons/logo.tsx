import * as React from 'react';
import type { IconProps } from '../../types/icon';

function Logo({ size, theme }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={4.53 * size}
      height={size}
      viewBox="0 0 236.443 52.153"
    >
      <defs>
        <linearGradient
          id="prefix__a"
          x1={0.803}
          y1={0.371}
          x2={0}
          y2={0.5}
          gradientUnits="objectBoundingBox"
        >
          <stop offset={0} stopColor="#2f83e7" />
          <stop offset={1} stopColor="#9832e7" />
        </linearGradient>
      </defs>
      <g data-name="Grupo 18226">
        <text
          transform="translate(1 41.49)"
          fill={theme === 'Dark' ? '#fff' : '#8c9191'}
          fontSize={41}
          fontFamily="Montserrat-Bold, Montserrat"
          fontWeight={700}
        >
          <tspan x={0} y={0}>
            {'AFFECT'}
          </tspan>
        </text>
        <path
          data-name="Uni\xF3n 49"
          d="M15.751 50.1a25.668 25.668 0 01-8.2-5.588 26.331 26.331 0 01-5.524-28.586 25.992 25.992 0 015.527-8.289 25.668 25.668 0 018.2-5.588 25.61 25.61 0 0120.076 0 25.668 25.668 0 018.2 5.588 26.366 26.366 0 012.047 2.329l-4.757 4.313-.021.676a19.447 19.447 0 00-2.068-2.473 18.921 18.921 0 00-6.04-4.119 18.858 18.858 0 00-14.793 0 18.921 18.921 0 00-6.04 4.119 19.354 19.354 0 000 27.188 18.922 18.922 0 006.04 4.12 18.858 18.858 0 0014.793 0 18.922 18.922 0 006.04-4.12 19.566 19.566 0 001.345-1.509l-.006.188 4.427 5.135c-.315.355-.64.7-.967 1.031a25.668 25.668 0 01-8.2 5.588 25.61 25.61 0 01-20.076 0zm25.565-20.755l-8.433 8.528L29.65 34.6l8.433-8.527-8.433-8.523 3.234-3.27 8.432 8.527 8.433-8.527 3.234 3.27-8.433 8.527 8.432 8.523-3.233 3.27z"
          transform="translate(183.461)"
          fill="url(#prefix__a)"
        />
      </g>
    </svg>
  );
}

export default Logo;
