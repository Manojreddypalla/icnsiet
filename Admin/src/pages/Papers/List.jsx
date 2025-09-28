/**
 * @file List.jsx
 * @description This page displays a list of papers.
 * @component
 */

import AdminLayout from "../../components/layout/AdminLayout";

/**
 * @function PapersList
 * @description This page displays a list of papers.
 * @returns {React.ReactElement} The papers list page.
 */
export default function PapersList() {
  return (
    <AdminLayout>
      <h2 className="text-2xl font-semibold mb-4">Papers</h2>
      <table className="w-full bg-white shadow rounded-xl">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-3">#</th>
            <th className="p-3">Title</th>
            <th className="p-3">Author</th>
            <th className="p-3">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3">1</td>
            <td className="p-3">AI in Education</td>
            <td className="p-3">Dr. Smith</td>
            <td className="p-3">✅ Approved</td>
          </tr>
        </tbody>
      </table>
    </AdminLayout>
  );
}
