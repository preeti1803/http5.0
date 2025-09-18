import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import illustration from "../assets/images/illustration.png";

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

  // Show OTP input (mock)
  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!phoneNumber.match(/^[0-9]{10}$/)) {
      setError("Enter a valid 10-digit phone number");
      return;
    }

    setShowOtp(true); // Show OTP input
  };

  // Low-fidelity login: accept only 123456
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (otp === "123456") {
      const user = { phoneNumber };
      localStorage.setItem("user", JSON.stringify(user));

      onAuth();
      
      navigate("/home");
    } else {
      setError("Invalid OTP. Use 123456 for demo.");
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
                placeholder="Enter OTP"
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
              // onClick={() => navigate("/home")}
              className="w-full bg-[#009688] text-white font-semibold py-3 rounded-full hover:bg-[#009688] transition-colors disabled:opacity-50"
            >
              {showOtp ? "Login" : "Continue"}
            </button>
          </form>

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
