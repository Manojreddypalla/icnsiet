import React from "react";
import { Link } from "react-router-dom";

// Status Badge
const StatusBadge = ({ status }) => {
  const baseClasses =
    "px-3 py-0.5 text-xs font-medium rounded-full inline-flex items-center";
  const statusStyles = {
    Pending: "bg-yellow-100 text-yellow-800",
    Accepted: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
  };
  return (
    <span
      className={`${baseClasses} ${
        statusStyles[status] || "bg-gray-100 text-gray-800"
      }`}
    >
      {status}
    </span>
  );
};

// Admin Paper Grid (Box View)
export default function PaperGrid({ papers }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {papers.map((paper) => (
        <Link
          key={paper._id}
          to={`/papers/${paper._id}`}
          className="block bg-white rounded-xl shadow-md border border-gray-200 hover:shadow-xl hover:border-indigo-300 transition-all duration-300 cursor-pointer"
        >
          <div className="p-5 flex flex-col h-full">
            {/* Top section: Status + Date */}
            <div className="flex justify-between items-center mb-3">
              <StatusBadge status={paper.status} />
              <span className="text-xs text-gray-400">
                {new Date(paper.submittedAt).toLocaleDateString()}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-semibold text-gray-900 text-lg mb-2 line-clamp-2">
              {paper.title}
            </h3>

            {/* Author Info */}
            <p className="text-sm text-gray-600 mb-4">
              {paper.authorName}{" "}
              <span className="italic">({paper.affiliation})</span>
            </p>

            {/* Bottom (always aligned) */}
            <div className="mt-auto pt-3 border-t border-gray-100 text-sm text-indigo-600 font-medium">
              View Details →
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
