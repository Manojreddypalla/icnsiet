/**
 * @file Icons.jsx
 * @description This file is a central library for all SVG icons.
 * @module components/ui/Icons
 */

import React from 'react';

/**
 * @function HomeIcon
 * @description The home icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The home icon.
 */
export const HomeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>;

/**
 * @function FileTextIcon
 * @description The file text icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The file text icon.
 */
export const FileTextIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><line x1="10" y1="9" x2="8" y2="9"></line></svg>;

/**
 * @function UsersIcon
 * @description The users icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The users icon.
 */
export const UsersIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>;

/**
 * @function LogOutIcon
 * @description The log out icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The log out icon.
 */
export const LogOutIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>;

/**
 * @function Spinner
 * @description The spinner icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The spinner icon.
 */
export const Spinner = ({ className }) => <div className={`animate-spin rounded-full border-b-2 ${className}`}></div>;

/**
 * @function MailIcon
 * @description The mail icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The mail icon.
 */
export const MailIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>;

/**
 * @function LockIcon
 * @description The lock icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The lock icon.
 */
export const LockIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>;

/**
 * @function EyeIcon
 * @description The eye icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The eye icon.
 */
export const EyeIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"></path><circle cx="12" cy="12" r="3"></circle></svg>;

/**
 * @function CheckCircleIcon
 * @description The check circle icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The check circle icon.
 */
export const CheckCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

/**
 * @function XCircleIcon
 * @description The x circle icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The x circle icon.
 */
export const XCircleIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>;

/**
 * @function PlusIcon
 * @description The plus icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The plus icon.
 */
export const PlusIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>;

/**
 * @function ClockIcon
 * @description The clock icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The clock icon.
 */
export const ClockIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>;

/**
 * @function CheckIcon
 * @description The check icon.
 * @param {object} props - The component props.
 * @param {string} props.className - The class name for the icon.
 * @returns {React.ReactElement} The check icon.
 */
export const CheckIcon = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polyline points="20 6 9 17 4 12"></polyline></svg>;

