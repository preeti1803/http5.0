import React, { useState } from "react";
import Card from "../components/Card";
import { Buttons } from "../components/Buttons";
import { useNavigate } from "react-router-dom";

// ---- Types ----
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

export default function EditProfile() {
  const navigate = useNavigate();

  const initialData: ProfileData = {
    name: "Raj Kumar",
    age: 45,
    gender: "Male",
    bloodGroup: "B+",
    phone: "+91 98765 43210",
    medicalConditions: [
      {
        condition: "Diabetes",
        type: "Type 2",
        severity: "Controlled",
        diagnosed: "2020",
        status: "Active",
      },
    ],
    allergies: [
      {
        allergen: "Penicillin",
        type: "Drug Allergy",
        reaction: "Skin rash",
        severity: "Severe",
      },
    ],
    emergencyContact: {
      name: "Dr. Ram Prasad",
      relation: "Family Doctor",
      phone: "+91 98765 43210",
    },
  };

  const [formData, setFormData] = useState<ProfileData>(() => {
    const saved = localStorage.getItem("profileData");
    return saved ? (JSON.parse(saved) as ProfileData) : initialData;
  });

  // ---- Handlers ----
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }) as ProfileData);
  };

  const handleMCChange = (
    index: number,
    field: keyof MedicalCondition,
    value: string
  ) => {
    const updated = [...formData.medicalConditions];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, medicalConditions: updated });
  };

  const handleAllergyChange = (index: number, field: keyof Allergy, value: string) => {
    const updated = [...formData.allergies];
    updated[index] = { ...updated[index], [field]: value };
    setFormData({ ...formData, allergies: updated });
  };

  const handleEmergencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      emergencyContact: { ...formData.emergencyContact, [name]: value },
    });
  };

  const handleSave = () => {
    localStorage.setItem("profileData", JSON.stringify(formData));
    navigate("/profile");
  };

  // ---- Add / Delete Handlers ----
  const addMedicalCondition = () => {
    const newMC: MedicalCondition = {
      condition: "",
      type: "",
      severity: "",
      diagnosed: "",
      status: "",
    };
    setFormData({
      ...formData,
      medicalConditions: [...formData.medicalConditions, newMC],
    });
  };

  const addAllergy = () => {
    const newAllergy: Allergy = {
      allergen: "",
      type: "",
      reaction: "",
      severity: "",
    };
    setFormData({
      ...formData,
      allergies: [...formData.allergies, newAllergy],
    });
  };

  const deleteMedicalCondition = (index: number) => {
    const updated = formData.medicalConditions.filter((_, i) => i !== index);
    setFormData({ ...formData, medicalConditions: updated });
  };

  const deleteAllergy = (index: number) => {
    const updated = formData.allergies.filter((_, i) => i !== index);
    setFormData({ ...formData, allergies: updated });
  };

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-6">
      <Card className="p-6 w-full max-w-3xl bg-white shadow-xl rounded-2xl space-y-6">
        <h1 className="text-xl font-bold text-center">Edit Profile</h1>

        {/* Personal Info */}
        <div>
          <label className="block font-semibold">Name</label>
          <input
            className="w-full p-2 border rounded-lg"
            name="name"
            value={formData.name}
            onChange={handleBasicChange}
          />
          <label className="block font-semibold mt-3">Age</label>
          <input
            className="w-full p-2 border rounded-lg"
            name="age"
            value={formData.age}
            onChange={handleBasicChange}
          />
          <label className="block font-semibold mt-3">Gender</label>
          <input
            className="w-full p-2 border rounded-lg"
            name="gender"
            value={formData.gender}
            onChange={handleBasicChange}
          />
          <label className="block font-semibold mt-3">Blood Group</label>
          <input
            className="w-full p-2 border rounded-lg"
            name="bloodGroup"
            value={formData.bloodGroup}
            onChange={handleBasicChange}
          />
          <label className="block font-semibold mt-3">Phone</label>
          <input
            className="w-full p-2 border rounded-lg"
            name="phone"
            value={formData.phone}
            onChange={handleBasicChange}
          />
        </div>

        {/* Medical Conditions */}
        <div>
          <h2 className="text-lg font-bold mb-2">Medical Conditions</h2>
          {formData.medicalConditions.map((mc, idx) => (
            <div key={idx} className="border p-3 rounded-lg mb-3 bg-gray-50 relative">
              <button
                className="absolute top-2 right-2 text-red-500 font-bold"
                onClick={() => deleteMedicalCondition(idx)}
              >
                ✕
              </button>
              <input
                className="w-full p-2 border rounded mb-2"
                value={mc.condition}
                onChange={(e) => handleMCChange(idx, "condition", e.target.value)}
                placeholder="Condition (e.g., Diabetes)"
              />
              <input
                className="w-full p-2 border rounded mb-2"
                value={mc.type}
                onChange={(e) => handleMCChange(idx, "type", e.target.value)}
                placeholder="Type (e.g., Type 2)"
              />
              <input
                className="w-full p-2 border rounded mb-2"
                value={mc.severity}
                onChange={(e) => handleMCChange(idx, "severity", e.target.value)}
                placeholder="Severity (e.g., Mild)"
              />
              <input
                className="w-full p-2 border rounded mb-2"
                value={mc.diagnosed}
                onChange={(e) => handleMCChange(idx, "diagnosed", e.target.value)}
                placeholder="Diagnosed Year"
              />
              <input
                className="w-full p-2 border rounded"
                value={mc.status}
                onChange={(e) => handleMCChange(idx, "status", e.target.value)}
                placeholder="Status (Active/Inactive)"
              />
            </div>
          ))}
          <div className="text-right">
            <Buttons variant="secondary" onClick={addMedicalCondition}>
              + Add Condition
            </Buttons>
          </div>
        </div>

        {/* Allergies */}
        <div>
          <h2 className="text-lg font-bold mb-2">Allergies</h2>
          {formData.allergies.map((allergy, idx) => (
            <div key={idx} className="border p-3 rounded-lg mb-3 bg-yellow-50 relative">
              <button
                className="absolute top-2 right-2 text-red-500 font-bold"
                onClick={() => deleteAllergy(idx)}
              >
                ✕
              </button>
              <input
                className="w-full p-2 border rounded mb-2"
                value={allergy.allergen}
                onChange={(e) => handleAllergyChange(idx, "allergen", e.target.value)}
                placeholder="Allergen (e.g., Peanuts)"
              />
              <input
                className="w-full p-2 border rounded mb-2"
                value={allergy.type}
                onChange={(e) => handleAllergyChange(idx, "type", e.target.value)}
                placeholder="Type (e.g., Food Allergy)"
              />
              <input
                className="w-full p-2 border rounded mb-2"
                value={allergy.reaction}
                onChange={(e) => handleAllergyChange(idx, "reaction", e.target.value)}
                placeholder="Reaction (e.g., Rash, swelling)"
              />
              <input
                className="w-full p-2 border rounded"
                value={allergy.severity}
                onChange={(e) => handleAllergyChange(idx, "severity", e.target.value)}
                placeholder="Severity (Mild/Severe)"
              />
            </div>
          ))}
          <div className="text-right">
            <Buttons variant="secondary" onClick={addAllergy}>
              + Add Allergy
            </Buttons>
          </div>
        </div>

        {/* Emergency Contact */}
        <div>
          <h2 className="text-lg font-bold mb-2">Emergency Contact</h2>
          <input
            className="w-full p-2 border rounded mb-2"
            name="name"
            value={formData.emergencyContact.name}
            onChange={handleEmergencyChange}
            placeholder="Contact Name"
          />
          <input
            className="w-full p-2 border rounded mb-2"
            name="relation"
            value={formData.emergencyContact.relation}
            onChange={handleEmergencyChange}
            placeholder="Relation (e.g., Family Doctor)"
          />
          <input
            className="w-full p-2 border rounded"
            name="phone"
            value={formData.emergencyContact.phone}
            onChange={handleEmergencyChange}
            placeholder="Phone Number"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between pt-4">
          <Buttons variant="secondary" onClick={() => window.history.back()}>
            Cancel
          </Buttons>
          <Buttons variant="primary" onClick={handleSave}>
            Save
          </Buttons>
        </div>
      </Card>
    </div>
  );
}

export { EditProfile };
