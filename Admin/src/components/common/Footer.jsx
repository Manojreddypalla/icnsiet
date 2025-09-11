/**
 * @file Footer.jsx
 * @description This component displays the footer for the admin panel.
 * @component
 */
export default function Footer() {
  return (
    <footer className="bg-white shadow-md px-6 py-3 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ICNSIET Admin Panel. All rights reserved.
    </footer>
  );
}
