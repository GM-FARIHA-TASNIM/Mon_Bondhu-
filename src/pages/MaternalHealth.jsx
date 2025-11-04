import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const MaternalHealth = () => {
  const [weeks, setWeeks] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [reminders, setReminders] = useState([]);
  const [activeTab, setActiveTab] = useState("pregnancy");
  const [notes, setNotes] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);
  const [symptoms, setSymptoms] = useState({
    nausea: false,
    headache: false,
    backPain: false,
    fatigue: false,
    swelling: false,
    other: "",
  });

  // নবজাতকের টিকা সিডিউল
  const [vaccineSchedule, setVaccineSchedule] = useState([
    { id: 1, name: "বিসিজি", age: "জন্ম", completed: false, important: true },
    {
      id: 2,
      name: "হেপাটাইটিস বি - ১",
      age: "জন্ম",
      completed: false,
      important: true,
    },
    {
      id: 3,
      name: "ওপিভি - ১",
      age: "৬ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 4,
      name: "পেন্টাভ্যালেন্ট - ১",
      age: "৬ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 5,
      name: "পিসিভি - ১",
      age: "৬ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 6,
      name: "ওপিভি - ২",
      age: "১০ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 7,
      name: "পেন্টাভ্যালেন্ট - ২",
      age: "১০ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 8,
      name: "পিসিভি - ২",
      age: "১০ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 9,
      name: "ওপিভি - ৩",
      age: "১৪ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 10,
      name: "পেন্টাভ্যালেন্ট - ৩",
      age: "১৪ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 11,
      name: "পিসিভি - ৩",
      age: "১৪ সপ্তাহ",
      completed: false,
      important: true,
    },
    {
      id: 12,
      name: "এমআর - ১",
      age: "৯ মাস",
      completed: false,
      important: true,
    },
    {
      id: 13,
      name: "জাপানী এনকেফালাইটিস",
      age: "৯ মাস",
      completed: false,
      important: false,
    },
  ]);

  // নবজাতকের যত্ন টিপস
  const babyCareTips = [
    {
      id: 1,
      title: "স্তন্যপান",
      tips: [
        "জন্মের ১ ঘন্টার মধ্যে স্তন্যপান শুরু করুন",
        "২-৩ ঘন্টা পরপর স্তন্যপান করান",
        "শিশু নিজে থেকে স্তন ছাড়া পর্যন্ত খাওয়ান",
      ],
    },
    {
      id: 2,
      title: "নাভির যত্ন",
      tips: [
        "নাভি শুকনো ও পরিষ্কার রাখুন",
        "এলকোহল দিয়ে দিনে ২-৩ বার পরিষ্কার করুন",
        "নাভিতে কোনো ক্রিম বা পাউডার ব্যবহার করবেন না",
      ],
    },
    {
      id: 3,
      title: "গোসল ও পরিষ্কার",
      tips: [
        "নাভি পড়া পর্যন্ত স্পঞ্জ বাথ দিন",
        "হালকা গরম পানি ব্যবহার করুন",
        "গোসলের পর তোয়ালে দিয়ে আলতো করে মুছুন",
      ],
    },
    {
      id: 4,
      title: "ঘুম",
      tips: [
        "নবজাতক দিনে ১৬-১৮ ঘন্টা ঘুমায়",
        "শিশুকে চিত করে ঘুমাতে দিন",
        "নরম তোষক বা বালিশ ব্যবহার করবেন না",
      ],
    },
    {
      id: 5,
      title: "বস্ত্র ও তাপমাত্রা",
      tips: [
        "নরম সুতি কাপড় পরান",
        "কাঁথা দিয়ে জড়িয়ে রাখুন",
        "কম্পাত না হওয়া পর্যন্ত গরম কাপড় পরান",
      ],
    },
  ];

  const emergencyContacts = [
    { name: "ডাক্তার আফসানা", phone: "০১৭১১-২২৩৩৪৪" },
    { name: "নিকটবর্তী হাসপাতাল", phone: "০১৬১১-৩৩৪৪৫৫" },
    { name: "এম্বুলেন্স", phone: "৯৯৯" },
  ];

  const pregnancyTips = [
    "প্রথম ৩ মাস: ফলিক অ্যাসিড সমৃদ্ধ খাবার খান",
    "৪-৬ মাস: আয়রন ও ক্যালসিয়াম সমৃদ্ধ খাবার গুরুত্বপূর্ণ",
    "৭-৯ মাস: হালকা ব্যায়াম ও পর্যাপ্ত বিশ্রাম নিন",
    "নিয়মিত ডাক্তারের পরামর্শ নিন",
    "পর্যাপ্ত পানি পান করুন",
    "ধূমপান ও মদ্যপান থেকে দূরে থাকুন",
    "হালকা ব্যায়াম ও যোগব্যায়াম করুন",
    "পর্যাপ্ত ঘুমান ও বিশ্রাম নিন",
  ];

  const weeklyDevelopment = [
    { week: "৪-৮", development: "হার্ট বিট শুরু, অঙ্গ গঠন শুরু" },
    { week: "৯-১২", development: "অঙ্গ গঠন সম্পন্ন, আঙুল দেখা যায়" },
    { week: "১৩-১৬", development: "হাড় শক্ত, চুল দেখা যায়" },
    { week: "১৭-২০", development: "নড়াচড়া, গিলতে পারে" },
    { week: "২১-২৪", development: "চোখ খোলে, স্বাদ বুঝতে পারে" },
    { week: "২৫-২৮", development: "মস্তিষ্ক দ্রুত বাড়ে, শুনতে পায়" },
    { week: "২৯-৩২", development: "হাড় শক্ত, চর্বি জমা" },
    { week: "৩৩-৩৬", development: "ফুসফুস পরিপক্ব, অবস্থান নেয়" },
    { week: "৩৭-৪০", development: "জন্মের জন্য প্রস্তুত" },
  ];

  // localStorage থেকে ডেটা লোড
  useEffect(() => {
    const savedReminders = localStorage.getItem("maternalReminders");
    const savedNotes = localStorage.getItem("maternalNotes");
    const savedVaccines = localStorage.getItem("babyVaccines");

    if (savedReminders) setReminders(JSON.parse(savedReminders));
    if (savedNotes) setSavedNotes(JSON.parse(savedNotes));
    if (savedVaccines) setVaccineSchedule(JSON.parse(savedVaccines));
  }, []);

  // localStorage এ সেভ
  useEffect(() => {
    localStorage.setItem("maternalReminders", JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    localStorage.setItem("maternalNotes", JSON.stringify(savedNotes));
  }, [savedNotes]);

  useEffect(() => {
    localStorage.setItem("babyVaccines", JSON.stringify(vaccineSchedule));
  }, [vaccineSchedule]);

  const addReminder = () => {
    if (weeks && selectedDate) {
      const newReminder = {
        id: Date.now(),
        weeks: weeks,
        date: selectedDate,
        reminderDate: new Date(selectedDate).toLocaleDateString("bn-BD"),
        createdAt: new Date().toLocaleDateString("bn-BD"),
        completed: false,
        type: "pregnancy",
      };

      setReminders([...reminders, newReminder]);
      setWeeks("");
      setSelectedDate("");
      alert("রিমাইন্ডার সেট করা হয়েছে!");
    } else {
      alert("দয়া করে গর্ভের সপ্তাহ এবং তারিখ নির্বাচন করুন");
    }
  };

  // টিকা রিমাইন্ডার যোগ করুন
  const addVaccineReminder = (vaccine) => {
    const vaccineDate = new Date();
    // বয়স অনুযায়ী তারিখ ক্যালকুলেশন
    if (vaccine.age === "জন্ম") {
      vaccineDate.setDate(vaccineDate.getDate());
    } else if (vaccine.age === "৬ সপ্তাহ") {
      vaccineDate.setDate(vaccineDate.getDate() + 42);
    } else if (vaccine.age === "১০ সপ্তাহ") {
      vaccineDate.setDate(vaccineDate.getDate() + 70);
    } else if (vaccine.age === "১৪ সপ্তাহ") {
      vaccineDate.setDate(vaccineDate.getDate() + 98);
    } else if (vaccine.age === "৯ মাস") {
      vaccineDate.setMonth(vaccineDate.getMonth() + 9);
    }

    const newReminder = {
      id: Date.now() + vaccine.id,
      vaccineName: vaccine.name,
      age: vaccine.age,
      date: vaccineDate.toISOString().split("T")[0],
      reminderDate: vaccineDate.toLocaleDateString("bn-BD"),
      createdAt: new Date().toLocaleDateString("bn-BD"),
      completed: false,
      type: "vaccine",
    };

    setReminders([...reminders, newReminder]);
    alert(`${vaccine.name} এর রিমাইন্ডার সেট করা হয়েছে!`);
  };

  const deleteReminder = (id) => {
    setReminders(reminders.filter((reminder) => reminder.id !== id));
  };

  const toggleReminder = (id) => {
    setReminders(
      reminders.map((reminder) =>
        reminder.id === id
          ? { ...reminder, completed: !reminder.completed }
          : reminder
      )
    );
  };

  const toggleVaccine = (id) => {
    setVaccineSchedule(
      vaccineSchedule.map((vaccine) =>
        vaccine.id === id
          ? { ...vaccine, completed: !vaccine.completed }
          : vaccine
      )
    );
  };

  const addNote = () => {
    if (notes.trim()) {
      const newNote = {
        id: Date.now(),
        content: notes,
        date: new Date().toLocaleDateString("bn-BD"),
        time: new Date().toLocaleTimeString("bn-BD"),
        type: "general",
      };
      setSavedNotes([newNote, ...savedNotes]);
      setNotes("");
    }
  };

  const deleteNote = (id) => {
    setSavedNotes(savedNotes.filter((note) => note.id !== id));
  };

  const handleSymptomChange = (symptom, value) => {
    setSymptoms((prev) => ({
      ...prev,
      [symptom]: value,
    }));
  };

  const saveSymptoms = () => {
    const selectedSymptoms = Object.entries(symptoms)
      .filter(([key, value]) => value && value !== "")
      .map(([key]) => key);

    if (selectedSymptoms.length > 0) {
      alert(`লক্ষণগুলো সেভ করা হয়েছে: ${selectedSymptoms.join(", ")}`);
      // লক্ষণগুলো নোট হিসেবে সেভ করুন
      const symptomNote = {
        id: Date.now(),
        content: `আজকের লক্ষণ: ${selectedSymptoms.join(", ")}${
          symptoms.other ? ` - অন্যান্য: ${symptoms.other}` : ""
        }`,
        date: new Date().toLocaleDateString("bn-BD"),
        time: new Date().toLocaleTimeString("bn-BD"),
        type: "symptoms",
      };
      setSavedNotes([symptomNote, ...savedNotes]);

      setSymptoms({
        nausea: false,
        headache: false,
        backPain: false,
        fatigue: false,
        swelling: false,
        other: "",
      });
    } else {
      alert("দয়া করে至少 একটি লক্ষণ নির্বাচন করুন");
    }
  };

  // আজকের তারিখ এবং সর্বোচ্চ তারিখ
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);
  const maxDateString = maxDate.toISOString().split("T")[0];

  const sortedReminders = [...reminders].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );

  // ট্যাব কনফিগারেশন - প্রথমে মায়ের ট্যাব, তারপর শিশুর ট্যাব
  const tabs = [
    {
      id: "pregnancy",
      label: "গর্ভধারণ ট্র্যাকার",
      icon: "🤰",
      category: "mother",
    },
    { id: "symptoms", label: "মায়ের লক্ষণ", icon: "🤒", category: "mother" },
    { id: "notes", label: "নোটস", icon: "📝", category: "mother" },
    { id: "development", label: "শিশুর বিকাশ", icon: "👶", category: "baby" },
    { id: "vaccine", label: "টিকা রিমাইন্ডার", icon: "💉", category: "baby" },
    { id: "babycare", label: "নবজাতকের যত্ন", icon: "🍼", category: "baby" },
    { id: "emergency", label: "জরুরি যোগাযোগ", icon: "🚨", category: "both" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <span className="mr-2">←</span> ফিরে যান
        </Link>

        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-pink-400 to-purple-500 flex items-center justify-center shadow-lg">
            <span className="text-white text-2xl">🤰</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            মা ও শিশু স্বাস্থ্য
          </h1>
          <p className="text-gray-600 text-lg">
            গর্ভবতী মা ও নবজাতকের সম্পূর্ণ স্বাস্থ্য কেয়ার সিস্টেম
          </p>
        </div>

        {/* ট্যাব নেভিগেশন - মা এবং শিশু আলাদা সেকশনে */}
        <div className="mb-8">
          {/* মায়ের ট্যাবস */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              মায়ের স্বাস্থ্য
            </h3>
            <div className="flex overflow-x-auto bg-white rounded-lg shadow-sm p-1 gap-1">
              {tabs
                .filter((tab) => tab.category === "mother")
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-pink-100 text-pink-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>

          {/* শিশুর ট্যাবস */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              নবজাতকের যত্ন
            </h3>
            <div className="flex overflow-x-auto bg-white rounded-lg shadow-sm p-1 gap-1">
              {tabs
                .filter((tab) => tab.category === "baby")
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>

          {/* সাধারণ ট্যাবস */}
          <div className="mt-4">
            <div className="flex overflow-x-auto bg-white rounded-lg shadow-sm p-1 gap-1">
              {tabs
                .filter((tab) => tab.category === "both")
                .map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-md font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? "bg-yellow-100 text-yellow-700"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    <span>{tab.icon}</span>
                    {tab.label}
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* গর্ভধারণ ট্র্যাকার ট্যাব */}
        {activeTab === "pregnancy" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                গর্ভধারণ ট্র্যাকার
              </h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      গর্ভের সপ্তাহ
                    </label>
                    <input
                      type="number"
                      value={weeks}
                      onChange={(e) => setWeeks(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="গর্ভের সপ্তাহ লিখুন"
                      min="1"
                      max="40"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-700 font-medium mb-2">
                      রিমাইন্ডার তারিখ
                    </label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      min={today}
                      max={maxDateString}
                    />
                  </div>
                </div>

                <Button
                  onClick={addReminder}
                  className="w-full text-white border-0 hover:opacity-90 bg-gradient-to-r from-pink-500 to-purple-600"
                >
                  📅 রিমাইন্ডার সেট করুন
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                আপনার রিমাইন্ডার (
                {reminders.filter((r) => r.type === "pregnancy").length})
              </h3>
              {reminders.filter((r) => r.type === "pregnancy").length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোনো রিমাইন্ডার সেট করা নেই
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedReminders
                    .filter((r) => r.type === "pregnancy")
                    .map((reminder) => {
                      const isUpcoming = new Date(reminder.date) > new Date();
                      const isToday =
                        new Date(reminder.date).toDateString() ===
                        new Date().toDateString();

                      return (
                        <div
                          key={reminder.id}
                          className={`p-4 rounded-lg border ${
                            isToday
                              ? "bg-yellow-50 border-yellow-200"
                              : !isUpcoming
                              ? "bg-green-50 border-green-200"
                              : "bg-pink-50 border-pink-200"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <input
                                  type="checkbox"
                                  checked={reminder.completed}
                                  onChange={() => toggleReminder(reminder.id)}
                                  className="w-4 h-4 text-pink-600 rounded"
                                />
                                <p
                                  className={`font-medium text-lg ${
                                    reminder.completed
                                      ? "line-through text-gray-400"
                                      : ""
                                  }`}
                                >
                                  গর্ভের {reminder.weeks} সপ্তাহ
                                </p>
                                {isToday && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                    আজ
                                  </span>
                                )}
                                {!isUpcoming && !isToday && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    সম্পন্ন
                                  </span>
                                )}
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>
                                  📅 রিমাইন্ডার তারিখ: {reminder.reminderDate}
                                </p>
                                <p>⏰ সেট করা: {reminder.createdAt}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteReminder(reminder.id)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1"
                              title="রিমাইন্ডার ডিলিট করুন"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                গর্ভাবস্থার টিপস
              </h3>
              <div className="space-y-3">
                {pregnancyTips.map((tip, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg border border-pink-100"
                  >
                    <span className="text-pink-600 mt-1">💡</span>
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* মায়ের লক্ষণ ট্যাব */}
        {activeTab === "symptoms" && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              গর্ভাবস্থার লক্ষণ ট্র্যাকার
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { key: "nausea", label: "বমি বমি ভাব", emoji: "🤢" },
                  { key: "headache", label: "মাথাব্যথা", emoji: "🤕" },
                  { key: "backPain", label: "পিঠব্যথা", emoji: "🔙" },
                  { key: "fatigue", label: "ক্লান্তি", emoji: "😴" },
                  { key: "swelling", label: "পা ফুলে যাওয়া", emoji: "🦶" },
                ].map((symptom) => (
                  <label
                    key={symptom.key}
                    className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={symptoms[symptom.key]}
                      onChange={(e) =>
                        handleSymptomChange(symptom.key, e.target.checked)
                      }
                      className="w-4 h-4 text-pink-600 rounded"
                    />
                    <span className="text-2xl">{symptom.emoji}</span>
                    <span className="font-medium">{symptom.label}</span>
                  </label>
                ))}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  অন্যান্য লক্ষণ
                </label>
                <input
                  type="text"
                  value={symptoms.other}
                  onChange={(e) => handleSymptomChange("other", e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="অন্যান্য লক্ষণ লিখুন..."
                />
              </div>

              <Button
                onClick={saveSymptoms}
                className="w-full text-white border-0 hover:opacity-90 bg-gradient-to-r from-pink-500 to-purple-600"
              >
                💾 লক্ষণগুলো সেভ করুন
              </Button>
            </div>
          </Card>
        )}

        {/* নোটস ট্যাব */}
        {activeTab === "notes" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                নোট লিখুন
              </h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="আপনার অনুভূতি, প্রশ্ন বা গুরুত্বপূর্ণ তথ্য লিখুন..."
              />
              <Button
                onClick={addNote}
                className="w-full mt-3 text-white border-0 hover:opacity-90 bg-gradient-to-r from-purple-500 to-pink-600"
                disabled={!notes.trim()}
              >
                📝 নোট সেভ করুন
              </Button>
            </Card>

            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                সেভ করা নোটস ({savedNotes.length})
              </h3>
              {savedNotes.length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোনো নোট সেভ করা নেই
                </p>
              ) : (
                <div className="space-y-4">
                  {savedNotes.map((note) => (
                    <div
                      key={note.id}
                      className="p-4 bg-white border border-gray-200 rounded-lg"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="text-sm text-gray-500">
                          {note.date} - {note.time}
                          {note.type === "symptoms" && (
                            <span className="ml-2 px-2 py-1 bg-pink-100 text-pink-800 text-xs rounded-full">
                              লক্ষণ
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                      <p className="text-gray-700 whitespace-pre-wrap">
                        {note.content}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* শিশুর বিকাশ ট্যাব */}
        {activeTab === "development" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                সপ্তাহ অনুযায়ী শিশুর বিকাশ
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {weeklyDevelopment.map((stage, index) => (
                  <div
                    key={index}
                    className="p-4 bg-white border border-blue-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="text-lg font-bold text-blue-600 mb-2">
                      সপ্তাহ {stage.week}
                    </div>
                    <p className="text-gray-700 text-sm">{stage.development}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        )}

        {/* টিকা রিমাইন্ডার ট্যাব */}
        {activeTab === "vaccine" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                নবজাতকের টিকা সিডিউল
              </h3>
              <div className="space-y-4">
                {vaccineSchedule.map((vaccine) => (
                  <div
                    key={vaccine.id}
                    className={`p-4 rounded-lg border ${
                      vaccine.completed
                        ? "bg-green-50 border-green-200"
                        : "bg-blue-50 border-blue-200"
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          checked={vaccine.completed}
                          onChange={() => toggleVaccine(vaccine.id)}
                          className="w-4 h-4 text-blue-600 rounded"
                        />
                        <div>
                          <p
                            className={`font-medium ${
                              vaccine.completed
                                ? "line-through text-gray-400"
                                : ""
                            }`}
                          >
                            {vaccine.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            বয়স: {vaccine.age}
                          </p>
                        </div>
                        {vaccine.important && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                            গুরুত্বপূর্ণ
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => addVaccineReminder(vaccine)}
                        className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        ⏰ রিমাইন্ডার
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* টিকা রিমাইন্ডার লিস্ট */}
            <Card className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                টিকা রিমাইন্ডার (
                {reminders.filter((r) => r.type === "vaccine").length})
              </h3>
              {reminders.filter((r) => r.type === "vaccine").length === 0 ? (
                <p className="text-gray-600 text-center py-4">
                  কোনো টিকা রিমাইন্ডার সেট করা নেই
                </p>
              ) : (
                <div className="space-y-3">
                  {sortedReminders
                    .filter((r) => r.type === "vaccine")
                    .map((reminder) => {
                      const isUpcoming = new Date(reminder.date) > new Date();
                      const isToday =
                        new Date(reminder.date).toDateString() ===
                        new Date().toDateString();

                      return (
                        <div
                          key={reminder.id}
                          className={`p-4 rounded-lg border ${
                            isToday
                              ? "bg-yellow-50 border-yellow-200"
                              : !isUpcoming
                              ? "bg-green-50 border-green-200"
                              : "bg-blue-50 border-blue-200"
                          }`}
                        >
                          <div className="flex justify-between items-start">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <input
                                  type="checkbox"
                                  checked={reminder.completed}
                                  onChange={() => toggleReminder(reminder.id)}
                                  className="w-4 h-4 text-blue-600 rounded"
                                />
                                <p
                                  className={`font-medium text-lg ${
                                    reminder.completed
                                      ? "line-through text-gray-400"
                                      : ""
                                  }`}
                                >
                                  {reminder.vaccineName}
                                </p>
                                {isToday && (
                                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                                    আজ
                                  </span>
                                )}
                                {!isUpcoming && !isToday && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                                    সম্পন্ন
                                  </span>
                                )}
                              </div>
                              <div className="space-y-1 text-sm text-gray-600">
                                <p>💉 বয়স: {reminder.age}</p>
                                <p>📅 তারিখ: {reminder.reminderDate}</p>
                                <p>⏰ সেট করা: {reminder.createdAt}</p>
                              </div>
                            </div>
                            <button
                              onClick={() => deleteReminder(reminder.id)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1"
                              title="রিমাইন্ডার ডিলিট করুন"
                            >
                              🗑️
                            </button>
                          </div>
                        </div>
                      );
                    })}
                </div>
              )}
            </Card>
          </div>
        )}

        {/* নবজাতকের যত্ন ট্যাব */}
        {activeTab === "babycare" && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              নবজাতকের যত্ন গাইড
            </h3>
            <div className="space-y-6">
              {babyCareTips.map((category) => (
                <div
                  key={category.id}
                  className="p-4 bg-white border border-blue-200 rounded-lg"
                >
                  <h4 className="text-lg font-semibold text-blue-700 mb-3 flex items-center gap-2">
                    <span>👶</span>
                    {category.title}
                  </h4>
                  <ul className="space-y-2">
                    {category.tips.map((tip, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="text-blue-500 mt-1">•</span>
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* জরুরি যোগাযোগ ট্যাব */}
        {activeTab === "emergency" && (
          <Card className="p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              জরুরি যোগাযোগ
            </h3>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center p-4 bg-red-50 border border-red-200 rounded-lg"
                >
                  <div>
                    <p className="font-semibold text-red-900">{contact.name}</p>
                    <p className="text-red-700">{contact.phone}</p>
                  </div>
                  <a
                    href={`tel:${contact.phone}`}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    📞 কল করুন
                  </a>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">
                জরুরি লক্ষণ (মা):
              </h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• তীব্র পেটব্যথা</li>
                <li>• রক্তপাত</li>
                <li>• জ্বর</li>
                <li>• দৃষ্টিশক্তি ঝাপসা</li>
                <li>• শিশুর নড়াচড়া কমে গেলে</li>
              </ul>
            </div>

            <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">
                জরুরি লক্ষণ (নবজাতক):
              </h4>
              <ul className="text-blue-800 text-sm space-y-1">
                <li>• শ্বাসকষ্ট</li>
                <li>• জ্বর (১০০.৪°F/৩৮°C এর বেশি)</li>
                <li>• খাওয়াতে না পারা</li>
                <li>• অতিরিক্ত কান্না বা নিস্তেজ ভাব</li>
                <li>• ত্বক হলুদ হয়ে গেলে</li>
              </ul>
            </div>
          </Card>
        )}

        {/* সাধারণ তথ্য */}
        <Card className="p-6 mt-6 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            গুরুত্বপূর্ণ তথ্য
          </h3>
          <p className="text-blue-800 text-sm">
            নিয়মিত প্রসবপূর্ব চেকআপ করুন এবং কোনো সমস্যা মনে হলে অবিলম্বে
            ডাক্তারের সাথে যোগাযোগ করুন। স্বাস্থ্যকর খাবার খান এবং পর্যাপ্ত
            বিশ্রাম নিন। নবজাতকের টিকা সময়মতো দিতে ভুলবেন না।
          </p>
        </Card>
      </div>
    </div>
  );
};

export default MaternalHealth;
