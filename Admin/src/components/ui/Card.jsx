/**
 * @file Card.jsx
 * @description A reusable card component.
 * @component
 */

import React from 'react';

/**
 * @function Card
 * @description A reusable card component.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The content of the card.
 * @param {string} props.className - The class name for the card.
 * @returns {React.ReactElement} The card component.
 */
export default function Card({ children, className }) {
  return (
    <div className={`bg-white shadow-md rounded-lg p-6 ${className || ''}`}>
      {children}
    </div>
  );
}
