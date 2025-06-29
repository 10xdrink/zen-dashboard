import React from 'react';

interface RupeeIconProps {
  className?: string;
}

const RupeeIcon: React.FC<RupeeIconProps> = ({ className }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M6 3h12M6 8h12M6 13l8.5 8M15 8c0 3-2 5-5 5H6" />
    </svg>
  );
};

export default RupeeIcon;
