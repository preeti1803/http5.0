import React from "react";
import { Buttons } from "../components/Buttons";
import { Badge } from "../components/Badge";

interface Hospital {
  id: string;
  name: string;
  distance: string;
  address: string;
}

interface ResultScreenProps {
  condition: string;
  urgencyLevel: "normal" | "medium" | "emergency";
  advice: string[];
  hospitals: Hospital[];
  onPlayAudio: () => void;
  onShowMap: (hospitalId: string) => void;
  onEmergencyCall: () => void;
}

const urgencyConfig = {
  normal: { color: "bg-green-500", text: "Normal", icon: "✅" },
  medium: { color: "bg-yellow-500", text: "Monitor", icon: "⚠️" },
  emergency: { color: "bg-red-500", text: "Emergency", icon: "🚨" },
};

export const Result: React.FC<ResultScreenProps> = ({
  condition,
  urgencyLevel,
  advice,
  hospitals,
  onPlayAudio,
  onShowMap,
  onEmergencyCall,
}) => {
  const currentUrgency = urgencyConfig[urgencyLevel];

  return (
    <div className="min-h-screen bg-blue-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center mb-2">Health Assessment Results</h1>
        <p className="text-center text-gray-600 mb-4">
          Based on your symptoms, here's the preliminary assessment.
        </p>

        {/* Nearby Hospitals */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-2">
          <h2 className="text-lg font-bold flex items-center gap-2">🏥 Nearby Hospitals</h2>
          {hospitals.map((hospital) => (
            <div key={hospital.id} className="border-b last:border-b-0 py-2">
              <p className="font-semibold">{hospital.name}</p>
              <p className="text-sm text-gray-600">{hospital.address}</p>
              <p className="text-sm text-gray-500">Distance: {hospital.distance}</p>
              <Buttons variant="secondary" size="md" className="w-60">
              📍 Show Map
</Buttons>
            </div>
          ))}
        </div>

        {/* Detected Condition */}
        <div className="bg-gray-100 rounded-xl p-4 space-y-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2">🩺 Detected Condition</h2>
            <Badge
              text={`${currentUrgency.icon} ${currentUrgency.text}`}
              colorClass={currentUrgency.color}
            />
          </div>
          <p className="text-gray-700 text-lg font-semibold">{condition}</p>
          <Buttons className = "w-60" variant="primary" size="md" onClick={onPlayAudio}>
            🔊 Listen
          </Buttons>
          {urgencyLevel === "emergency" && (
            <Buttons
              className="mt-2 w-full"
              variant="danger"
              onClick={onEmergencyCall}
            >
              🚑 Call 108 Emergency
            </Buttons>
          )}
        </div>

        {/* Recommendations */}
        <div className="bg-gray-100 rounded-xl p-4">
          <h2 className="text-lg font-bold mb-2">💡 Recommendations</h2>
          <ul className="list-decimal list-inside space-y-1 text-gray-700">
            {advice.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Result;
