import React, { useState } from "react";
import {
  Bell,
  Volume2,
  Calendar,
  AlertTriangle,
} from "lucide-react";

export function AlertsNotifications() {
  const [language, setLanguage] = useState("en");
  const [notificationSettings, setNotificationSettings] = useState({
    healthAlerts: true,
    medicineReminders: true,
    emergencyUpdates: true,
    governmentUpdates: false,
    weeklyTips: true,
  });

  const notifications = [
    {
      id: 1,
      type: "health-alert",
      priority: "high",
      en: {
        title: "Dengue Alert in Your Area",
        message: "15 new cases reported this week. Take precautions against mosquitoes.",
        audio: "Dengue alert in your area. Take precautions against mosquitoes.",
      },
      hi: {
        title: "आपके क्षेत्र में डेंगू अलर्ट",
        message: "इस सप्ताह 15 नए मामले सामने आए हैं। मच्छरों से बचाव करें।",
        audio: "आपके क्षेत्र में डेंगू अलर्ट। मच्छरों से बचाव करें।",
      },
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      type: "medicine",
      priority: "medium",
      en: {
        title: "Medicine Reminder",
        message: "Time to take your evening medication - Metformin 500mg",
        audio: "Medicine reminder. Time to take Metformin 500mg.",
      },
      hi: {
        title: "दवा रिमाइंडर",
        message: "शाम की दवा लेने का समय - मेटफॉर्मिन 500mg",
        audio: "दवा रिमाइंडर। मेटफॉर्मिन 500mg लेने का समय।",
      },
      time: "30 minutes ago",
      read: false,
    },
    {
      id: 3,
      type: "government",
      priority: "medium",
      en: {
        title: "New Health Scheme Launched",
        message: "Ayushman Bharat coverage expanded. Check your eligibility.",
        audio: "New health scheme launched. Ayushman Bharat coverage expanded.",
      },
      hi: {
        title: "नई स्वास्थ्य योजना शुरू",
        message: "आयुष्मान भारत कवरेज बढ़ाया गया। अपनी पात्रता जांचें।",
        audio: "नई स्वास्थ्य योजना शुरू। आयुष्मान भारत कवरेज बढ़ाया गया।",
      },
      time: "1 day ago",
      read: true,
    },
  ];

  const getNotificationIcon = (type) => {
    switch (type) {
      case "health-alert":
        return "⚠️";
      case "medicine":
        return "💊";
      case "government":
        return "🏛️";
      case "tip":
        return "💡";
      case "emergency":
        return "🚨";
      default:
        return "📢";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const playNotificationAudio = (notification) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(notification[language].audio);
      utterance.lang = language === "en-IN";
      speechSynthesis.speak(utterance);
    }
  };

  const updateNotificationSetting = (setting, value) => {
    setNotificationSettings((prev) => ({ ...prev, [setting]: value }));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const highPriorityCount = notifications.filter(
    (n) => n.priority === "high" && !n.read
  ).length;

  const [activeTab, setActiveTab] = useState("notifications");

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-4">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl mb-2 text-gray-900 text-bold">Alerts & Notifications</h2>
        

          {/* Language Toggle */}
          
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2 text-blue-600">{unreadCount}</div>
            <p className="text-sm text-blue-800">Unread Messages</p>
          </div>
          <div className="border border-red-200 bg-red-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2 text-red-600">{highPriorityCount}</div>
            <p className="text-sm text-red-800">High Priority</p>
          </div>
          <div className="border border-green-200 bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2 text-green-600">
              {Object.values(notificationSettings).filter(Boolean).length}
            </div>
            <p className="text-sm text-green-800">Active Alerts</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b mb-4">
          <button
            onClick={() => setActiveTab("notifications")}
            className={`flex-1 py-2 ${
              activeTab === "notifications"
                ? "border-b-2 border-[#009688] text-[#009688]"
                : "text-gray-600"
            }`}
          >
            Notifications | नोटिफिकेशन
          </button>
          <button
            onClick={() => setActiveTab("settings")}
            className={`flex-1 py-2 ${
              activeTab === "settings"
                ? "border-b-2 border-[#009688] text-[#009688]"
                : "text-gray-600"
            }`}
          >
            Settings | सेटिंग्स
          </button>
        </div>

        {/* Notifications Tab */}
        {activeTab === "notifications" && (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`border rounded-xl p-4 transition-all hover:shadow-md ${
                  !notification.read ? "border-[#009688] bg-[#009688]/5" : ""
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="text-2xl">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3
                          className={`text-lg ${
                            !notification.read ? "font-semibold" : ""
                          }`}
                        >
                          {notification[language].title}
                        </h3>
                        <span
                          className={`px-2 py-1 rounded text-xs border ${getPriorityColor(
                            notification.priority
                          )}`}
                        >
                          {notification.priority}
                        </span>
                        {!notification.read && (
                          <span className="px-2 py-1 rounded text-xs bg-[#009688] text-white">
                            New
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 mb-2">
                        {notification[language].message}
                      </p>
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="w-4 h-4" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => playNotificationAudio(notification)}
                    className="px-3 py-2 border rounded-lg hover:bg-gray-100 flex items-center gap-1"
                  >
                    <Volume2 className="w-4 h-4" /> 🔊
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="space-y-4">
            {[
              {
                key: "healthAlerts",
                icon: <AlertTriangle className="w-5 h-5 text-red-500" />,
                en: { title: "Health Alerts", desc: "Disease outbreaks, health warnings" },
                hi: { title: "स्वास्थ्य अलर्ट", desc: "बीमारी के प्रकोप, स्वास्थ्य चेतावनी" },
              },
              {
                key: "medicineReminders",
                icon: <span className="text-xl">💊</span>,
                en: { title: "Medicine Reminders", desc: "Medication schedule alerts" },
                hi: { title: "दवा रिमाइंडर", desc: "दवा समय सारणी अलर्ट" },
              },
              {
                key: "emergencyUpdates",
                icon: <span className="text-xl">🚨</span>,
                en: { title: "Emergency Updates", desc: "Critical emergency information" },
                hi: { title: "आपातकालीन अपडेट", desc: "महत्वपूर्ण आपातकालीन जानकारी" },
              },
              {
                key: "governmentUpdates",
                icon: <span className="text-xl">🏛️</span>,
                en: { title: "Government Health Schemes", desc: "New schemes and updates" },
                hi: { title: "सरकारी स्वास्थ्य योजनाएं", desc: "नई योजनाएं और अपडेट" },
              },
              {
                key: "weeklyTips",
                icon: <span className="text-xl">💡</span>,
                en: { title: "Weekly Health Tips", desc: "Preventive health guidance" },
                hi: { title: "साप्ताहिक स्वास्थ्य सुझाव", desc: "निवारक स्वास्थ्य मार्गदर्शन" },
              },
            ].map((item) => (
              <div
                key={item.key}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <div>
                    <h4>{item[language].title}</h4>
                    <p className="text-sm text-gray-600">{item[language].desc}</p>
                  </div>
                </div>

                {/* Custom Switch */}
                <div
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer transition ${
                    notificationSettings[item.key] ? "bg-[#009688]" : "bg-gray-300"
                  }`}
                  onClick={() =>
                    updateNotificationSetting(item.key, !notificationSettings[item.key])
                  }
                >
                  <div
                    className={`bg-white w-5 h-5 rounded-full shadow transform transition ${
                      notificationSettings[item.key] ? "translate-x-6" : ""
                    }`}
                  />
                </div>
              </div>
            ))}

            <div className="text-center pt-4">
              <button className="bg-[#009688] hover:bg-[#00796b] text-white px-8 py-3 rounded-lg">
                Save Notification Settings | नोटिफिकेशन सेटिंग्स सेव करें
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
