import React from 'react';
import { Hospital } from '../types/auth';

interface HospitalCardProps {
  hospital: Hospital;
  onDirectionsClick: (coordinates: { lat: number; lng: number }) => void;
}

const HospitalCard: React.FC<HospitalCardProps> = ({ hospital, onDirectionsClick }) => {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <h3 className="text-lg font-semibold">{hospital.name}</h3>
      <p className="text-gray-600 text-sm mt-1">{hospital.address}</p>
      {hospital.phone && (
        <p className="text-gray-500 text-sm mt-1">📞 {hospital.phone}</p>
      )}
      {hospital.emergency && (
        <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mt-2">
          24/7 Emergency
        </span>
      )}
      <div className="flex items-center justify-between mt-3">
        <span className="text-blue-600">{hospital.distance}km away</span>
        <button
          onClick={() => onDirectionsClick(hospital.coordinates)}
          className="text-blue-500 hover:text-blue-600"
        >
          Get Directions →
        </button>
      </div>
    </div>
  );
};

export default HospitalCard;