import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Globe,
  User,
  Mic,
  Play,
  Bot,
  Smartphone,
  MapPin,
  Ambulance,
  Download,
  Leaf,
  Shield,
  Award,
  Users,
} from "lucide-react";

export function LandingPage() {
  const [selectedLang, setSelectedLang] = useState("EN");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [translations, setTranslations] = useState<{ [key: string]: string }>(
    {}
  );
  const navigate = useNavigate();

  // Google Translate API call
  const translateText = async (text: string, targetLang: string) => {
    try {
      const res = await fetch(
        `https://translation.googleapis.com/language/translate/v2?key=AIzaSyDPeUA6-R4ioNCXaxMkMKQYWO4u-D7TrtQ`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ q: text, target: targetLang.toLowerCase() }),
        }
      );
      const data = await res.json();
      return data.data?.translations[0]?.translatedText || text;
    } catch (err) {
      console.error("Translation failed:", err);
      return text;
    }
  };

  // Translate all UI texts
  const handleLanguageChange = async (langCode: string) => {
    setSelectedLang(langCode);
    setDropdownOpen(false);

    const uiTexts = [
      "Your Voice-First Health Assistant",
      "Accessible healthcare for all – rural, urban, literate, illiterate, disabled.",
      "🎤 Voice Health Check",
      "AI-powered voice symptom analysis",
      "🌐 Multilingual Mode",
      "Support for 22+ Indian languages",
      "🏥 Nearby Hospitals",
      "Find healthcare facilities near you",
      "🚑 Emergency Guidance",
      "Immediate emergency response help",
      "📶 Offline Mode",
      "Works without internet connection",
      "🌿 Local Health Tips",
      "Traditional and modern health advice",
      "Speak to Start",
      "बोलकर शुरुआत करें",
      "Type Symptoms",
      "लक्षण टाइप करें",
      "Main Features",
      "मुख्य विशेषताएं",
      "How It Works",
      "यह कैसे काम करता है",
      "Simple 3-step process to get personalized health guidance",
      "व्यक्तिगत स्वास्थ्य मार्गदर्शन पाने के लिए सरल 3-चरणीय प्रक्रिया",
      "Ministry of Health",
      "स्वास्थ्य मंत्रालय",
      "Digital India",
      "डिजिटल इंडिया",
      "Accessible India",
      "सुगम्य भारत",
      "A Government-supported initiative for accessible healthcare",
      "सुलभ स्वास्थ्य सेवा के लिए सरकार समर्थित पहल",
      "Availability",
      "उपलब्धता",
      "Languages",
      "भाषाएं",
      "Indians",
      "भारतीय",
      "Get Started",
    ];

    const newTranslations: { [key: string]: string } = {};
    for (const text of uiTexts) {
      newTranslations[text] = await translateText(text, langCode);
    }
    setTranslations(newTranslations);
  };

  useEffect(() => {
    handleLanguageChange(selectedLang);
  }, []);

  const handleVoiceStart = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        translations["Voice health check starting. बोलकर शुरुआत करें।"] ||
          "Voice health check starting. बोलकर शुरुआत करें।"
      );
      speechSynthesis.speak(utterance);
    }
  };

  const languages = [
    { code: "EN", name: "English" },
    { code: "HI", name: "हिन्दी" },
    { code: "MR", name: "मराठी" },
    { code: "GU", name: "ગુજરાતી" },
  ];

  const features = [
    {
      icon: Mic,
      title: "🎤 Voice Health Check",
      bgColor: "bg-[#009688]",
      hoverColor: "hover:bg-[#00796b]",
      description: "AI-powered voice symptom analysis",
    },
    {
      icon: Globe,
      title: "🌐 Multilingual Mode",
      bgColor: "bg-[#0D47A1]",
      hoverColor: "hover:bg-[#1565C0]",
      description: "Support for 22+ Indian languages",
    },
    {
      icon: MapPin,
      title: "🏥 Nearby Hospitals",
      bgColor: "bg-[#1565C0]",
      hoverColor: "hover:bg-[#1976D2]",
      description: "Find healthcare facilities near you",
    },
    {
      icon: Ambulance,
      title: "🚑 Emergency Guidance",
      bgColor: "bg-red-600",
      hoverColor: "hover:bg-red-700",
      description: "Immediate emergency response help",
    },
    {
      icon: Download,
      title: "📶 Offline Mode",
      bgColor: "bg-gray-600",
      hoverColor: "hover:bg-gray-700",
      description: "Works without internet connection",
    },
    {
      icon: Leaf,
      title: "🌿 Local Health Tips",
      bgColor: "bg-green-600",
      hoverColor: "hover:bg-green-700",
      description: "Traditional and modern health advice",
    },
  ];

  const steps = [
    {
      icon: Mic,
      title: "Speak or Type Symptoms",
      description:
        "Tell us about your health concerns by voice or text in your preferred language",
      stepNumber: "1",
    },
    {
      icon: Bot,
      title: "AI Understands",
      description: "Our advanced AI analyzes your symptoms and medical history",
      stepNumber: "2",
    },
    {
      icon: Smartphone,
      title: "Get Advice in Voice + Text",
      description:
        "Receive personalized health guidance in audio and text format",
      stepNumber: "3",
    },
  ];

  return (
    <div className="w-full">
      {/* Navbar */}
      <div className="w-full">
        {/* Top strip */}
        <div className="bg-[#0D47A1] text-white py-2 px-4">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <span className="text-sm">
              📞{" "}
              {translations["National Health Helpline: 1075"] ||
                "National Health Helpline: 1075"}
            </span>
            <span className="text-sm">
              {translations["स्वास्थ्य हेल्पलाइन: १०७५"] ||
                "स्वास्थ्य हेल्पलाइन: १०७५"}
            </span>
          </div>
        </div>
        {/* Main navbar */}
        <div className="bg-[#009688] text-white py-4 px-4 relative">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="bg-white rounded-full p-2">
                <div className="w-8 h-8 flex items-center justify-center">
                  <span className="text-[#009688] text-xl">🏥</span>
                </div>
              </div>
              <div>
                <h1 className="text-xl font-semibold">SwasthyaSahayak</h1>
                <p className="text-sm opacity-90">स्वास्थ्य सहायक</p>
              </div>
            </div>

            {/* Language Dropdown + Login */}
            <div className="flex items-center gap-4 relative">
              {/* Language Selector */}
              <div
                className="flex items-center gap-2 border border-white px-3 py-1 rounded-md cursor-pointer relative"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                <Globe className="w-4 h-4" />
                <span>🌐 {selectedLang}</span>
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-12 right-20 bg-white text-gray-800 shadow-lg rounded-md w-40 z-50">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}

              {/* Login Button */}
              <button
                className="border border-white text-white px-4 py-2 rounded-md hover:bg-white hover:text-[#009688] flex items-center gap-2"
                onClick={() => navigate("/login")}
              >
                <User className="w-4 h-4" />
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section
        id="welcome"
        className="bg-gradient-to-b from-[#009688]/5 to-white py-16 px-4"
      >
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl mb-6 text-gray-900">
              {translations["Your Voice-First Health Assistant"] ||
                "Your Voice-First Health Assistant"}
            </h1>
            <h2 className="text-2xl md:text-3xl mb-6 text-[#009688]">
              {translations["आपका वॉयस-फर्स्ट हेल्थ असिस्टेंट"] ||
                "आपका वॉयस-फर्स्ट हेल्थ असिस्टेंट"}
            </h2>
            <p className="text-lg mb-4 text-gray-700 max-w-lg">
              {translations[
                "Accessible healthcare for all – rural, urban, literate, illiterate, disabled."
              ] ||
                "Accessible healthcare for all – rural, urban, literate, illiterate, disabled."}
            </p>
            <p className="text-lg mb-8 text-gray-700 max-w-lg">
              {translations[
                "सभी के लिए सुलभ स्वास्थ्य सेवा – ग्रामीण, शहरी, साक्षर, निरक्षर, विकलांग।"
              ] ||
                "सभी के लिए सुलभ स्वास्थ्य सेवा – ग्रामीण, शहरी, साक्षर, निरक्षर, विकलांग।"}
            </p>
            {/* Start Now Button */}
            <button
              className="bg-[#009688] hover:bg-[#00796b] text-white px-8 py-4 text-lg rounded-lg flex items-center gap-2"
              onClick={() => setModalOpen(true)}
            >
              <Play className="w-5 h-5" />
              {translations["Start Now | अभी शुरू करें"] ||
                "Start Now | अभी शुरू करें"}
            </button>
          </div>
          {/* Hero Image */}
          <div className="flex justify-center">
            <img
              src="https://source.unsplash.com/600x500/?doctor,healthcare"
              alt="Doctor and family using mobile health technology"
              className="rounded-2xl shadow-2xl max-w-md w-full"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-gray-900">
              {translations["Main Features"] || "Main Features"}
            </h2>
            <h3 className="text-2xl text-[#009688]">
              {translations["मुख्य विशेषताएं"] || "मुख्य विशेषताएं"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <button
                  key={index}
                  className={`${feature.bgColor} ${feature.hoverColor} text-white p-14 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-left`}
                >
                  <div className="flex items-center gap-4 mb-4">
                    <IconComponent className="w-8 h-8" />
                    <div>
                      <h3 className="text-xl mb-1">
                        {translations[feature.title] || feature.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-sm opacity-90 mb-2">
                    {translations[feature.description] || feature.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl mb-4 text-gray-900">
              {translations["How It Works"] || "How It Works"}
            </h2>
            <h3 className="text-2xl text-[#009688]">
              {translations["यह कैसे काम करता है"] || "यह कैसे काम करता है"}
            </h3>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div key={index} className="text-center relative">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-16 left-full w-full h-0.5 bg-[#009688]/20 transform -translate-x-1/2 z-0"></div>
                  )}
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-[#009688] text-white rounded-full flex items-center justify-center mx-auto mb-4 text-xl">
                      {step.stepNumber}
                    </div>
                    <div className="w-16 h-16 bg-[#009688]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <IconComponent className="w-8 h-8 text-[#009688]" />
                    </div>
                    <h3 className="text-xl mb-2 text-gray-900">
                      {translations[step.title] || step.title}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {translations[step.description] || step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section
        id="trust"
        className="py-20 bg-gradient-to-r from-[#0D47A1]/5 to-[#009688]/5"
      >
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 border-l-4 border-[#009688]">
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#009688] rounded-full flex items-center justify-center">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">
                    {translations["Ministry of Health"] || "Ministry of Health"}
                  </h3>
                  <p className="text-[#009688]">
                    {translations["स्वास्थ्य मंत्रालय"] || "स्वास्थ्य मंत्रालय"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[#0D47A1] rounded-full flex items-center justify-center">
                  <Award className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">
                    {translations["Digital India"] || "Digital India"}
                  </h3>
                  <p className="text-[#0D47A1]">
                    {translations["डिजिटल इंडिया"] || "डिजिटल इंडिया"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl text-gray-900">
                    {translations["Accessible India"] || "Accessible India"}
                  </h3>
                  <p className="text-green-600">
                    {translations["सुगम्य भारत"] || "सुगम्य भारत"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <div className="mt-12 bg-gradient-to-r from-teal-600 to-blue-700 text-white rounded-2xl shadow-lg p-10 text-center">
        <h2 className="text-xl md:text-2xl font-semibold mb-2">
          IN A Government-supported initiative for accessible healthcare
        </h2>
        <p className="text-sm md:text-base mb-8">
          सुलभ स्वास्थ्य सेवा के लिए सरकार समर्थित पहल
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">10M+</h3>
            <p className="text-sm md:text-base">
              Users Served | उपयोगकर्ताओं की सेवा
            </p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">22+</h3>
            <p className="text-sm md:text-base">Languages | भाषाएं</p>
          </div>
          <div>
            <h3 className="text-3xl md:text-4xl font-bold">24/7</h3>
            <p className="text-sm md:text-base">Available | उपलब्ध</p>
          </div>
        </div>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full relative">
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
              onClick={() => setModalOpen(false)}
            >
              ✕
            </button>

            {/* Modal Content */}
            <h2 className="text-2xl font-semibold mb-4 text-gray-900">
              {translations["Select Your Language"] || "Select Your Language"}
            </h2>

            <div className="flex flex-col gap-3">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    handleLanguageChange(lang.code);
                    
                  }}
                  className={`w-full px-4 py-3 rounded-lg border ${
                    selectedLang === lang.code
                      ? "border-[#009688] bg-[#009688]/20"
                      : "border-gray-300 hover:bg-gray-100"
                  } text-left`}
                >
                  {lang.name}
                </button>
              ))}
            </div>

            {/* Optional Start Voice Button */}
            <button
              className="mt-6 w-full bg-[#009688] hover:bg-[#00796b] text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2"
              onClick={() => {
               
                navigate("/login")}
                
              }
            >
              <Play className="w-5 h-5" />
              {translations["Get Started"] ||
                "Get Started"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
//stats section margin and close to footer (change)
