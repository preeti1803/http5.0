import React, { useState } from "react";
import { Calendar, FileText, Activity, Hospital, Pill } from "lucide-react";

export function History() {
  const [filter, setFilter] = useState("all");

  const historyRecords = [
    {
      id: 1,
      date: "2024-08-01",
      hospital: "City Hospital",
      hospitalHindi: "सिटी हॉस्पिटल",
      doctor: "Dr. Meera Sharma",
      doctorHindi: "डॉ. मीरा शर्मा",
      type: "consultation",
      notes: "Regular checkup, prescribed vitamins",
      notesHindi: "नियमित जांच, विटामिन लिखे गए",
    },
    {
      id: 2,
      date: "2024-07-20",
      hospital: "Apollo Diagnostics",
      hospitalHindi: "अपोलो डायग्नॉस्टिक्स",
      doctor: "Lab Report",
      doctorHindi: "प्रयोगशाला रिपोर्ट",
      type: "lab-test",
      notes: "Blood test done, cholesterol slightly high",
      notesHindi: "ब्लड टेस्ट किया गया, कोलेस्ट्रॉल थोड़ा अधिक",
    },
    {
      id: 3,
      date: "2024-07-05",
      hospital: "District Hospital",
      hospitalHindi: "जिला अस्पताल",
      doctor: "Dr. Arjun Rao",
      doctorHindi: "डॉ. अर्जुन राव",
      type: "prescription",
      notes: "Prescribed antibiotics for throat infection",
      notesHindi: "गले के संक्रमण के लिए एंटीबायोटिक्स लिखे गए",
    },
  ];

  const filteredHistory =
    filter === "all"
      ? historyRecords
      : historyRecords.filter((record) => record.type === filter);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "consultation":
        return "bg-blue-100 text-blue-800";
      case "lab-test":
        return "bg-purple-100 text-purple-800";
      case "prescription":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "consultation":
        return <Activity className="w-4 h-4" />;
      case "lab-test":
        return <Hospital className="w-4 h-4" />;
      case "prescription":
        return <Pill className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📜</div>
          <h2 className="text-2xl mb-2 text-gray-900">Health History</h2>
          <p className="text-lg text-[#009688]">स्वास्थ्य इतिहास</p>
          <p className="text-gray-600 mt-2">
            Your hospital visits, consultations, and lab tests
          </p>
          <p className="text-gray-600">
            आपकी अस्पताल यात्राएं, परामर्श और लैब टेस्ट
          </p>
        </div>

        {/* Filter */}
        <div className="flex items-center gap-4 mb-6">
          <label className="text-gray-700 font-medium">Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#009688] focus:outline-none"
          >
            <option value="all">All Records | सभी रिकॉर्ड</option>
            <option value="consultation">Consultations | परामर्श</option>
            <option value="lab-test">Lab Tests | लैब टेस्ट</option>
            <option value="prescription">Prescriptions | प्रिस्क्रिप्शन</option>
          </select>
          <span className="ml-auto text-sm text-gray-600">
            {filteredHistory.length} records
          </span>
        </div>

        {/* History List */}
        <div className="space-y-4">
          {filteredHistory.map((record) => (
            <div
              key={record.id}
              className="border rounded-lg bg-white shadow-sm hover:shadow-md transition p-4"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-xl">{getTypeIcon(record.type)}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {record.type === "consultation"
                        ? "Consultation"
                        : record.type === "lab-test"
                        ? "Lab Test"
                        : "Prescription"}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {record.type === "consultation"
                        ? "परामर्श"
                        : record.type === "lab-test"
                        ? "लैब टेस्ट"
                        : "प्रिस्क्रिप्शन"}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 text-xs rounded-full ${getTypeColor(
                    record.type
                  )}`}
                >
                  {record.type}
                </span>
              </div>

              <div className="mt-3 text-sm text-gray-700 space-y-1">
                <p>
                  <strong>📅 Date | तिथि:</strong> {record.date}
                </p>
                <p>
                  <strong>🏥 Hospital | अस्पताल:</strong> {record.hospital} |{" "}
                  {record.hospitalHindi}
                </p>
                <p>
                  <strong>👨‍⚕️ Doctor | डॉक्टर:</strong> {record.doctor} |{" "}
                  {record.doctorHindi}
                </p>
                <p>
                  <strong>📝 Notes | टिप्पणियाँ:</strong> {record.notes} |{" "}
                  {record.notesHindi}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
