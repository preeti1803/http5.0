import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockDb } from "../services/mockDb";
import { SignupForm } from "../types/auth";
import illustration from "../assets/images/illustration.png";
import { useAuth } from "../Context/AuthContext"; // Import useAuth hook

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // Use the login function from context

  const [formData, setFormData] = useState<SignupForm>({
    name: "",
    phoneNumber: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({
    message: "",
    type: "",
    isVisible: false,
  });

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type, isVisible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, isVisible: false }));
    }, 3000);
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const existingUser = await mockDb.getUserByPhone(formData.phoneNumber);
      if (existingUser) {
        throw new Error("Phone number already registered");
      }
      await mockDb.sendOTP(formData.phoneNumber);
      setShowOtp(true);
      showToast("OTP sent successfully! Please check your phone.", "success");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to send OTP";
      showToast(errorMessage, "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const isValid = await mockDb.verifyOTP(formData.phoneNumber, formData.otp);
      if (!isValid) {
        throw new Error("Invalid or expired OTP");
      }

      const user = await mockDb.createUser({
        name: formData.name,
        phone: formData.phoneNumber,
      });

      login(user); // Call the login function from the context
      navigate("/home");
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Signup failed";
      showToast(errorMessage, "error");
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

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#009688] text-white font-semibold py-3 rounded-full hover:bg-[#009688] transition-colors disabled:opacity-50"
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
      
      {/* Custom Toaster Component */}
      <div
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ease-in-out ${
          toast.isVisible ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className={`px-6 py-3 rounded-full shadow-lg flex items-center gap-3 transition-colors duration-300 ${
            toast.type === "success"
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          <span>
            {toast.type === "success" ? "✅" : "❌"}
          </span>
          <span className="font-semibold">{toast.message}</span>
        </div>
      </div>
    </div>
  );
};

export default Signup;