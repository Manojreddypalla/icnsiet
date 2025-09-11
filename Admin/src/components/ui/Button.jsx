/**
 * @file Button.jsx
 * @description A reusable button component.
 * @component
 */

import React from 'react';

/**
 * @function Button
 * @description A reusable button component.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the button.
 * @param {function} props.onClick - The function to call when the button is clicked.
 * @param {string} props.className - The class name for the button.
 * @param {string} props.type - The type of the button.
 * @returns {React.ReactElement} The button component.
 */
export default function Button({ children, onClick, className, type = 'button' }) {
  const baseClasses = 'px-4 py-2 font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variantClasses = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const appliedClasses = `${baseClasses} ${variantClasses.primary} ${className || ''}`;

  return (
    <button type={type} onClick={onClick} className={appliedClasses}>
      {children}
    </button>
  );
}
