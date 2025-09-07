import React, { useEffect, useState } from "react";
import Card from "../components/Card";
import { Badge } from "../components/Badge";
import { Buttons } from "../components/Buttons";
import { motion } from "framer-motion";
import { User, Award, Heart, Phone } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface MedicalCondition {
  condition: string;
  type: string;
  severity: string;
  diagnosed: string;
  status: string;
}

interface Allergy {
  allergen: string;
  type: string;
  reaction: string;
  severity: string;
}

interface EmergencyContact {
  name: string;
  relation: string;
  phone: string;
}

interface ProfileData {
  name: string;
  age: number;
  gender: string;
  bloodGroup: string;
  phone: string;
  medicalConditions: MedicalCondition[];
  allergies: Allergy[];
  emergencyContact: EmergencyContact;
}

interface ProfileScreenProps {
  dailyStreak: number;
}

export function Profile({ dailyStreak }: ProfileScreenProps) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("profileData");
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      // fallback default profile
      setProfile({
        name: "Raj Kumar",
        age: 45,
        gender: "Male",
        bloodGroup: "B+",
        phone: "+91 98765 43210",
        medicalConditions: [
          { condition: "Diabetes", type: "Type 2", severity: "Controlled", diagnosed: "2020", status: "Active" },
        ],
        allergies: [
          { allergen: "Penicillin", type: "Drug Allergy", reaction: "Skin rash", severity: "Severe" },
        ],
        emergencyContact: {
          name: "Dr. Ram Prasad",
          relation: "Family Doctor",
          phone: "+91 98765 43210",
        },
      });
    }
  }, []);

  if (!profile) return <p>Loading...</p>;

  // Achievements (kept static)
  const achievements = [
    { icon: "🔥", title: "Health Streak", description: `${dailyStreak} days in a row`, earned: true },
    { icon: "🏆", title: "Health Champion", description: "10+ consultations", earned: true },
    { icon: "📚", title: "Knowledge Seeker", description: "50+ tips read", earned: true },
    { icon: "🎯", title: "Regular User", description: "Active for 30 days", earned: false },
  ];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <Card className="p-6 w-full max-w-4xl bg-white shadow-xl rounded-2xl space-y-6">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-2xl font-bold mb-1">My Health Profile</h1>
          <p className="text-gray-600">Personal Health Information</p>
        </motion.div>

        {/* Personal Info */}
        <div>
          <h2 className="text-lg font-bold flex items-center mb-3">
            <User className="w-5 h-5 mr-2 text-blue-600" /> Personal Information
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Name</p>
              <p className="font-bold">{profile.name}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-bold">{profile.age} years</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-bold">{profile.gender}</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600">Blood Group</p>
              <p className="font-bold text-red-600">{profile.bloodGroup}</p>
            </div>
          </div>
        </div>

        {/* Medical Conditions */}
        <div>
          <h2 className="text-lg font-bold flex items-center mb-3">
            <Heart className="w-5 h-5 mr-2 text-green-600" /> Medical History
          </h2>
          {profile.medicalConditions.map((condition, index) => (
            <div key={index} className="p-3 mb-2 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex justify-between items-center">
                <p className="font-bold">{condition.condition}</p>
                <Badge colorClass="bg-red-500">{condition.status}</Badge>
              </div>
              <p className="text-sm">Type: {condition.type}</p>
              <p className="text-sm">Severity: {condition.severity}</p>
              <p className="text-sm">Diagnosed: {condition.diagnosed}</p>
            </div>
          ))}
        </div>

        {/* Allergies */}
        <div>
          <h2 className="text-lg font-bold mb-3">⚠️ Allergies</h2>
          {profile.allergies.map((allergy, index) => (
            <div key={index} className="p-3 mb-2 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="font-bold">{allergy.allergen}</p>
              <p className="text-sm">Type: {allergy.type}</p>
              <p className="text-sm">Reaction: {allergy.reaction}</p>
              <Badge
                colorClass={allergy.severity === "Severe" ? "bg-red-500" : "bg-yellow-500"}
                className="mt-1"
              >
                {allergy.severity}
              </Badge>
            </div>
          ))}
        </div>

        {/* Achievements */}
        <div>
          <h2 className="text-lg font-bold flex items-center mb-3">
            <Award className="w-5 h-5 mr-2 text-orange-600" /> Achievements
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {achievements.map((achievement, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg text-center ${
                  achievement.earned ? "bg-green-50 border border-green-200" : "bg-gray-100 opacity-70"
                }`}
              >
                <div className="text-2xl">{achievement.icon}</div>
                <p className="font-bold">{achievement.title}</p>
                <p className="text-sm">{achievement.description}</p>
                {achievement.earned && <Badge colorClass="bg-green-500">Earned ✓</Badge>}
              </div>
            ))}
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h2 className="text-lg font-bold flex items-center mb-3">
            <Phone className="w-5 h-5 mr-2 text-red-600" /> Emergency Contact
          </h2>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-2">
            <p className="font-bold">{profile.emergencyContact.relation}</p>
            <p>{profile.emergencyContact.name}</p>
            <p className="text-sm text-gray-600">{profile.emergencyContact.phone}</p>
            <Buttons variant="secondary" size="sm" className="mt-2">📞 Call</Buttons>
          </div>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="font-bold">Emergency</p>
            <p>Ambulance Service</p>
            <p className="text-sm text-gray-600 font-bold">108</p>
            <Buttons variant="danger" size="sm" className="mt-2">🚑 Call Now</Buttons>
          </div>
        </div>

        {/* Edit Profile Button */}
        <div className="pt-4 flex justify-center">
          <Buttons variant="primary" size="md" onClick={() => navigate("/edit-profile")}>
            Edit Your Profile
          </Buttons>
        </div>
      </Card>
    </div>
  );
}

export default Profile;
