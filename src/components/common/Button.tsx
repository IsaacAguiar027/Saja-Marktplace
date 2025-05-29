import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  icon?: React.ReactNode;
}

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  onClick,
  type = 'button',
  icon,
}: ButtonProps) => {
  const baseClasses = 'rounded-lg font-medium transition-colors duration-200 flex items-center justify-center';
  
  const variantClasses = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white',
    secondary: 'bg-orange-500 hover:bg-orange-600 text-white',
    outline: 'border border-teal-600 text-teal-600 hover:bg-teal-50',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
  };
  
  const sizeClasses = {
    sm: 'text-sm py-1.5 px-3',
    md: 'py-2 px-4',
    lg: 'text-lg py-2.5 px-5',
  };
  
  const disabledClasses = disabled 
    ? 'opacity-50 cursor-not-allowed' 
    : 'cursor-pointer';
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  return (
    <button
      type={type}
      className={`
        ${baseClasses} 
        ${variantClasses[variant]} 
        ${sizeClasses[size]} 
        ${disabledClasses} 
        ${widthClass}
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;