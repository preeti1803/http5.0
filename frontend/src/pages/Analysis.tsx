import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface AnalysisProps {
  isAnalyzing: boolean;
}

const Analysis: React.FC<AnalysisProps> = ({ isAnalyzing }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAnalyzing) {
      const timer = setTimeout(() => {
        // Navigate to Result page with dummy result data
        navigate("/result", {
          state: {
            result: {
              condition: "Flu",
              urgency: "medium",
              advice: ["Drink plenty of fluids", "Rest well", "Take paracetamol if fever persists"],
              hospitals: [
                { name: "City Hospital", distance: 2, address: "123 Main Street" },
                { name: "Green Clinic", distance: 5, address: "456 Green Road" },
              ],
            },
          },
        });
      }, 10000); // 5 seconds analysis duration

      return () => clearTimeout(timer);
    }
  }, [isAnalyzing, navigate]);

  // Medical AI Logo Component
  const MedicalAILogo = () => (
    <motion.div
      className="relative"
      animate={{ rotate: isAnalyzing ? 360 : 0 }}
      transition={{ duration: 8, repeat: isAnalyzing ? Infinity : 0, ease: "linear" }}
    >
      <svg width="120" height="120" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
 
  <circle
    cx="60" cy="60" r="25"
    fill="rgba(59, 130, 246, 0.1)"
    stroke="rgba(59, 130, 246, 0.4)"
    stroke-width="2"
  />
  
  <rect
    x="57" y="47" width="6" height="26" rx="3"
    fill="rgba(59, 130, 246, 1)"
  />
  
  
  <rect
    x="48" y="57" width="26" height="6" rx="3"
    fill="rgba(59, 130, 246, 1)"
  />
  
  
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 60 60;360 60 60"
      dur="6s"
      repeatCount="indefinite"
    />
    
  
    <g transform="translate(60, 25)">
      <rect x="-4" y="-3" width="8" height="6" fill="#3B82F6" rx="1"/>
      <rect x="-1" y="-5" width="2" height="4" fill="white"/>
      <rect x="-3" y="-3" width="6" height="2" fill="white"/>
    </g>
  </g>
  
  
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="360 60 60;0 60 60"
      dur="8s"
      repeatCount="indefinite"
    />
    
    
    <g transform="translate(60, 95)">
      <circle cx="0" cy="0" r="3" fill="none" stroke="#10B981" stroke-width="2"/>
      <circle cx="0" cy="0" r="1" fill="#10B981"/>
      <path d="M-2 -2 Q-4 -4 -3 2" fill="none" stroke="#10B981" stroke-width="2"/>
      <path d="M2 -2 Q4 -4 3 2" fill="none" stroke="#10B981" stroke-width="2"/>
      <circle cx="-3" cy="2" r="1" fill="#10B981"/>
      <circle cx="3" cy="2" r="1" fill="#10B981"/>
    </g>
  </g>
  
  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="0 60 60;360 60 60"
      dur="10s"
      repeatCount="indefinite"
    />
    
   
    <g transform="translate(95, 60)">
      <path d="M0,2 C0,0 -2,-2 -4,0 C-6,2 0,6 0,6 C0,6 6,2 4,0 C2,-2 0,0 0,2 Z" 
            fill="#EF4444"/>
    </g>
  </g>
  

  <g>
    <animateTransform
      attributeName="transform"
      type="rotate"
      values="360 60 60;0 60 60"
      dur="12s"
      repeatCount="indefinite"
    />
    
   
    <g transform="translate(25, 60)">
      <ellipse cx="0" cy="0" rx="4" ry="2" fill="#8B5CF6"/>
      <rect x="-4" y="-2" width="4" height="4" fill="#A855F7"/>
      <circle cx="2" cy="3" r="1.5" fill="#8B5CF6"/>
    </g>
  </g>

  <circle cx="60" cy="60" r="35" 
          fill="none" 
          stroke="rgba(59, 130, 246, 0.2)" 
          stroke-width="1" 
          stroke-dasharray="3 3"/>
</svg>
    </motion.div>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.0.3&q=80&w=2070"
          alt="Network Web Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/95 via-blue-800/90 to-blue-700/85"></div>
      </div>

      {/* Animated background network */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Network nodes and connections */}
        <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 1 }}>
          {/* Generate network connections */}
          {[
            { x1: '10%', y1: '20%', x2: '30%', y2: '35%' },
            { x1: '30%', y1: '35%', x2: '60%', y2: '15%' },
            { x1: '60%', y1: '15%', x2: '85%', y2: '25%' },
            { x1: '30%', y1: '35%', x2: '45%', y2: '60%' },
            { x1: '45%', y1: '60%', x2: '70%', y2: '55%' },
            { x1: '70%', y1: '55%', x2: '90%', y2: '70%' },
            { x1: '10%', y1: '75%', x2: '25%', y2: '85%' },
            { x1: '25%', y1: '85%', x2: '50%', y2: '80%' },
            { x1: '50%', y1: '80%', x2: '75%', y2: '90%' },
            { x1: '45%', y1: '60%', x2: '70%', y2: '75%' },
            { x1: '15%', y1: '45%', x2: '35%', y2: '50%' },
            { x1: '35%', y1: '50%', x2: '55%', y2: '40%' },
            { x1: '55%', y1: '40%', x2: '80%', y2: '45%' },
            { x1: '20%', y1: '10%', x2: '40%', y2: '20%' },
            { x1: '40%', y1: '20%', x2: '65%', y2: '30%' },
          ].map((line, i) => (
            <motion.line
              key={i}
              x1={line.x1} y1={line.y1}
              x2={line.x2} y2={line.y2}
              stroke="rgba(59, 130, 246, 0.3)"
              strokeWidth="1"
              animate={{ 
                opacity: [0.1, 0.6, 0.1],
                strokeWidth: [0.5, 1.5, 0.5]
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 3 
              }}
            />
          ))}
          
          {/* Generate network nodes */}
          {[
            { x: '10%', y: '20%' }, { x: '30%', y: '35%' }, { x: '60%', y: '15%' }, 
            { x: '85%', y: '25%' }, { x: '45%', y: '60%' }, { x: '70%', y: '55%' },
            { x: '90%', y: '70%' }, { x: '10%', y: '75%' }, { x: '25%', y: '85%' },
            { x: '50%', y: '80%' }, { x: '75%', y: '90%' }, { x: '70%', y: '75%' },
            { x: '15%', y: '45%' }, { x: '35%', y: '50%' }, { x: '55%', y: '40%' },
            { x: '80%', y: '45%' }, { x: '20%', y: '10%' }, { x: '40%', y: '20%' },
            { x: '65%', y: '30%' }
          ].map((node, i) => (
            <motion.circle
              key={i}
              cx={node.x} cy={node.y}
              r="3"
              fill="rgba(147, 197, 253, 0.6)"
              animate={{ 
                r: [2, 5, 2],
                opacity: [0.3, 1, 0.3]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2, 
                repeat: Infinity, 
                delay: Math.random() * 2 
              }}
            />
          ))}
        </svg>

        {/* Floating data packets */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-blue-400/40 rounded-full"
            animate={{
              x: [Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000), Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000)],
              y: [Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800), Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800)],
              opacity: [0, 1, 0],
              scale: [0.5, 1.5, 0.5]
            }}
            transition={{
              duration: Math.random() * 8 + 4,
              repeat: Infinity,
              delay: Math.random() * 4,
            }}
            style={{
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen flex flex-col justify-center text-white">
        <div className="text-center mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold mb-4 drop-shadow-lg">
            Analyzing Your Symptoms
          </h1>
          <p className="text-lg text-blue-100 drop-shadow-md">
            Our AI is processing your health information
          </p>
        </div>

        {/* Analysis Animation */}
        <div className="flex flex-col items-center">
          <motion.div
            className="relative w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-gradient-to-br from-blue-400/20 to-blue-600/30 backdrop-blur-sm border border-blue-300/30 shadow-2xl flex items-center justify-center mb-8"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            <MedicalAILogo />
            
            {/* Outer pulsing ring */}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-blue-400/50"
              animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 3, repeat: Infinity }}
            />
            
            {/* Inner pulsing ring */}
            <motion.div
              className="absolute inset-4 rounded-full border border-blue-300/40"
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
          </motion.div>

          {/* Animated Progress Dots */}
          <div className="flex justify-center space-x-3">
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="w-4 h-4 bg-blue-300 rounded-full shadow-lg"
                animate={{ scale: [1, 1.5, 1], opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
              />
            ))}
          </div>

          <p className="mt-6 text-lg text-blue-100">Analyzing your symptoms...</p>
          
          {/* Additional status indicators */}
          <div className="mt-4 flex flex-col items-center space-y-2">
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 0 }}
              />
              <span className="text-sm text-blue-200">Processing symptoms</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 1 }}
              />
              <span className="text-sm text-blue-200">Analyzing patterns</span>
            </div>
            <div className="flex items-center space-x-2">
              <motion.div
                className="w-2 h-2 bg-blue-400 rounded-full"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: 2 }}
              />
              <span className="text-sm text-blue-200">Generating recommendations</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;