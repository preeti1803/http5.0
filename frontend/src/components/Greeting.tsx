import React, { useEffect, useState } from "react";

const Greeting: React.FC = () => {
  const [greeting, setGreeting] = useState("Namaste 🙏");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("🌅 Good Morning / Namaste 🙏");
    } else if (hour < 17) {
      setGreeting("☀️ Good Afternoon / Namaste 🙏");
    } else {
      setGreeting("🌙 Good Evening / Namaste 🙏");
    }
  }, []);

  return (
    <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">
      {greeting}
    </h2>
  );
};

export default Greeting;
