import React from 'react';

const cn = (...classes) => {
  return classes.filter(Boolean).join(' ');
};

export const Badge = ({ className = '', children, ...props }) => (
  <span 
    className={cn(
      'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
      'bg-blue-100 text-blue-800',
      className
    )}
    {...props}
  >
    {children}
  </span>
);
