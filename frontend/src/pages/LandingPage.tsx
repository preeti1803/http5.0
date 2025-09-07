import React, { useState } from "react";
import Card from "../components/Card";
import Button from "../components/Button";
import { motion } from "motion/react";
import { CheckCircle, Stethoscope, Hospital, Users, Shield } from "lucide-react";

interface LandingPageProps {
  onGetStarted: () => void;
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [showModal, setShowModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);

  const languages = [
    { code: "hi", name: "हिंदी", englishName: "Hindi", flag: "🇮🇳", users: "40 cr+" },
    { code: "mr", name: "मराठी", englishName: "Marathi", flag: "🇮🇳", users: "8.3 cr+" },
    { code: "bn", name: "বাংলা", englishName: "Bengali", flag: "🇧🇩", users: "26.5 cr+" },
  ];

  const handleLanguageSelect = (langCode: string) => {
    setSelectedLanguage(langCode);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            स्वास्थ्य सहायक
          </motion.h1>
          <p className="text-lg md:text-xl mb-6">
            AI-Powered Rural Healthcare Assistant
          </p>
          <Button
            onClick={onGetStarted}
            className="px-8 py-3 text-lg font-semibold rounded-xl"
          >
            Get Started
          </Button>
        </div>
      </section>

      {/* AI Powered Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-6 text-center max-w-3xl">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            AI-Powered Healthcare
            <span className="block text-blue-600">For Rural Communities</span>
          </h2>
          <p className="text-lg text-gray-700 leading-relaxed">
            Get instant health guidance in your local language. Our AI assistant
            helps rural communities access quality healthcare with voice support,
            emergency services, and offline capabilities.
          </p>
        </div>
      </section>



      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
            Key Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="flex flex-col items-center text-center">
              <Stethoscope className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg">Symptom Checker</h3>
              <p className="text-gray-600 text-sm mt-2">
                Describe your symptoms in your language and get AI-powered
                recommendations.
              </p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Hospital className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg">Nearby Hospitals</h3>
              <p className="text-gray-600 text-sm mt-2">
                Locate hospitals and clinics near you with important details.
              </p>
            </Card>
            <Card className="flex flex-col items-center text-center">
              <Users className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="font-semibold text-lg">Community Support</h3>
              <p className="text-gray-600 text-sm mt-2">
                Access health tips, preventive care, and trusted medical
                guidance.
              </p>
            </Card>
          </div>
        </div>
      </section>
            {/* Language Selection Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 max-w-md">
          <Card className="w-full space-y-4 p-6">
            <h3 className="text-xl font-bold text-center mb-2">Choose Your Language</h3>
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all mb-2 flex justify-between items-center
                  ${
                    selectedLanguage === lang.code
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                  }`}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{lang.flag}</span>
                  <div>
                    <div className="font-bold text-gray-900">{lang.name}</div>
                    <div className="text-sm text-gray-600">{lang.englishName}</div>
                  </div>
                </div>
                {selectedLanguage === lang.code && (
                  <CheckCircle className="w-5 h-5 text-blue-500" />
                )}
              </button>
            ))}
            <Button
              onClick={() => {
                if (selectedLanguage) {
                  onGetStarted();
                }
              }}
              className={`w-full py-4 text-lg font-bold rounded-xl ${
                selectedLanguage
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed pointer-events-none"
              }`}
            >
              Get Started
            </Button>
          </Card>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div>
            <h3 className="text-3xl font-bold text-blue-600">10k+</h3>
            <p className="text-gray-700">Users Served</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">500+</h3>
            <p className="text-gray-700">Hospitals Listed</p>
          </div>
          <div>
            <h3 className="text-3xl font-bold text-blue-600">95%</h3>
            <p className="text-gray-700">Accuracy in Suggestions</p>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 text-center">
          <Shield className="w-12 h-12 text-blue-600 mx-auto mb-4" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Trusted by Rural Communities
          </h2>
          <p className="text-gray-700 mb-6">
            Empowering people with accessible, reliable, and AI-driven healthcare
            support.
          </p>
          <Button
            onClick={() => setShowModal(true)}
            className="px-8 py-3 text-lg font-semibold rounded-xl"
          >
            Learn More
          </Button>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to take charge of your health?
        </h2>
      </section>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center p-4">
          <Card className="max-w-md w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={() => setShowModal(false)}
            >
              ✕
            </button>
            <h3 className="text-xl font-bold mb-2">About Our Platform</h3>
            <p className="text-gray-600 mb-4">
              Our AI-powered healthcare assistant is designed to bridge the gap
              between rural communities and healthcare providers by offering
              voice-first symptom checking, hospital discovery, and reliable
              preventive care tips.
            </p>
            <Button
              onClick={() => setShowModal(false)}
              className="w-full py-3 rounded-xl"
            >
              Close
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
