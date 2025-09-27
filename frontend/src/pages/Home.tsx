import React from "react";
import { Mic, PhoneCall, Hospital, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";


// Props for Home
interface HomeScreenProps {
  
  onEmergencyCall: () => void;
  onFindHospital: () => void;
  onFirstAid: () => void;
  dailyStreak: number;
}

const Home: React.FC<HomeScreenProps> = ({
  onEmergencyCall,
  onFindHospital,
  onFirstAid,
  
}) => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [dailyStreak, setDailyStreak] = React.useState(1);


  React.useEffect(() => {
  if (!user?.id) return;

  const lastVisitKey = `lastVisit_${user.id}`;
  const streakKey = `streak_${user.id}`;

  const lastVisit = localStorage.getItem(lastVisitKey);
  let streak = parseInt(localStorage.getItem(streakKey) || "0", 10);

  const today = new Date();
  const todayStr = today.toDateString();

  if (lastVisit === todayStr) {
    // Already visited today, do nothing
  } else {
    // Increment streak if last visit was yesterday
    if (lastVisit) {
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      if (new Date(lastVisit).toDateString() === yesterday.toDateString()) {
        streak += 1;
      } else {
        // Reset streak if last visit was earlier than yesterday
        streak = 1;
      }
    } else {
      // First-time user
      streak = 1;
    }
    localStorage.setItem(streakKey, streak.toString());
    localStorage.setItem(lastVisitKey, todayStr);
  }
  setDailyStreak(streak);
}, [user?.id]);


  

  // Health tips
  const healthTips = [
    "Drink at least 8 glasses of water daily.",
    "Wash your hands before eating.",
    "Exercise regularly for better health.",
    "Get enough sleep every night.",
    "Eat more fresh fruits and vegetables.",
    "Take a 10-minute walk after meals.",
    "Avoid junk food for a healthier lifestyle.",
  ];
  const randomTip = healthTips[Math.floor(Math.random() * healthTips.length)];

  // Greeting based on time
  const hour = new Date().getHours();
  let greeting = "Welcome";
  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";
  else greeting = "Good Evening";

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      {/* Emergency Bar */}
      {/* <div
        className="bg-blue-600 text-white text-center py-3 cursor-pointer hover:bg-red-600 transition"
        onClick={onEmergencyCall}
      >
        🚨 Emergency? Call 108 Immediately
      </div> */}

      {/* Header */}
      <header className="text-center py-10 px-4">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">
          {greeting}, {user?.name || "User"} 👋
        </h1>
        <p className="text-slate-500">Your AI-powered health companion</p>
      </header>

      {/* Main Mic Action */}
      <section className="flex flex-col items-center py-8">
        <button
          onClick={() => navigate("/voice-input")}
          className="w-32 h-32 flex items-center justify-center rounded-full bg-teal-600 hover:bg-teal-800 text-white shadow-lg transition"
        >
          <Mic size={48} />
        </button>
        <h2 className="mt-4 text-lg font-semibold text-slate-700">
          Start Voice Consultation
        </h2>
        <p className="text-slate-500 text-sm">
          Speak your symptoms and get quick advice
        </p>
      </section>

      {/* Daily Streak */}
      {dailyStreak > 0 && (
        <section className="flex justify-center py-6">
          <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-6 py-2">
            <span className="text-xl">🔥</span>
            <span className="text-slate-700 font-medium">
              {dailyStreak} day streak
            </span>
          </div>
        </section>
      )}

      {/* Features Grid */}
      <section className="max-w-5xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          icon={<PhoneCall className="w-8 h-8 text-red-500" />}
          title="Emergency Call"
          description="Call 108 instantly for emergencies"
          onClick={onEmergencyCall}
        />
        <FeatureCard
          icon={<Hospital className="w-8 h-8 text-blue-500" />}
          title="Find Hospitals"
          description="Locate nearby hospitals with maps"
          onClick={onFindHospital}
        />
        <FeatureCard
          icon={<BookOpen className="w-8 h-8 text-green-500" />}
          title="First Aid Guide"
          description="Offline step-by-step first aid tips"
          onClick={onFirstAid}
        />
      </section>

      {/* Health Tip */}
      <section className="max-w-xl mx-auto px-4 py-8">
        <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-900 text-white p-6 text-center shadow">
          <h3 className="text-lg font-semibold mb-2">💡 Health Tip of the Day</h3>
          <p className="text-base">{randomTip}</p>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="bg-slate-100 py-12 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">
            🚀 How to Get Started
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StepCard
              step="1"
              title="Create Account"
              description="Sign up with your details to get started."
            />
            <StepCard
              step="2"
              title="Choose Language"
              description="Select your preferred language for interaction."
            />
            <StepCard
              step="3"
              title="Start Using"
              description="Use mic, emergency calls, or explore health tips."
            />
          </div>
        </div>
      </section>
    </div>
  );
};

// FeatureCard component
interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
}
const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  onClick,
}) => {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-3 p-6 rounded-2xl border border-slate-200 bg-white shadow-lg transition transform hover:-translate-y-1 hover:scale-105 hover:shadow-2xl"
    >
      <div className="p-3 rounded-full bg-slate-100">{icon}</div>
      <h4 className="text-lg font-semibold text-slate-800">{title}</h4>
      <p className="text-sm text-slate-500 text-center">{description}</p>
    </button>
  );
};

// StepCard component
interface StepCardProps {
  step: string;
  title: string;
  description: string;
}
const StepCard: React.FC<StepCardProps> = ({ step, title, description }) => {
  return (
    <div className="bg-white shadow-md rounded-xl p-6 flex flex-col items-center hover:shadow-xl transition">
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-teal-600 text-white text-lg font-bold mb-4">
        {step}
      </div>
      <h3 className="text-lg font-semibold text-slate-800 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 text-center">{description}</p>
    </div>
  );
};

export default Home;
