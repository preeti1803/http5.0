import React from 'react';

interface BannerProps {
  type: 'success' | 'warning' | 'error';
  message: string;
  onClose?: () => void;
}

const Banner: React.FC<BannerProps> = ({ type, message, onClose }) => {
  const bgColor = {
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    error: 'bg-red-100 text-red-800'
  }[type];

  return (
    <div className={`p-4 rounded-lg ${bgColor} relative`}>
      <p>{message}</p>
      {onClose && (
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          ✕
        </button>
      )}
    </div>
  );
};

export default Banner;