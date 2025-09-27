import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Mic, RotateCcw, Square } from "lucide-react";

interface SymptomInputScreenProps {
  onRetry: () => void;
  onStop: () => void;
  onTextSubmit: (text: string) => void;
  isListening: boolean;
}

// ✅ Fix for SpeechRecognition typings in TypeScript
interface ISpeechRecognition extends EventTarget {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: ISpeechRecognitionEvent) => void) | null;
  onend: (() => void) | null;
}

interface ISpeechRecognitionEvent extends Event {
  results: SpeechRecognitionResultList;
}

interface ISpeechRecognitionConstructor {
  new (): ISpeechRecognition;
}

declare global {
  interface Window {
    SpeechRecognition: ISpeechRecognitionConstructor;
    webkitSpeechRecognition: ISpeechRecognitionConstructor;
  }
}

const VoiceInput: React.FC<SymptomInputScreenProps> = ({
  onRetry,
  onStop,
  onTextSubmit,
}) => {
  const [textInput, setTextInput] = useState("");
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<ISpeechRecognition | null>(null);
  const navigate = useNavigate();

  // Initialize speech recognition
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = "mar-IN"; // Default Hindi, can change dynamically
      recognition.continuous = false;
      recognition.interimResults = true;

      recognition.onresult = (event: ISpeechRecognitionEvent) => {
        let transcript = "";
        for (let i = 0; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
        }
        setTextInput(transcript);
      };

      recognition.onend = () => {
        setListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);

  const startListening = () => {
    if (recognitionRef.current) {
      setListening(true);
      recognitionRef.current.start();
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setListening(false);
    }
  };

  const handleTextSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (textInput.trim()) {
      onTextSubmit(textInput.trim());
      setTextInput("");
      navigate("/analysis");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-teal-700 via-teal-600 to-teal-500 text-white">
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col justify-center min-h-screen">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 drop-shadow-lg">
            Voice Consultation
          </h1>
          <p className="text-base sm:text-lg text-blue-100 drop-shadow">
            Describe your symptoms clearly in your preferred language
          </p>
        </div>

        {/* Mic Section */}
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl p-6 sm:p-10 border border-white/20">
          <div className="text-center mb-6">
            <h2 className="text-xl sm:text-2xl font-semibold mb-2">
              अपने लक्षण बताएं
            </h2>
            <p className="text-blue-100 text-sm sm:text-base">
              {listening ? "Listening..." : "Press mic to start"}
            </p>
          </div>

          {/* Mic Animation */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <motion.div
              className="relative"
              animate={listening ? { scale: [1, 1.15, 1] } : { scale: 1 }}
              transition={{ duration: 1.5, repeat: listening ? Infinity : 0 }}
            >
              {listening && (
                <>
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-400/50"
                    animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-blue-300/40"
                    animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}

              <button
                onClick={listening ? stopListening : startListening}
                className={`w-24 h-24 sm:w-32 sm:h-32 rounded-full flex items-center justify-center relative z-10 transition-all shadow-2xl hover:scale-105 ${
                  listening
                    ? "bg-gradient-to-br from-blue-500 to-blue-700 border-4 border-blue-300"
                    : "bg-gradient-to-br from-white/20 to-white/10 border-4 border-white/30 hover:border-white/50"
                }`}
              >
                <Mic className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </button>
            </motion.div>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-center gap-6 sm:gap-8 mb-6">
            <button
              onClick={onRetry}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-blue-500/20 hover:bg-blue-500/30 border border-blue-400 text-white shadow-lg transition-transform hover:scale-110 flex flex-col items-center justify-center"
            >
              <RotateCcw className="w-6 h-6" />
              <span className="text-[10px] sm:text-xs mt-1">Retry</span>
            </button>
            <button
              onClick={() => {
                stopListening();
                onStop();
              }}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-red-500/80 hover:bg-red-600 border border-red-400 text-white shadow-lg transition-transform hover:scale-110 flex flex-col items-center justify-center"
            >
              <Square className="w-6 h-6" />
              <span className="text-[10px] sm:text-xs mt-1">Stop</span>
            </button>
          </div>

          {/* Text Input + Submit */}
          <form
            onSubmit={handleTextSubmit}
            className="flex flex-col sm:flex-row gap-3 w-full px-4 mt-4"
          >
            <input
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
              placeholder="Type here if needed / यहाँ लिखें अगर ज़रूरत हो"
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/30 text-white placeholder:text-white/60 focus:outline-none focus:border-white/50 text-sm sm:text-base w-full"
            />
            <button
              type="submit"
              disabled={!textInput.trim()}
              className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-500 rounded-xl font-medium shadow-md transition-transform hover:scale-105 disabled:hover:scale-100 text-sm sm:text-base"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default VoiceInput;