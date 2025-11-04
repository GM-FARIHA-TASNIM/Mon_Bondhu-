import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Workers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const healthWorkers = [
    // রাজশাহী জেলা
    {
      name: "ডাঃ আফসানা বেগম",
      type: "মহিলা ডাক্তার",
      phone: "০১৭১১-২২৩৩৪৪",
      area: "রাজশাহী, পবা",
      specialty: "গাইনী ও প্রসূতি",
      experience: "১০ বছর",
    },
    {
      name: "স্বাস্থ্যকর্মী রিনা আক্তার",
      type: "কমিউনিটি হেলথ ওয়ার্কার",
      phone: "০১৮১১-৫৫৬৬৭৭",
      area: "রাজশাহী, দুর্গাপুর",
      specialty: "প্রাথমিক স্বাস্থ্য সেবা",
      experience: "৫ বছর",
    },
    {
      name: "ডাঃ রফিকুল ইসলাম",
      type: "সাধারণ চিকিৎসক",
      phone: "০১৯১১-৮৮৯৯০০",
      area: "রাজশাহী, বোয়ালিয়া",
      specialty: "সাধারণ রোগ",
      experience: "৮ বছর",
    },
    {
      name: "শিশু বিশেষজ্ঞ ডাঃ সুমনা আহমেদ",
      type: "শিশু রোগ বিশেষজ্ঞ",
      phone: "০১৬১১-৩৩৪৪৫৫",
      area: "রাজশাহী, শাহমখদুম",
      specialty: "শিশু স্বাস্থ্য",
      experience: "১২ বছর",
    },

    // ঢাকা জেলা
    {
      name: "ডাঃ আহমেদ হোসেন",
      type: "হৃদরোগ বিশেষজ্ঞ",
      phone: "০১৭১২-৩৪৫৬৭৮",
      area: "ঢাকা, গুলশান",
      specialty: "কার্ডিওলজি",
      experience: "১৫ বছর",
    },
    {
      name: "ডাঃ ফাতেমা খাতুন",
      type: "চর্ম বিশেষজ্ঞ",
      phone: "০১৮১৩-৪৫৬৭৮৯",
      area: "ঢাকা, ধানমন্ডি",
      specialty: "চর্ম ও যৌন রোগ",
      experience: "৯ বছর",
    },
    {
      name: "স্বাস্থ্যকর্মী সাজেদা বেগম",
      type: "নার্স",
      phone: "০১৯১৪-৫৬৭৮৯০",
      area: "ঢাকা, মিরপুর",
      specialty: "সাধারণ নার্সিং",
      experience: "৬ বছর",
    },

    // চট্টগ্রাম জেলা
    {
      name: "ডাঃ জাহাঙ্গীর আলম",
      type: "অর্থোপেডিক সার্জন",
      phone: "০১৭১৫-৬৭৮৯০১",
      area: "চট্টগ্রাম, আগ্রাবাদ",
      specialty: "হাড় ও জয়েন্ট",
      experience: "১১ বছর",
    },
    {
      name: "ডাঃ নুসরাত জাহান",
      type: "চক্ষু বিশেষজ্ঞ",
      phone: "০১৮১৬-৭৮৯০১২",
      area: "চট্টগ্রাম, খুলশী",
      specialty: "চক্ষু রোগ",
      experience: "৮ বছর",
    },

    // সিলেট জেলা
    {
      name: "ডাঃ রিয়াদ হাসান",
      type: "ক্যান্সার বিশেষজ্ঞ",
      phone: "০১৯১৭-৮৯০১২৩",
      area: "সিলেট, জিন্দাবাজার",
      specialty: "অঙ্কোলজি",
      experience: "১৪ বছর",
    },
    {
      name: "স্বাস্থ্যকর্মী মরিয়ম বেগম",
      type: "মিডওয়াইফ",
      phone: "০১৭১৮-৯০১২৩৪",
      area: "সিলেট, সোবহানীঘাট",
      specialty: "প্রসূতি সেবা",
      experience: "৭ বছর",
    },

    // খুলনা জেলা
    {
      name: "ডাঃ সেলিনা আক্তার",
      type: "মানসিক রোগ বিশেষজ্ঞ",
      phone: "০১৮১৯-০১২৩৪৫",
      area: "খুলনা, খানজাহান আলী",
      specialty: "সাইকিয়াট্রি",
      experience: "১০ বছর",
    },
    {
      name: "ডাঃ আলমগীর কবির",
      type: "কিডনি বিশেষজ্ঞ",
      phone: "০১৯২০-১২৩৪৫৬",
      area: "খুলনা, সোনাডাঙ্গা",
      specialty: "নেফ্রোলজি",
      experience: "১২ বছর",
    },

    // বরিশাল জেলা
    {
      name: "ডাঃ তানিয়া ইসলাম",
      type: "শিশু বিশেষজ্ঞ",
      phone: "০১৭২১-২৩৪৫৬৭",
      area: "বরিশাল, সদর",
      specialty: "শিশু স্বাস্থ্য",
      experience: "৮ বছর",
    },

    // রংপুর জেলা
    {
      name: "ডাঃ আরিফুল হক",
      type: "সাধারণ চিকিৎসক",
      phone: "০১৮২২-৩৪৫৬৭৮",
      area: "রংপুর, সদর",
      specialty: "সাধারণ রোগ",
      experience: "৬ বছর",
    },

    // ময়মনসিংহ জেলা
    {
      name: "ডাঃ সাবrina ইয়াসমিন",
      type: "গাইনী বিশেষজ্ঞ",
      phone: "০১৯২৩-৪৫৬৭৮৯",
      area: "ময়মনসিংহ, ট্রিশাল",
      specialty: "গাইনী ও প্রসূতি",
      experience: "৯ বছর",
    },
  ];

  const filteredWorkers = useMemo(() => {
    if (!searchQuery.trim()) return healthWorkers;

    const query = searchQuery.toLowerCase();
    return healthWorkers.filter(
      (worker) =>
        worker.name.toLowerCase().includes(query) ||
        worker.area.toLowerCase().includes(query) ||
        worker.specialty.toLowerCase().includes(query) ||
        worker.type.toLowerCase().includes(query)
    );
  }, [searchQuery, healthWorkers]);

  // সার্চ সাজেশনের জন্য ইউনিক এলাকা এবং বিশেষত্ব
  const searchSuggestions = useMemo(() => {
    const allAreas = [...new Set(healthWorkers.map((worker) => worker.area))];
    const allSpecialties = [
      ...new Set(healthWorkers.map((worker) => worker.specialty)),
    ];
    const allNames = healthWorkers.map((worker) => worker.name);

    return [...allAreas, ...allSpecialties, ...allNames];
  }, [healthWorkers]);

  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  const filteredSuggestions = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase();
    return searchSuggestions
      .filter((suggestion) => suggestion.toLowerCase().includes(query))
      .slice(0, 5); // শুধুমাত্র প্রথম ৫টি সাজেশন দেখাবে
  }, [searchQuery, searchSuggestions]);

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
            <span className="text-white text-xl">👥</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            স্বাস্থ্যকর্মী ডিরেক্টরি
          </h1>
          <p className="text-gray-600 text-lg">
            স্থানীয় স্বাস্থ্যকর্মীদের যোগাযোগ তথ্য
          </p>
        </div>

        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="নাম, এলাকা বা বিশেষত্ব দিয়ে খুঁজুন..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {showSuggestions && filteredSuggestions.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredSuggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="p-3 hover:bg-blue-50 cursor-pointer border-b border-gray-100 last:border-b-0"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">🔍</span>
                    <span className="text-gray-700">{suggestion}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="mb-4 flex flex-wrap gap-2">
          <span className="text-sm text-gray-600">জনপ্রিয় সার্চ:</span>
          {["ঢাকা", "চট্টগ্রাম", "গাইনী", "শিশু", "সাধারণ রোগ"].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="space-y-6 mb-8">
          {filteredWorkers.map((worker, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {worker.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600 mb-2">
                    {worker.type}
                  </span>
                  <p className="text-sm text-gray-600">
                    অভিজ্ঞতা: {worker.experience}
                  </p>
                </div>
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>📞</span>
                  <a
                    href={`tel:${worker.phone}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {worker.phone}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{worker.area}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🎯</span>
                  <span>{worker.specialty}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredWorkers.length === 0 && (
          <Card className="p-12 text-center mb-6">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-600 text-lg mb-2">
              কোনো ফলাফল পাওয়া যায়নি
            </p>
            <p className="text-gray-500 text-sm">
              অনুগ্রহ করে অন্য কোনো কীওয়ার্ড দিয়ে চেষ্টা করুন
            </p>
          </Card>
        )}

        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            যোগাযোগের নির্দেশিকা
          </h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• কর্মঘণ্টার বাইরে জরুরি না হলে কল করুন</li>
            <li>• অ্যাপয়েন্টমেন্ট নেওয়ার চেষ্টা করুন</li>
            <li>• সমস্যা সম্পর্কে সংক্ষেপে বলুন</li>
            <li>• জরুরি অবস্থায় সরাসরি হাসপাতালে যান</li>
          </ul>
        </Card>

        <div className="mt-6 text-center text-sm text-gray-500">
          মোট {filteredWorkers.length} জন স্বাস্থ্যকর্মী পাওয়া গেছে
          {searchQuery && ` "${searchQuery}" এর জন্য`}
        </div>
      </div>
    </div>
  );
};

export default Workers;
