import { IconProps } from '../../types/icon';

function Chart({ size }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={1.12 * size}
      height={size}
      viewBox="0 0 84.076 75.543"
    >
      <path
        data-name="Trazado 60"
        d="M2.5 39.908h12.841L30.396 7.967l11.339 58.07 12.443-35.4 6.084 19.132.108-.132 6.52-9.73h14.686"
        fill="none"
        stroke="#70718b"
        strokeLinecap="round"
        strokeWidth={5}
      />
    </svg>
  );
}

export default Chart;
