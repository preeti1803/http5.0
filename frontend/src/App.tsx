import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import Login from './pages/Login';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import Result from './pages/Result';
import Signup from './pages/Signup';
import { Footer } from "./components/Footer";
import Navbar from "./components/Navbar";
import Profile from './pages/Profile';
import VoiceInput from './pages/SymptomInput';
import Symptomps from './pages/SYmptoms';
import EditProfile from './pages/EditProfile';
import HealthTips from './pages/WellBeing';
import History from './pages/History';

const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

function App() {
  const [isListening, setIsListening] = React.useState(false);
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('user'));

  // 🔥 Keep auth state synced with localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('user'));
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        {/* ✅ Navbar will show only if authenticated */}
        {isAuthenticated && <Navbar />}

        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/healthtips" element={<HealthTips />} />
          <Route path="/history" element={<History />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/profile" element={<Profile dailyStreak={2} />} />

          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home
                  onEmergencyCall={() => (window.location.href = "tel:108")}
                  onFindHospital={() => console.log("Find hospital clicked")}
                  onFirstAid={() => console.log("First aid clicked")}
                  dailyStreak={3}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/analysis"
            element={
              <PrivateRoute>
                <Analysis isAnalyzing={true} />
              </PrivateRoute>
            }
          />

          <Route
            path="/result"
            element={
              <PrivateRoute>
                <Result
                  condition="Fever"
                  urgencyLevel="medium"
                  advice={[
                    "Drink plenty of water",
                    "Take rest",
                    "Monitor temperature",
                  ]}
                  hospitals={[
                    {
                      id: "1",
                      name: "City Hospital",
                      distance: "2km",
                      address: "123 Main St",
                    },
                    {
                      id: "2",
                      name: "Green Clinic",
                      distance: "5km",
                      address: "456 Park Ave",
                    },
                  ]}
                  onPlayAudio={() => console.log("Play audio clicked")}
                  onShowMap={(id) => console.log("Show map for hospital", id)}
                  onEmergencyCall={() => (window.location.href = "tel:108")}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/voice-input"
            element={
              <PrivateRoute>
                <VoiceInput
                  onRetry={() => {
                    setIsListening(true);
                    console.log("Retry clicked");
                  }}
                  onStop={() => {
                    setIsListening(false);
                    console.log("Stop clicked");
                  }}
                  onTextSubmit={(text) => {
                    console.log("Submitted symptoms:", text);
                  }}
                  isListening={isListening}
                />
              </PrivateRoute>
            }
          />

          <Route
            path="/symptomps"
            element={
              <PrivateRoute>
                <Symptomps />
              </PrivateRoute>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
