import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Buttons } from "../components/Buttons";

// ---- Types ----
interface ProfileData {
  name: string;
  age: number;
  gender: string;
  medicalConditions: string[];
}

interface HealthTip {
  id: number;
  title: string;
  description: string;
  targetAge?: [number, number]; // optional age range
  gender?: "Male" | "Female";   // optional gender targeting
  conditions?: string[];        // optional medical conditions
}

// Mock patient profile (replace with real data)
const mockProfile: ProfileData = {
  name: "Raj Kumar",
  age: 45,
  gender: "Male",
  medicalConditions: ["Diabetes"],
};

// Mock health tips dataset
const allHealthTips: HealthTip[] = [
  {
    id: 1,
    title: "Stay Hydrated",
    description: "Drink at least 8 glasses of water daily.",
  },
  {
    id: 2,
    title: "Regular Exercise",
    description: "Do 30 minutes of light exercise like walking every day.",
    targetAge: [30, 60],
  },
  {
    id: 3,
    title: "Manage Blood Sugar",
    description: "Monitor your blood sugar regularly and follow diet advice.",
    conditions: ["Diabetes"],
  },
  {
    id: 4,
    title: "Calcium Intake",
    description: "Include milk or other calcium sources for strong bones.",
    gender: "Female",
    targetAge: [30, 60],
  },
  {
    id: 5,
    title: "Regular Checkups",
    description: "Visit your local clinic for routine health checkups annually.",
  },
];

export default function HealthTips() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [tips, setTips] = useState<HealthTip[]>([]);

  useEffect(() => {
    // Simulate fetching profile data (replace with API call)
    setProfile(mockProfile);
  }, []);

  useEffect(() => {
    if (profile) {
      const filteredTips = allHealthTips.filter((tip) => {
        // Filter by age
        if (tip.targetAge) {
          if (profile.age < tip.targetAge[0] || profile.age > tip.targetAge[1]) {
            return false;
          }
        }
        // Filter by gender
        if (tip.gender && tip.gender !== profile.gender) return false;
        // Filter by medical conditions
        if (tip.conditions) {
          const matchesCondition = tip.conditions.some((c) =>
            profile.medicalConditions.includes(c)
          );
          if (!matchesCondition) return false;
        }
        return true;
      });
      setTips(filteredTips);
    }
  }, [profile]);

  return (
    <div className="min-h-screen bg-green-50 p-4 flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4 text-center">Health Tips for You</h1>

      {profile && (
        <Card className="w-full max-w-3xl p-6 bg-white shadow-xl rounded-2xl space-y-4">
          <h2 className="text-xl font-semibold mb-3">
            Hello, {profile.name}!
          </h2>
          <p className="text-gray-700">
            Age: {profile.age} | Gender: {profile.gender}
          </p>
          {profile.medicalConditions.length > 0 && (
            <p className="text-gray-700">
              Conditions: {profile.medicalConditions.join(", ")}
            </p>
          )}
        </Card>
      )}

      <div className="w-full max-w-3xl mt-6 space-y-4">
        {tips.length > 0 ? (
          tips.map((tip) => (
            <Card key={tip.id} className="p-4 bg-green-100 shadow-md rounded-xl">
              <h3 className="font-bold text-lg mb-2">{tip.title}</h3>
              <p className="text-gray-700">{tip.description}</p>
            </Card>
          ))
        ) : (
          <p className="text-gray-500 text-center mt-6">
            No specific tips available for your profile. Stay healthy!
          </p>
        )}
      </div>

      <div className="mt-6">
        <Buttons variant="secondary" onClick={() => window.history.back()}>
          Back
        </Buttons>
      </div>
    </div>
  );
}
