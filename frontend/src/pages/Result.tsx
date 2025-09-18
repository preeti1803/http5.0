import React from "react";
import { Volume2, MapPin, Phone, Navigation } from "lucide-react";
import { Buttons } from "../components/Buttons";
import { Badge } from "../components/Badge";

interface Hospital {
  id: string;
  name: string;
  hindiName?: string;
  distance: string;
  address: string;
  hindiAddress?: string;
  phone: string;
  rating?: number;
  availability?: string; // e.g. "24x7"
  services?: string[];
  latitude?: number;
  longitude?: number;
}

interface ResultScreenProps {
  condition: string;
  urgencyLevel: "normal" | "medium" | "emergency";
  advice: string[];
  hospitals: Hospital[];
  onPlayAudio: () => void;
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
  onEmergencyCall,
}) => {
  const currentUrgency = urgencyConfig[urgencyLevel];

  // Voice guidance function
  const speakText = (text: string, lang: "en-IN" | "hi-IN" = "en-IN") => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang; // "en-IN" = Indian English, "hi-IN" = Hindi
      window.speechSynthesis.speak(utterance);
    }
  };

  // Open Google Maps for hospital
  const openMap = (hospital: Hospital) => {
    if (hospital.latitude && hospital.longitude) {
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${hospital.latitude},${hospital.longitude}`,
        "_blank"
      );
    } else {
      // fallback using hospital name
      window.open(
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          hospital.name
        )}`,
        "_blank"
      );
    }
  };

  // Call hospital
  const callHospital = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-6 space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            🩺 Health Assessment Results
          </h1>
          <p className="text-gray-600 text-lg">
            Based on your symptoms, here&apos;s the preliminary assessment.
          </p>
        </div>
                <div className="bg-yellow-50 rounded-2xl p-4 space-y-4 shadow-inner">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-xl font-bold flex items-center gap-2">
              ⚠️ Detected Condition
            </h2>
            <Badge
              text={`${currentUrgency.icon} ${currentUrgency.text}`}
              colorClass={currentUrgency.color}
            />
          </div>
          <p className="text-gray-800 text-lg font-semibold">{condition}</p>

          <div className="flex flex-col sm:flex-row gap-2">
            <button
                  onClick={() => speakText(`Detected condition is ${condition}`, "en-IN")}
                  className="flex-1 bg-[#009688] hover:bg-[#00796b] text-white gap-2 py-2 px-3 rounded-lg flex items-center justify-center"
                >
                  Listen
                  
                </button>

            {urgencyLevel === "emergency" && (
              <Buttons
                className="flex-1"
                variant="danger"
                size="md"
                onClick={onEmergencyCall}
              >
                🚑 Call 108 Emergency
              </Buttons>
            )}
          </div>
        </div>

        {/* Nearby Hospitals */}
        <div className="bg-green-50 rounded-2xl p-4 space-y-4 shadow-inner">
          <h2 className="text-xl font-bold flex items-center gap-2 mb-2">
            🏥 Nearby Hospitals
          </h2>

          {hospitals.map((hospital) => (
            <div
              key={hospital.id}
              className="rounded-xl border bg-white shadow hover:shadow-lg p-4 relative"
            >
              {/* Speaker Icon */}
              <button
                onClick={() =>
                  speakText(
                    `Hospital ${hospital.name}, ${hospital.distance} away. Address: ${hospital.address}`,
                    "en-IN"
                  )
                }
                className="absolute top-3 right-3 text-gray-500 hover:text-blue-600"
              >
                <Volume2 className="w-5 h-5" />
              </button>

              {/* Hospital Info */}
              <div className="mb-3">
                <p className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                  🏥 {hospital.name}
                </p>
                {hospital.hindiName && (
                  <p className="text-sm text-gray-700">{hospital.hindiName}</p>
                )}

                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    <span>{hospital.distance}</span>
                  </div>
                  {hospital.rating && (
                    <div className="flex items-center gap-1">
                      ⭐ <span>{hospital.rating}</span>
                    </div>
                  )}
                  {hospital.availability && (
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-md text-xs font-medium">
                      {hospital.availability}
                    </span>
                  )}
                </div>

                <p className="text-sm text-gray-600 mt-2">{hospital.address}</p>
                {hospital.hindiAddress && (
                  <p className="text-sm text-gray-600">{hospital.hindiAddress}</p>
                )}

                {hospital.services && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-gray-800">
                      Services | सेवाएँ:
                    </p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {hospital.services.map((service, index) => (
                        <span
                          key={index}
                          className="px-2 py-0.5 bg-gray-100 text-gray-700 text-sm rounded-md border"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="flex gap-2 pt-2">
                <button
                  onClick={() => callHospital(hospital.phone)}
                  className="flex-1 bg-[#009688] hover:bg-[#00796b] text-white gap-2 py-2 px-3 rounded-lg flex items-center justify-center"
                >
                  <Phone className="w-4 h-4" />
                  Call | कॉल करें
                </button>
                <button
                  onClick={() => openMap(hospital)}
                  className="flex-1 border border-gray-300 text-gray-700 gap-2 py-2 px-3 rounded-lg flex items-center justify-center hover:bg-gray-100"
                >
                  <Navigation className="w-4 h-4" />
                  Directions | रास्ता
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Detected Condition */}


        {/* Recommendations */}
        <div className="bg-blue-50 rounded-2xl p-4 shadow-inner">
          <h2 className="text-xl font-bold mb-2">💡 Recommendations</h2>
          <ul className="list-decimal list-inside space-y-1 text-gray-700 text-lg">
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
