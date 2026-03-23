'use client';

import React from 'react';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'danger' | 'solid' | 'outline';
};

// Define styles for each variant
const variants: Record<string, string> = {
  primary:
    'flex items-center gap-2 px-5 py-2 rounded-lg bg-[#38393B] text-[#B7B9B7] hover:bg-[#444547] transition-colors font-medium',
  danger:
    'flex items-center gap-2 px-5 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium',
  solid:
    'flex items-center gap-2 px-5 py-2 rounded-full bg-[#A8C7FB] text-[#004A77] hover:bg-[#8FB1F3] transition-colors font-medium',
  outline:
    'flex items-center gap-2 px-5 py-2 rounded-full text-[#7B90B4] hover:bg-[#2A2B2D] transition-colors font-medium',
};

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  className = '',
  children,
  ...props
}) => {
  return (
    <button className={`${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
