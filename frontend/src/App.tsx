import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { LanguageProvider } from './Context/LanguageContext';
import { LandingPage } from './pages/LandingPage';
import Login from "./pages/Login"
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
import { History } from './pages/History';
import { AlertsNotifications } from './pages/Alerts';
import { MyRecords } from './pages/Records';
import { AuthProvider } from './Context/AuthContext';
import ProtectedRoute from './Context/ProtectedRoute';
import PreHeader from './components/PreHeader';
import ResultPage from './pages/ResultPage';

import {getToken} from "firebase/messaging"
import {auth} from "./services/firebase"



const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = !!localStorage.getItem('user');
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};


// ✅ Layout wrapper with Navbar + Footer
const AppLayout: React.FC<{ children: React.ReactNode ;  }> = ({ children }) => {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = React.useState(!!localStorage.getItem('user'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsAuthenticated(!!localStorage.getItem('user'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const showNavbar = isAuthenticated && !['/', '/login', '/signup'].includes(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
  
      {showNavbar && <Navbar />}
     
      {children}
      <Footer />
    </div>
  );
};

function App() {
const FirebaseToken = () => {
  useEffect(() => {
    Notification.requestPermission()
      .then(() => getToken(auth, { vapidKey: "BOb-7oG3X97Uvm8ivyhwVSk_y9ja5MJpvSsrq4Rt0DzCSKpsD9VGYcJ45oAr2sw0PLYG42s6mZ544-aoml72LKs" }))
      .then((token: string | null) => {
        console.log("Token:", token);
      })
      .catch((err: unknown) => {
        console.error("Error getting token", err);
      });
  }, []);


  return null;
};
  const [isListening, setIsListening] = React.useState(false);


  const sampleHospitals = [
    {
      id: "1",
      name: "District Government Hospital",
      hindiName: "जिला सरकारी अस्पताल",
      distance: "0.8 km",
      address: "Civil Lines, District Center",
      hindiAddress: "सिविल लाइन्स, जिला केंद्र",
      phone: "+91-1234567890",
      rating: 4.2,
      availability: "24x7",
      services: ["Emergency", "General Medicine", "Surgery"],
    },
    {
      id: "2",
      name: "Primary Health Centre",
      hindiName: "प्राथमिक स्वास्थ्य केंद्र",
      distance: "1.2 km",
      address: "Block Development Office",
      hindiAddress: "ब्लॉक विकास कार्यालय",
      phone: "+91-1234567891",
      rating: 3.8,
      availability: "Daytime",
      services: ["General Medicine", "Vaccination", "Maternal Care"],
    },
    {
      id: "3",
      name: "Apollo Medical Center",
      hindiName: "अपोलो मेडिकल सेंटर",
      distance: "2.1 km",
      address: "Main Market Road",
      hindiAddress: "मुख्य बाजार रोड",
      phone: "+91-1234567892",
      rating: 4.6,
      availability: "24x7",
      services: ["Cardiology", "Orthopedics", "Radiology"],
    },
  ];

  const recommendations = [
    "Drink plenty of fluids and rest well.",
    "Monitor your temperature every 4 hours.",
    "Visit the nearest hospital if symptoms worsen.",
    "Avoid self-medication without consulting a doctor.",
  ];

  const handlePlayAudio = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        "This is a sample audio guidance for your condition."
      );
      utterance.lang = "en-IN";
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleEmergencyCall = () => {
    window.location.href = "tel:108";
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <AppLayout>
          <AuthProvider>
        
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/healthtips" element={<HealthTips />} />
            <Route path="/history" element={<History />} />
            <Route path="/edit-profile" element={<EditProfile />} />
            <Route path="/profile" element={<Profile dailyStreak={2} />} />
            <Route path="/alerts" element={<AlertsNotifications />} />
            <Route path="/records" element={<MyRecords />} />
            <Route path = "/resultpage" element = {<ResultPage/>}/>
            <Route element ={<ProtectedRoute />}/>

            <Route
              path="/home"
              element={
                <PrivateRoute>
                  <Home
                    onEmergencyCall={handleEmergencyCall}
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
                    condition="Fever with mild cough"
                    urgencyLevel="medium"
                    advice={recommendations}
                    hospitals={sampleHospitals}
                    onPlayAudio={handlePlayAudio}
                    onEmergencyCall={handleEmergencyCall}
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
                    onTextSubmit={(text) => console.log("Submitted symptoms:", text)}
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

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
          </AuthProvider>
        </AppLayout>
      
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
