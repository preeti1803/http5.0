import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HospitalContext } from "../Context/HospitalContext";
import logo from "../assets/images/logo.png";

const SearchIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { setHospitals } = useContext(HospitalContext); // ✅ use context to store results
  const [query, setQuery] = useState("");
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // ✅ Handle search using backend API
  const handleSearch = async () => {
    if (query.trim() === "") return;

    try {
      // Call your FastAPI backend
      const res = await fetch(`http://127.0.0.1:5000/hospitals?city=${query}`);
      const data = await res.json();

      // Save hospitals in context so ResultsPage can access them
      setHospitals(data);

      // Navigate to results page
      navigate("/resultpage");
    } catch (err) {
      console.error("Error fetching hospitals:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md border-b-4 border-[#009688]">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="w-12 h-12 rounded-full" />
            <div>
              <h1 className="text-lg font-bold">स्वास्थ्य सहायक</h1>
              <p className="text-xs text-gray-500">Rural Healthcare Assistant</p>
            </div>
          </div>

          {/* Desktop search */}
          <div className="hidden md:flex flex-1 justify-center px-6">
            <div className="relative w-full max-w-2xl">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hospitals by city or name..."
                className="w-full py-2 pl-10 pr-24 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-full focus:outline-none focus:ring-2 focus:ring-[#009688]"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <button
                onClick={handleSearch}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#009688] text-white px-4 py-1 rounded-full text-sm"
              >
                Search
              </button>
            </div>
          </div>

          {/* Links */}
          <div className="hidden md:flex items-center space-x-6 font-bold">
            <Link to="/home" className="text-gray-700 hover:text-[#009688]">Home</Link>
            <Link to="/records" className="text-gray-700 hover:text-[#009688]">Records</Link>
            <Link to="/history" className="text-gray-700 hover:text-[#009688]">History</Link>
            <Link to="/alerts" className="text-gray-700 hover:text-[#009688]">Alerts</Link>
            <Link to="/profile" className="text-gray-700 hover:text-[#009688]">👤 Profile</Link>
            <button
              onClick={handleLogout}
              className="bg-[#009688] text-white px-4 py-2 rounded-full font-bold hover:bg-[#00796b] transition"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
