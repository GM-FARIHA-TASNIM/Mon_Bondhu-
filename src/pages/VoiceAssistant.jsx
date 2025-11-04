import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const VoiceAssistant = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [conversations, setConversations] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [suggestedClinics, setSuggestedClinics] = useState([]);
  const recognitionRef = useRef(null);

  // Sample clinic data
  const clinicData = [
    {
      id: 1,
      name: "ঢাকা মেডিকেল কলেজ হাসপাতাল",
      type: "হাসপাতাল",
      distance: "২.৫ কিমি",
      address: "ঢাকা মেডিকেল কলেজ রোড, ঢাকা",
      phone: "০২-৫৫১৬৫০০০",
      emergency: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "ইবনে সিনা ডায়াগনস্টিক সেন্টার",
      type: "ডায়াগনস্টিক সেন্টার",
      distance: "১.২ কিমি",
      address: "ধানমন্ডি, ঢাকা",
      phone: "০২-৯৬৭০১০১",
      emergency: true,
      rating: 4.3,
    },
    {
      id: 3,
      name: "ল্যাবএইড স্পেশালাইজড হাসপাতাল",
      type: "হাসপাতাল",
      distance: "৩.৮ কিমি",
      address: "ধানমন্ডি, ঢাকা",
      phone: "০২-৯৬৭৬২১০",
      emergency: true,
      rating: 4.6,
    },
    {
      id: 4,
      name: "আপোলো হাসপাতাল",
      type: "হাসপাতাল",
      distance: "৫.২ কিমি",
      address: "বশুন্ধরা, ঢাকা",
      phone: "০২-৮৪১৬৬৬৬",
      emergency: true,
      rating: 4.7,
    },
    {
      id: 5,
      name: "সিটি ডেন্টাল কেয়ার",
      type: "ডেন্টাল ক্লিনিক",
      distance: "০.৮ কিমি",
      address: "মোহাম্মদপুর, ঢাকা",
      phone: "০২-৫৫123456",
      emergency: false,
      rating: 4.2,
    },
  ];

  // Speech Recognition initialization
  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "bn-BD";

      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript("");
        setSuggestedClinics([]);
      };

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            const finalTranscript = event.results[i][0].transcript;
            setTranscript(finalTranscript);
            processVoiceCommand(finalTranscript);
          } else {
            interimTranscript += event.results[i][0].transcript;
            setTranscript(interimTranscript);
          }
        }
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
        if (event.error === "not-allowed") {
          alert("মাইক্রোফোন এক্সেস অনুমতি প্রয়োজন।");
        }
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn("Speech Recognition not supported in this browser");
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  // Load conversations from localStorage
  useEffect(() => {
    const savedConversations = localStorage.getItem(
      "voiceAssistantConversations"
    );
    if (savedConversations) {
      setConversations(JSON.parse(savedConversations));
    }
  }, []);

  // Save conversations to localStorage
  useEffect(() => {
    localStorage.setItem(
      "voiceAssistantConversations",
      JSON.stringify(conversations)
    );
  }, [conversations]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert("আপনার ব্রাউজার Voice Recognition সাপোর্ট করে না।");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript("");
      setSuggestedClinics([]);
      recognitionRef.current.start();
    }
  };

  const findNearbyClinics = (command) => {
    const lowerCommand = command.toLowerCase();

    // Filter clinics based on query
    let filteredClinics = [...clinicData];

    if (lowerCommand.includes("ডেন্টাল") || lowerCommand.includes("দাঁত")) {
      filteredClinics = clinicData.filter((clinic) =>
        clinic.type.includes("ডেন্টাল")
      );
    } else if (lowerCommand.includes("হাসপাতাল")) {
      filteredClinics = clinicData.filter((clinic) =>
        clinic.type.includes("হাসপাতাল")
      );
    } else if (lowerCommand.includes("ডায়াগনস্টিক")) {
      filteredClinics = clinicData.filter((clinic) =>
        clinic.type.includes("ডায়াগনস্টিক")
      );
    }

    // Sort by distance
    filteredClinics.sort((a, b) => {
      const distA = parseFloat(a.distance);
      const distB = parseFloat(b.distance);
      return distA - distB;
    });

    return filteredClinics.slice(0, 3); // Return top 3 closest
  };

  const processVoiceCommand = (command) => {
    if (!command.trim()) return;

    setIsProcessing(true);

    // Add user message to conversations
    const userMessage = {
      id: Date.now(),
      type: "user",
      text: command,
      timestamp: new Date().toLocaleString("bn-BD"),
    };

    setConversations((prev) => [...prev, userMessage]);

    // Process command and generate response
    setTimeout(() => {
      let response = "";
      const clinics = findNearbyClinics(command);

      if (clinics.length > 0) {
        setSuggestedClinics(clinics);
        response = `আপনার কাছের ${clinics.length}টি ক্লিনিক পাওয়া গেছে। নিচে দেখুন:`;
      } else {
        response = generateResponse(command);
      }

      const botMessage = {
        id: Date.now() + 1,
        type: "assistant",
        text: response,
        timestamp: new Date().toLocaleString("bn-BD"),
        ...(clinics.length > 0 && { hasSuggestions: true }),
      };

      setConversations((prev) => [...prev, botMessage]);
      speakResponse(response);
      setIsProcessing(false);
    }, 1500);
  };

  const generateResponse = (command) => {
    const lowerCommand = command.toLowerCase();

    if (
      lowerCommand.includes("ক্লিনিক") ||
      lowerCommand.includes("হাসপাতাল") ||
      lowerCommand.includes("ডাক্তার")
    ) {
      return "আপনার নিকটস্থ ক্লিনিকগুলি খুঁজে বের করা হচ্ছে... অনুগ্রহ করে আপনার লোকেশন অনুমতি দিন বা ম্যানুয়ালি সার্চ করুন।";
    } else if (
      lowerCommand.includes("টিপস") ||
      lowerCommand.includes("স্বাস্থ্য")
    ) {
      return "স্বাস্থ্য টিপস: দিনে至少 ৮ গ্লাস পানি পান করুন, নিয়মিত হাঁটাহাঁটি করুন, এবং পর্যাপ্ত ঘুমান। স্বাস্থ্যকর খাবার খান এবং স্ট্রেস ম্যানেজ করুন।";
    } else if (
      lowerCommand.includes("জরুরি") ||
      lowerCommand.includes("সাহায্য")
    ) {
      return "জরুরি সাহায্যের জন্য অনুগ্রহ করে ৯৯৯ নম্বরে কল করুন। আপনার যদি গুরুতর স্বাস্থ্য সমস্যা হয়, তাহলে নিকটস্থ হাসপাতালে যান।";
    } else if (
      lowerCommand.includes("ধন্যবাদ") ||
      lowerCommand.includes("থ্যাংকস")
    ) {
      return "আপনাকে স্বাগতম! আর কোন সাহায্য প্রয়োজন হলে বলুন।";
    } else {
      return "আমি আপনার কথাটি বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন। আপনি ক্লিনিক, স্বাস্থ্য টিপস, বা জরুরি সাহায্য সম্পর্কে জিজ্ঞাসা করতে পারেন।";
    }
  };

  const speakResponse = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance();
      speech.text = text;
      speech.lang = "bn-BD";
      speech.rate = 0.9;
      speech.pitch = 1;

      window.speechSynthesis.speak(speech);
    }
  };

  const clearConversations = () => {
    setConversations([]);
    setSuggestedClinics([]);
    localStorage.removeItem("voiceAssistantConversations");
  };

  const handleCallClinic = (phoneNumber) => {
    if (window.confirm(`এই নম্বরে কল করতে চান: ${phoneNumber}?`)) {
      window.open(`tel:${phoneNumber}`);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <span className="mr-2">←</span> ফিরে যান
        </Link>

        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-health flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">🎤</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            ভয়েস সহায়ক
          </h1>
          <p className="text-gray-600 text-lg">কথা বলে ব্যবহার করুন সহজভাবে</p>
        </div>

        <Card className="p-6 text-center">
          <div className="mb-6">
            <button
              onClick={toggleListening}
              disabled={isProcessing}
              className={`w-24 h-24 rounded-full flex items-center justify-center text-white text-2xl transition-all ${
                isListening
                  ? "bg-red-500 animate-pulse ring-4 ring-red-200"
                  : isProcessing
                  ? "bg-yellow-500"
                  : "gradient-health hover:scale-105"
              } ${isProcessing ? "cursor-not-allowed" : "cursor-pointer"}`}
            >
              {isProcessing ? "⚡" : isListening ? "⏹️" : "🎤"}
            </button>

            <p className="mt-4 text-gray-600">
              {isProcessing
                ? "প্রসেসিং..."
                : isListening
                ? "শুনছি... কথা বলুন"
                : "মাইক্রোফোনে ট্যাপ করুন"}
            </p>

            {transcript && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-sm text-gray-500">আপনার কথা:</p>
                <p className="text-lg font-medium text-gray-800">
                  {transcript}
                </p>
              </div>
            )}
          </div>

          {/* Suggested Clinics Section */}
          {suggestedClinics.length > 0 && (
            <div className="mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-4 text-center">
                🏥 কাছের ক্লিনিক সমূহ
              </h3>
              <div className="space-y-3">
                {suggestedClinics.map((clinic) => (
                  <div
                    key={clinic.id}
                    className="p-4 border border-green-200 rounded-lg bg-green-50 hover:bg-green-100 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {clinic.name}
                      </h4>
                      <span className="text-sm bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        {clinic.distance} দূরে
                      </span>
                    </div>

                    <div className="space-y-1 text-sm text-gray-600">
                      <p>📋 {clinic.type}</p>
                      <p>📍 {clinic.address}</p>
                      <p>⭐ রেটিং: {clinic.rating}/5</p>
                      {clinic.emergency && (
                        <p className="text-red-600 font-medium">
                          🆘 জরুরি সেবা available
                        </p>
                      )}
                    </div>

                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={() => handleCallClinic(clinic.phone)}
                        className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors"
                      >
                        📞 কল করুন
                      </button>
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                        🗺️ লোকেশন দেখুন
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3 mb-6">
            <p className="font-medium text-gray-900">উদাহরণ:</p>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">"কাছের ক্লিনিক কোথায়?"</p>
              <p className="text-sm text-gray-600">
                "আজকের স্বাস্থ্য টিপস দাও"
              </p>
              <p className="text-sm text-gray-600">"জরুরি সাহায্য চাই"</p>
              <p className="text-sm text-gray-600">"ডেন্টাল ক্লিনিক খুঁজুন"</p>
            </div>
          </div>

          {conversations.length > 0 && (
            <div className="mt-6 text-left">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-gray-900">
                  কনভারসেশন ইতিহাস
                </h3>
                <button
                  onClick={clearConversations}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  ক্লিয়ার করুন
                </button>
              </div>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {conversations.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3 rounded-lg ${
                      msg.type === "user"
                        ? "bg-blue-100 text-blue-800 ml-8"
                        : "bg-green-100 text-green-800 mr-8"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <p className="text-sm">{msg.text}</p>
                      <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>

        <Card className="p-6 mt-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">ভয়েস সহায়ক</h3>
          <p className="text-blue-800 text-sm">
            "কাছের ক্লিনিক কোথায়?" বলুন এবং নিকটস্থ ক্লিনিকের তালিকা পান। কল
            করুন বা লোকেশন দেখুন।
          </p>
        </Card>
      </div>
    </div>
  );
};

export default VoiceAssistant;
