import React from "react";

interface EmergencyBarProps {
  phoneNumber?: string;
}

export const EmergencyBar: React.FC<EmergencyBarProps> = ({
  phoneNumber = "108",
}) => {
  const handleCall = () => {
    window.location.href = `tel:${phoneNumber}`;
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-red-600 text-white flex items-center justify-between px-4 py-3 shadow-lg">
      <div className="flex items-center space-x-2">
        <span className="text-xl">🚨</span>
        <p className="font-semibold text-lg">
          Emergency? Call {phoneNumber} immediately
        </p>
      </div>
      <button
        onClick={handleCall}
        className="bg-white text-red-600 font-bold px-4 py-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors"
      >
        Call Now
      </button>
    </div>
  );
};
