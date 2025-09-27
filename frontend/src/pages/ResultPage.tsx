import React, { useContext } from "react";
import { HospitalContext } from "../Context/HospitalContext";

const ResultPage: React.FC = () => {
  const { hospitals } = useContext(HospitalContext);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Search Results</h2>
      {hospitals.length > 0 ? (
        hospitals.map((h) => (
          <div
            key={h.id}
            className="p-4 mb-3 border rounded-lg shadow hover:shadow-md transition"
          >
            <h3 className="font-semibold">{h.name}</h3>
            <p className="text-gray-600">{h.city}</p>
            <p className="text-gray-500">{h.address}</p>
          </div>
        ))
      ) : (
        <p>No hospitals found.</p>
      )}
    </div>
  );
};

export default ResultPage;
