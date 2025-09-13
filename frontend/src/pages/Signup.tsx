import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockDb } from "../services/mockDb";
import { SignupForm } from "../types/auth";
import illustration from "../assets/images/illustration.png";

interface SignupProps {
  onAuth: () => void;
}

const Signup: React.FC<SignupProps> = ({ onAuth }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    phoneNumber: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const existingUser = await mockDb.getUserByPhone(formData.phoneNumber);
      if (existingUser) {
        throw new Error("Phone number already registered");
      }
      await mockDb.sendOTP(formData.phoneNumber);
      setShowOtp(true);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const isValid = await mockDb.verifyOTP(formData.phoneNumber, formData.otp);
      if (!isValid) {
        throw new Error("Invalid or expired OTP");
      }

      const user = await mockDb.createUser({
        name: formData.name,
        phone: formData.phoneNumber,
      });

      localStorage.setItem("user", JSON.stringify(user));

      onAuth(); // ✅ FIX: tells App.tsx to update Navbar state
      navigate("/home");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-500 px-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col md:flex-row overflow-hidden">
        
        {/* Left Illustration */}
        <div className="flex items-center justify-center w-full md:w-1/2 bg-white p-8 order-first md:order-none">
          <img
            src={illustration}
            alt="Signup Illustration"
            className="w-3/4 max-w-xs md:max-w-md lg:max-w-lg object-contain"
          />
        </div>

        {/* Right Signup Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
            Create Your Account
          </h2>
          <p className="text-sm text-gray-600 text-center mb-6">
            Sign up to get started
          </p>
          <form
            onSubmit={showOtp ? handleSignup : handleSendOtp}
            className="space-y-4"
          >
            {!showOtp && (
              <>
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone Number"
                  pattern="[0-9]{10}"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  disabled={showOtp}
                />
              </>
            )}

            {/* OTP Input */}
            {showOtp && (
              <input
                type="text"
                required
                placeholder="Enter 6-digit OTP"
                pattern="[0-9]{6}"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={formData.otp}
                onChange={(e) =>
                  setFormData({ ...formData, otp: e.target.value })
                }
              />
            )}

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50"
            >
              {loading
                ? "Processing..."
                : showOtp
                ? "Create Account"
                : "Send OTP"}
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6"></div>
          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
