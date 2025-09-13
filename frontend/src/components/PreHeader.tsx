import React, { useEffect } from "react";

declare global {
  interface Window {
    googleTranslateElementInit: () => void;
    google: any;
    googleTranslateElement?: any;
  }
}

const PreHeader: React.FC = () => {
  useEffect(() => {
    const addGoogleTranslateScript = () => {
      // Prevent multiple dropdowns by checking existing script
      if (!document.querySelector("script[src*='translate_a/element.js']")) {
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src =
          "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
      }
    };

    // Google Translate init
    window.googleTranslateElementInit = function () {
      if (!window.googleTranslateElement && window.google?.translate) {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en" },
          "google_element"
        );
      }
    };

    // Disable unwanted alerts
    window.alert = () => {
      return;
    };

    addGoogleTranslateScript();
  }, []);

  return (
    <div className="bg-green-600 px-6 py-2 hidden md:block w-full">
      <div className="flex justify-between items-center">
        {/* Left Section (Logo + Text if needed) */}
        <div className="flex items-center space-x-2">
          {/* Example Logo */}
          {/* <img src="/logo.png" alt="Logo" className="h-8 w-8" /> */}
          {/* <span className="text-white font-semibold text-sm">Header Text</span> */}
        </div>

        {/* Google Translate Dropdown */}
        <div id="google_element" className="flex items-center"></div>
      </div>
    </div>
  );
};

export default PreHeader;
