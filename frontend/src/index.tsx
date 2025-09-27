import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './i18n';
import i18n from 'i18next';
import { I18nextProvider } from 'react-i18next';
import {initializePushNotifications} from "./SwDev"
import { HospitalContext } from './Context/HospitalContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HospitalContext.Provider value={{ hospitals: [], setHospitals: async () => {} }}>
      
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
    </HospitalContext.Provider>
    </React.StrictMode>
  
    
   

);
//AIzaSyDPeUA6-R4ioNCXaxMkMKQYWO4u-D7TrtQ
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
initializePushNotifications();
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((reg) => console.log("✅ Service Worker registered:", reg))
      .catch((err) => console.error("❌ Service Worker registration failed:", err));
  });
}
