import React from 'react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Button = ({ 
  className = '', 
  variant = 'primary', 
  size = 'md',
  children,
  ...props 
}) => {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 flex items-center justify-center cursor-pointer';
  
  const variants = {
    primary: 'bg-gradient-to-r from-amber-600 to-rose-600 text-white hover:from-amber-700 hover:to-rose-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    outline: 'border border-gray-300 text-gray-900 hover:bg-gray-100',
  };
  
  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
    icon: 'p-2',
  };
  
  return (
    <button 
      className={cn(baseStyles, variants[variant] || variants.primary, sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
