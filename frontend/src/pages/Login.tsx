import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/images/illustration.png";
import Greeting from "../components/Greeting";

interface LoginProps {
  onAuth: () => void;
}

const Login: React.FC<LoginProps> = ({ onAuth }) => {
  const navigate = useNavigate();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber }),
      });

      if (!res.ok) throw new Error("Failed to send OTP");

      setShowOtp(true);
    } catch (err) {
      console.error("OTP send failed:", err);
      setError("Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ phoneNumber, otp }),
      });

      if (!response.ok) throw new Error("Invalid OTP");

      const data = await response.json();
      localStorage.setItem("user", JSON.stringify(data.user));

      onAuth(); // ✅ Update App.tsx auth state so Navbar shows
      navigate("/home");
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Illustration */}
        <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8 order-1 md:order-none">
          <img
            src={illustration}
            alt="Login Illustration"
            className="w-60 h-60 md:w-96 md:h-96 object-contain transform scale-105 md:scale-110"
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center order-2">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Welcome Back
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Login with your phone number
          </p>

          <form
            onSubmit={showOtp ? handleLogin : handleSendOtp}
            className="space-y-4"
          >
            {/* Phone Input */}
            {!showOtp && (
              <input
                type="tel"
                required
                placeholder="Phone Number"
                pattern="[0-9]{10}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            )}

            {/* OTP Input */}
            {showOtp && (
              <input
                type="text"
                required
                placeholder="Enter 6-digit OTP"
                pattern="[0-9]{6}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            )}

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : showOtp
                ? "Verify OTP"
                : "Send OTP"}
            </button>
          </form>

          {/* Signup Link */}
          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
