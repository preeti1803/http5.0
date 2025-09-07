import React from "react";

export const FeatureCard = ({ children, className }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-4 sm:p-6 ${className}`}>
      {children}
    </div>
  );
};
export default FeatureCard;