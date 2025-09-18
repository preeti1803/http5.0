import React, { useState } from "react";
import { Play, Download, Calendar, Mic, FileText, Filter } from "lucide-react";

// -----------------
// Reusable UI Components
// -----------------
type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "solid" | "outline";
  size?: "sm" | "md";
};

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "solid",
  size = "md",
  className = "",
  ...props
}) => {
  const base =
    "inline-flex items-center justify-center font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-2";
  const variants =
    variant === "solid"
      ? "bg-[#009688] text-white hover:bg-[#00796b] focus:ring-[#009688]"
      : "border border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-gray-300";
  const sizes =
    size === "sm"
      ? "px-3 py-1.5 text-sm"
      : "px-4 py-2 text-sm md:text-base";
  return (
    <button className={`${base} ${variants} ${sizes} ${className}`} {...props}>
      {children}
    </button>
  );
};

const Card: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <div className={`bg-white border rounded-xl shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader: React.FC<{ className?: string; children: React.ReactNode }> =
  ({ className, children }) => (
    <div className={`p-4 border-b ${className}`}>{children}</div>
  );

const CardContent: React.FC<{ className?: string; children: React.ReactNode }> =
  ({ className, children }) => (
    <div className={`p-4 ${className}`}>{children}</div>
  );

const CardTitle: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => <h3 className={`font-semibold text-gray-900 ${className}`}>{children}</h3>;

const Badge: React.FC<{ className?: string; children: React.ReactNode }> = ({
  className,
  children,
}) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
};

const Select: React.FC<SelectProps> = ({ value, onChange, options }) => (
  <select
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#009688]"
  >
    {options.map((opt) => (
      <option key={opt.value} value={opt.value}>
        {opt.label}
      </option>
    ))}
  </select>
);

// -----------------
// Main Component
// -----------------
export function MyRecords() {
  const [filter, setFilter] = useState("all");

  const healthRecords = [
    {
      id: 1,
      date: "2024-08-15",
      time: "14:30",
      type: "voice-check",
      symptoms: "Headache and fever",
      symptomsHindi: "सिरदर्द और बुखार",
      advice:
        "Rest, drink fluids, take paracetamol. If symptoms persist, consult doctor.",
      adviceHindi:
        "आराम करें, तरल पदार्थ पिएं, पैरासिटामोल लें। लक्षण बने रहें तो डॉक्टर से मिलें।",
      severity: "medium",
      audioAvailable: true,
      pdfGenerated: false,
    },
    {
      id: 2,
      date: "2024-08-12",
      time: "09:15",
      type: "emergency",
      symptoms: "Chest pain during exercise",
      symptomsHindi: "व्यायाम के दौरान छाती में दर्द",
      advice:
        "Stop exercise immediately. Rest and monitor. Consult cardiologist soon.",
      adviceHindi:
        "व्यायाम तुरंत बंद करें। आराम करें और निगरानी रखें। जल्दी हृदय रोग विशेषज्ञ से मिलें।",
      severity: "high",
      audioAvailable: true,
      pdfGenerated: true,
    },
    {
      id: 3,
      date: "2024-08-10",
      time: "16:45",
      type: "voice-check",
      symptoms: "Mild stomach ache",
      symptomsHindi: "पेट में हल्का दर्द",
      advice: "Avoid spicy food. Drink warm water. Take light meals.",
      adviceHindi:
        "मसालेदार खाना न खाएं। गर्म पानी पिएं। हल्का खाना लें।",
      severity: "low",
      audioAvailable: false,
      pdfGenerated: true,
    },
  ];

  const filteredRecords =
    filter === "all"
      ? healthRecords
      : healthRecords.filter((record) => record.type === filter);

  const playAudio = (record: (typeof healthRecords)[0]) => {
    if ("speechSynthesis" in window) {
      const text = `Health record from ${record.date}. Symptoms: ${record.symptoms}. Advice: ${record.advice}`;
      const utterance = new SpeechSynthesisUtterance(text);
      speechSynthesis.speak(utterance);
    }
  };

  const downloadPDF = (record: (typeof healthRecords)[0]) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        `Downloading PDF for ${record.date} health record.`
      );
      speechSynthesis.speak(utterance);
    }
    alert(`Downloading PDF for record from ${record.date}`);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-4xl mb-4">📊</div>
          <h2 className="text-2xl mb-2 text-gray-900">My Health Records</h2>
          <p className="text-lg text-[#009688]">मेरे स्वास्थ्य रिकॉर्ड</p>
          <p className="text-gray-600 mt-2">
            Your personal health history and advice log
          </p>
          <p className="text-gray-600">आपका व्यक्तिगत स्वास्थ्य इतिहास और सलाह लॉग</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Card>
            <CardContent className="text-center">
              <div className="text-2xl mb-2 text-[#009688]">
                {healthRecords.length}
              </div>
              <p className="text-sm text-gray-600">Total Records</p>
              <p className="text-xs text-gray-500">कुल रिकॉर्ड</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center">
              <div className="text-2xl mb-2 text-blue-600">
                {healthRecords.filter((r) => r.type === "voice-check").length}
              </div>
              <p className="text-sm text-gray-600">Voice Checks</p>
              <p className="text-xs text-gray-500">वॉयस चेक</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="text-center">
              <div className="text-2xl mb-2 text-red-600">
                {healthRecords.filter((r) => r.severity === "high").length}
              </div>
              <p className="text-sm text-gray-600">High Priority</p>
              <p className="text-xs text-gray-500">उच्च प्राथमिकता</p>
            </CardContent>
          </Card>
        </div>

        {/* Filter */}
        <Card className="mb-6">
          <CardContent>
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <Select
                  value={filter}
                  onChange={setFilter}
                  options={[
                    { value: "all", label: "All Records | सभी रिकॉर्ड" },
                    { value: "voice-check", label: "Voice Checks | वॉयस चेक" },
                    { value: "emergency", label: "Emergency | आपातकाल" },
                  ]}
                />
              </div>
              <Badge className="bg-gray-100 text-gray-700">
                {filteredRecords.length} records
              </Badge>
            </div>
          </CardContent>
        </Card>

        {/* Records List */}
        <div className="space-y-4">
          {filteredRecords.map((record) => (
            <Card key={record.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">
                      {record.type === "voice-check"
                        ? "🎤"
                        : record.type === "emergency"
                        ? "🚑"
                        : "📋"}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <CardTitle>
                          {record.type === "voice-check"
                            ? "Voice Check"
                            : record.type === "emergency"
                            ? "Emergency"
                            : "Other"}
                        </CardTitle>
                        <Badge className={getSeverityColor(record.severity)}>
                          {record.severity}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          <span>{record.date}</span>
                        </div>
                        <span>{record.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="space-y-4">
                  {/* Symptoms */}
                  <div>
                    <h4 className="mb-2 text-gray-900">Symptoms | लक्षण:</h4>
                    <p className="text-gray-700 mb-1">{record.symptoms}</p>
                    <p className="text-gray-600 text-sm">
                      {record.symptomsHindi}
                    </p>
                  </div>

                  {/* Advice */}
                  <div>
                    <h4 className="mb-2 text-gray-900">Advice Given | दी गई सलाह:</h4>
                    <p className="text-gray-700 mb-1">{record.advice}</p>
                    <p className="text-gray-600 text-sm">
                      {record.adviceHindi}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                    {record.audioAvailable && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => playAudio(record)}
                        className="gap-2"
                      >
                        <Play className="w-4 h-4" />
                        🔊 Replay Audio
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadPDF(record)}
                      className="gap-2"
                      disabled={!record.pdfGenerated}
                    >
                      <Download className="w-4 h-4" />
                      {record.pdfGenerated
                        ? "Download PDF"
                        : "PDF Generating..."}
                    </Button>

                    {!record.audioAvailable && (
                      <Badge className="bg-gray-100 text-gray-600 flex items-center gap-1">
                        <Mic className="w-3 h-3" />
                        Audio not available
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Export All */}
        <div className="mt-8 text-center">
          <Button
            onClick={() => alert("Exporting all health records as PDF...")}
            className="px-6 py-2 gap-2"
          >
            <FileText className="w-5 h-5" />
            Export All Records | सभी रिकॉर्ड निर्यात करें
          </Button>
        </div>
      </div>
    </div>
  );
}
