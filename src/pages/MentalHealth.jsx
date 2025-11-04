import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const MentalHealth = () => {
  const [selectedMood, setSelectedMood] = useState(null);
  const [notes, setNotes] = useState("");
  const [intensity, setIntensity] = useState(5);
  const [moodHistory, setMoodHistory] = useState([]);

  const moods = [
    { id: "happy", icon: "😊", label: "খুশি", color: "text-green-500" },
    { id: "neutral", icon: "😐", label: "স্বাভাবিক", color: "text-yellow-500" },
    { id: "sad", icon: "😔", label: "খারাপ", color: "text-blue-500" },
    { id: "anxious", icon: "😰", label: "চিন্তিত", color: "text-orange-500" },
    { id: "angry", icon: "😠", label: "রাগান্বিত", color: "text-red-500" },
  ];

  // Load mood history from localStorage
  useEffect(() => {
    const existingData = JSON.parse(localStorage.getItem("moodData") || "[]");
    setMoodHistory(existingData);
  }, []);

  const handleSaveMood = () => {
    if (selectedMood) {
      const selectedMoodData = moods.find((mood) => mood.id === selectedMood);
      const moodData = {
        mood: selectedMood,
        moodLabel: selectedMoodData.label,
        moodIcon: selectedMoodData.icon,
        intensity: intensity,
        notes: notes,
        date: new Date().toLocaleDateString("bn-BD"),
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage
      const existingData = JSON.parse(localStorage.getItem("moodData") || "[]");
      const newData = [...existingData, moodData];
      localStorage.setItem("moodData", JSON.stringify(newData));

      alert("আপনার মুড সফলভাবে সেভ হয়েছে!");
      setSelectedMood(null);
      setNotes("");
      setIntensity(5);
      setMoodHistory(newData);
    }
  };

  const getIntensityLabel = (value) => {
    if (value <= 2) return "খুবই কম";
    if (value <= 4) return "কম";
    if (value <= 6) return "মধ্যম";
    if (value <= 8) return "তীব্র";
    return "খুবই তীব্র";
  };

  const getRecentMoods = () => {
    return moodHistory
      .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      .slice(0, 7);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          ফিরে যান
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-health flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">❤️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            মানসিক স্বাস্থ্য চেক-ইন
          </h1>
          <p className="text-gray-600 text-lg">আজ আপনি কেমন আছেন?</p>
        </div>

        <Card className="p-6 mb-6">
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              আপনার আজকের মুড নির্বাচন করুন
            </h3>
            <p className="text-gray-600">
              আপনার বর্তমান মানসিক অবস্থা বর্ণনা করুন
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            {moods.map((mood) => (
              <div
                key={mood.id}
                className={`text-center cursor-pointer p-4 rounded-lg border-2 transition-colors ${
                  selectedMood === mood.id
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-blue-500"
                }`}
                onClick={() => setSelectedMood(mood.id)}
              >
                <span className={`text-3xl mb-2 block ${mood.color}`}>
                  {mood.icon}
                </span>
                <p className="font-medium">{mood.label}</p>
              </div>
            ))}
          </div>

          {/* Mood Intensity Slider */}
          {selectedMood && (
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <label className="block text-gray-700 font-medium mb-3">
                মুডের তীব্রতা:{" "}
                <span className="text-blue-600">
                  {getIntensityLabel(intensity)}
                </span>
              </label>
              <div className="flex items-center space-x-4">
                <span className="text-sm text-gray-500">কম</span>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={intensity}
                  onChange={(e) => setIntensity(parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <span className="text-sm text-gray-500">তীব্র</span>
              </div>
              <div className="text-center mt-2">
                <span className="text-lg font-semibold text-blue-600">
                  {intensity}/10
                </span>
              </div>
            </div>
          )}

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              আপনার অনুভূতি লিখুন (ঐচ্ছিক)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="আজকে আপনার মনের অবস্থা সম্পর্কে লিখুন..."
            />
          </div>

          <Button
            onClick={handleSaveMood}
            disabled={!selectedMood}
            className="w-full text-white border-0 hover:opacity-90 font-semibold text-lg"
          >
            সেভ করুন
          </Button>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            গত ৭ দিনের মুড ট্র্যাকার
          </h3>
          {getRecentMoods().length > 0 ? (
            <div className="space-y-4">
              {getRecentMoods().map((entry, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">{entry.moodIcon}</span>
                    <div>
                      <p className="font-medium text-gray-900">
                        {entry.moodLabel}
                      </p>
                      <p className="text-sm text-gray-600">{entry.date}</p>
                      {entry.notes && (
                        <p className="text-sm text-gray-500 mt-1">
                          {entry.notes}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">তীব্রতা</p>
                    <p className="font-semibold text-blue-600">
                      {entry.intensity}/10
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p>আপনার কোনো মুড রেকর্ড নেই। প্রথম মুড সেভ করুন!</p>
            </div>
          )}
        </Card>
      </div>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: 2px solid #ffffff;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
        }

        .slider::-webkit-slider-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .slider::-moz-range-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
          border: none;
        }
      `}</style>
    </div>
  );
};

export default MentalHealth;
