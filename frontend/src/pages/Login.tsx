import React, { useState } from "react";
import { Mic } from "lucide-react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png"

// --- Firebase Imports ---
// This section imports the necessary functions from the Firebase SDK.
import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from "firebase/auth";
import { auth } from "../services/firebase"; // Make sure this path is correct

// This is a TypeScript feature to let us add 'recaptchaVerifier' to the global window object.
declare global {
  interface Window {
    recaptchaVerifier: any;
  }
}

const Login: React.FC = () => {
  // --- Component State ---
  const [language, setLanguage] = useState<"en" | "hi">("en");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("+91");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const navigate = useNavigate();

  // --- Translations Object ---
  const translations = {
    en: {
        helpline: "National Health Helpline: 1075",
        helpline_hi: "स्वास्थ्य हेल्पलाइन: १०७५",
        title: "Welcome to SwasthyaSahayak",
        subtitle: "स्वास्थ्यसहायक में आपका स्वागत है",
        loginWith: "Login with Mobile Number (OTP)",
        sendOtp: "Send OTP",
        enterOtp: "Enter OTP",
        login: "Login",
        or: "OR",
        micText: "Speak your name or PIN in your local language",
        readOut: "Read Out Loud",
        footer: "Works even in low/no internet with PWA support",
        footer_hi: "PWA सपोर्ट के साथ कम/बिना इंटरनेट में भी काम करता है",
    },
    hi: {
        helpline: "राष्ट्रीय स्वास्थ्य हेल्पलाइन: १०७५",
        helpline_hi: "National Health Helpline: 1075",
        title: "स्वास्थ्यसहायक में आपका स्वागत है",
        subtitle: "Welcome to SwasthyaSahayak",
        loginWith: "मोबाइल नंबर से लॉगिन करें (OTP)",
        sendOtp: "OTP भेजें",
        enterOtp: "OTP दर्ज करें",
        login: "लॉगिन करें",
        or: "या",
        micText: "अपना नाम या PIN अपनी स्थानीय भाषा में बोलें",
        readOut: "जोर से पढ़ें",
        footer: "कम/बिना इंटरनेट में भी काम करता है (PWA सपोर्ट)",
        footer_hi: "Works even in low/no internet with PWA support",
    },
  };
  const t = translations[language];

  // --- reCAPTCHA Setup ---
  // This function creates the invisible reCAPTCHA widget required by Firebase.
  const setupRecaptcha = () => {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        'size': 'invisible',
        'callback': () => {
          // This callback is executed when the reCAPTCHA is solved.
        }
      });
    }
  };

  // --- OTP Handlers ---
  // Function to request the OTP from Firebase.
  const handleSendOtp = async () => {
    try {
      setupRecaptcha(); // Sets up the invisible reCAPTCHA
      const verifier = window.recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phoneNumber, verifier);
      setConfirmationResult(result);
      setOtpSent(true);
      console.log("OTP sent successfully!");
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please check the phone number and try again.");
    }
  };

  // Function to verify the OTP and sign the user in.
  const handleVerifyOtp = async () => {
    if (otp.trim().length === 6 && confirmationResult) {
      try {
        await confirmationResult.confirm(otp);
        console.log("Login successful!");
        navigate("/home");
      } catch (error) {
        console.error("Error verifying OTP:", error);
        alert("Invalid OTP. Please try again.");
      }
    } else {
      alert("Please enter a valid 6-digit OTP!");
    }
  };

  // --- JSX Rendering ---
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Top Bar and Navbar */}
      <div className="bg-blue-600 text-white text-sm px-4 py-2 flex justify-between">
        <span>{t.helpline}</span>
        <span>{t.helpline_hi}</span>
      </div>
      <nav className="bg-teal-600 px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
         <img src= {logo} alt="Logo" className="h-10 w-10 rounded-full" />
          <div className="text-white font-semibold text-lg">SwasthyaSahayak</div>
        </div>
        <select value={language} onChange={(e) => setLanguage(e.target.value as "en" | "hi")} className="px-3 py-1 border rounded-md text-sm">
          <option value="en">English</option>
          <option value="hi">हिन्दी</option>
        </select>
      </nav>

      {/* Main Content */}
      <div className="flex flex-1 items-center justify-center px-4">
        <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
          
          {/* This empty div is the container for Firebase's invisible reCAPTCHA. It must be present. */}
          <div id="recaptcha-container"></div>
          
          <h2 className="text-xl font-semibold mb-2">{t.title}</h2>
          <p className="text-green-600 text-sm mb-6">{t.subtitle}</p>

          {/* Conditional rendering for Phone Number input or OTP input */}
          {!otpSent ? (
            <>
              <p className="mb-2 text-gray-700">{t.loginWith}</p>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  placeholder="+91"
                  className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleSendOtp}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  {t.sendOtp}
                </button>
              </div>
            </>
          ) : (
            <>
              <p className="mb-2 text-gray-700">{t.enterOtp}</p>
              <div className="flex items-center space-x-2 mb-4">
                <input
                  type="text"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="123456"
                  className="flex-1 border rounded-lg px-4 py-2 focus:ring-2 focus:ring-teal-500"
                />
                <button
                  onClick={handleVerifyOtp}
                  className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700"
                >
                  {t.login}
                </button>
              </div>
            </>
          )}

          {/* Divider and other UI elements */}
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500 text-sm">{t.or} | {translations.hi.or}</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <button className="bg-teal-600 text-white p-4 rounded-full shadow-md hover:bg-teal-700 mb-3">
            <Mic size={28} />
          </button>
          <p className="text-gray-700 text-sm mb-4">{t.micText}</p>
          <div className="flex items-center justify-center space-x-2 mb-4">
            <label className="inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-10 h-6 bg-gray-200 rounded-full peer peer-checked:bg-teal-600 relative after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-4"></div>
            </label>
            <span className="text-sm text-gray-700">{t.readOut}</span>
          </div>
          <p className="text-xs text-gray-500">{t.footer}</p>
          <p className="text-xs text-teal-600">{t.footer_hi}</p>
        </div>
      </div>
    </div>
  );
};

export default Login;