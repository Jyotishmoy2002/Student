import React from 'react';

export const Badge = ({ children, type = "neutral" }) => {
  const styles = {
    success: "bg-green-100 text-green-700",
    warning: "bg-yellow-100 text-yellow-700",
    error: "bg-red-100 text-red-700",
    neutral: "bg-gray-100 text-gray-700",
    primary: "bg-blue-100 text-blue-700"
  };
  return (
    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[type] || styles.neutral}`}>
      {children}
    </span>
  );
};