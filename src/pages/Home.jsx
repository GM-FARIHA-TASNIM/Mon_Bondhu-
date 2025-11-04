import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const features = [
  {
    id: 1,
    title: "মানসিক স্বাস্থ্য চেক-ইন",
    description: "প্রতিদিন নিজের মুড ও মানসিক অবস্থা রেকর্ড করুন",
    icon: "❤️",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/mental-health",
  },
  {
    id: 2,
    title: "কমিউনিটি হেলথ ম্যাপ",
    description: "কাছাকাছি হাসপাতাল, ক্লিনিক ও সেবা খুঁজুন",
    icon: "📍",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/health-map",
  },
  {
    id: 3,
    title: "গোপন সাহায্য অনুরোধ",
    description: "নাম-ঠিকানা ছাড়াই সাহায্যের জন্য অনুরোধ করুন",
    icon: "💬",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/help-request",
  },
  {
    id: 4,
    title: "ঋতু অনুযায়ী স্বাস্থ্য টিপস",
    description: "মৌসুম অনুযায়ী রোগ প্রতিরোধের পরামর্শ",
    icon: "☁️",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/seasonal-tips",
  },
  {
    id: 5,
    title: "মা ও শিশু স্বাস্থ্য",
    description: "গর্ভবতী মা ও শিশুর স্বাস্থ্য ট্র্যাকিং",
    icon: "👶",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/maternal-health",
  },
  {
    id: 6,
    title: "রোগের লক্ষণ সচেতনতা",
    description: "বিপদ চিহ্ন সম্পর্কে জানুন ও সচেতন থাকুন",
    icon: "⚠️",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/symptoms",
  },
  {
    id: 7,
    title: "স্বাস্থ্য ক্যাম্প ইভেন্ট",
    description: "এলাকার স্বাস্থ্য ক্যাম্প ও সেবার খবর পান",
    icon: "📅",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/events",
  },
  {
    id: 8,
    title: "স্বাস্থ্যকর্মী ডিরেক্টরি",
    description: "স্থানীয় স্বাস্থ্যকর্মীদের যোগাযোগ তথ্য",
    icon: "👥",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/workers",
  },
  {
    id: 9,
    title: "ডেটা এক্সপোর্ট",
    description: "NGO-দের জন্য সমষ্টিগত ডেটা রিপোর্ট",
    icon: "💾",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/data-export",
  },
  {
    id: 10,
    title: "ভয়েস সহায়ক",
    description: "কথা বলে ব্যবহার করুন সহজভাবে",
    icon: "🎤",
    color: "from-[#075985] to-[#0ea5e9]",
    path: "/voice-assistant",
  },
];

const highlights = [
  {
    icon: "🛡️",
    title: "গোপনীয়তা সুরক্ষিত",
    description: "আপনার তথ্য সম্পূর্ণ নিরাপদ",
  },
  {
    icon: "📱",
    title: "অফলাইন ব্যবহার",
    description: "ইন্টারনেট ছাড়াই চালু থাকে",
  },
  {
    icon: "🔤",
    title: "সহজ বাংলা ভাষা",
    description: "সবার জন্য বোধগম্য",
  },
];

const Home = () => {
  const [showEmergencyOptions, setShowEmergencyOptions] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const emergencyContacts = [
    { name: "ন্যাশনাল ইমার্জেন্সি", number: "199", type: "medical" },
    { name: "ফায়ার সার্ভিস", number: "161", type: "fire" },
    { name: "পুলিশ", number: "999", type: "police" },
    { name: "মনবন্ধু হেল্পলাইন", number: "096387777777", type: "mental" },
    { name: "মহিলা ও শিশু সহায়তা", number: "109", type: "women" },
    { name: "জরুরি অ্যাম্বুলেন্স", number: "16263", type: "ambulance" },
  ];

  const quickHelpTips = [
    "🚑 হার্ট অ্যাটাক হলে: শুয়ে পড়ুন, আঁটসাঁট পোশাক ঢিলা করুন",
    "🔥 আগুন লাগলে: নিচে হেঁটে বের হন, লিফট ব্যবহার করবেন না",
    "💊 বিষক্রিয়া হলে: সঙ্গে সঙ্গে ডাক্তার ডাকুন, বমি করাবেন না",
    "🧠 প্যানিক অ্যাটাক: গভীর শ্বাস নিন, শান্ত স্থানে বসুন",
    "🩸 রক্তপাত হলে: পরিষ্কার কাপড় দিয়ে চাপ দিন",
    "🤕 হাড় ভাঙলে: নড়াচড়া করাবেন না, সাপোর্ট দিন",
  ];

  const handleLocationShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "জরুরি সাহায্য প্রয়োজন",
          text: "আমার এখন জরুরি সাহায্য প্রয়োজন। আমার লোকেশন শেয়ার করছি।",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Sharing cancelled");
      }
    } else {
      alert("লোকেশন শেয়ার করার অপশনটি আপনার ডিভাইসে সাপোর্ট করে না।");
    }
  };

  const handleCopyMessage = () => {
    navigator.clipboard.writeText(
      "আমার এখন জরুরি সাহায্য প্রয়োজন। দয়া করে যোগাযোগ করুন।"
    );
    alert("মেসেজ কপি করা হয়েছে!");
  };

  return (
    <div className="font-['Hind_Siliguri']">
      {/* Hero Section - Updated with #075985 color */}
      <section
        id="home"
        className="bg-gradient-to-r from-[#075985] to-[#0ea5e9] text-white py-16"
      >
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#e0f2fe] border border-[#bae6fd] mb-4">
              <span className="text-[#075985]">❤️</span>
              <span className="text-sm font-medium text-[#075985]">
                SDG 3: Good Health & Well-being
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              মনবন্ধু - আপনার মানসিক স্বাস্থ্য সহচর
            </h1>
            <p className="text-xl mb-6">
              গ্রামীণ বাংলাদেশের জন্য তৈরি একটি ডিজিটাল স্বাস্থ্য সহচর, যেখানে
              মানসিক স্বাস্থ্য সেবা আপনার আঙুলের ডগায়
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() =>
                  document
                    .getElementById("features")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="bg-white text-[#075985] px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition duration-300"
              >
                সেবা সমূহ দেখুন
              </button>
              <button
                onClick={() =>
                  document
                    .getElementById("emergency")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-[#075985] transition duration-300"
              >
                জরুরি সেবা
              </button>
            </div>
          </div>

          <div className="md:w-1/2 flex justify-center">
            <div className="relative">
              <div className="w-64 h-64 bg-white rounded-2xl shadow-2xl flex items-center justify-center p-6 transform rotate-3">
                <div className="text-center">
                  <div className="w-20 h-20 bg-[#e0f2fe] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-[#075985] text-3xl">❤️</span>
                  </div>
                  <h3 className="text-[#075985] font-bold text-lg mb-2">
                    আপনার মনের অবস্থা
                  </h3>
                  <p className="text-gray-600 text-sm">
                    আজকের দিনটি কেমন যাচ্ছে?
                  </p>
                </div>
              </div>
              <div className="absolute -bottom-6 -left-6 w-40 h-40 bg-yellow-400 rounded-2xl shadow-lg flex items-center justify-center p-4 transform -rotate-6">
                <div className="text-center">
                  <span className="text-yellow-800 text-2xl mb-2">📍</span>
                  <p className="text-yellow-900 font-semibold text-sm">
                    নিকটবর্তী স্বাস্থ্যকেন্দ্র
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {highlights.map((highlight, index) => (
            <Card
              key={index}
              className="p-6 text-center hover:shadow-lg transition-all duration-300 card-hover border border-gray-200"
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-[#075985] to-[#0ea5e9] flex items-center justify-center">
                <span className="text-white text-lg">{highlight.icon}</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {highlight.title}
              </h3>
              <p className="text-sm text-gray-600">{highlight.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="container mx-auto px-4 py-12 md:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            আমাদের <span className="text-[#075985]">সেবা সমূহ</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            ১০টি বিশেষ ফিচার যা আপনার স্বাস্থ্য সেবাকে সহজ ও কার্যকর করবে
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {features.map((feature) => (
            <Link key={feature.id} to={feature.path} className="group">
              <Card className="h-full p-6 hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1 card-hover border border-gray-200">
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 shadow-md`}
                >
                  <span className="text-white text-xl">{feature.icon}</span>
                </div>

                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-[#075985] transition-colors">
                  {feature.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {feature.description}
                </p>

                <div className="flex items-center text-[#075985] text-sm font-medium group-hover:gap-2 transition-all">
                  <span>আরও জানুন</span>
                  <span className="opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-2 transition-all">
                    →
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Emergency Section */}
      <section id="emergency" className="container mx-auto px-4 py-12 md:py-16">
        <Card className="max-w-4xl mx-auto p-8 md:p-12 bg-gradient-to-r from-[#075985] to-[#0ea5e9] text-white shadow-lg border-0">
          <div className="text-center space-y-4">
            <span className="text-5xl">⚠️</span>
            <h2 className="text-2xl md:text-3xl font-bold">
              জরুরি সাহায্য প্রয়োজন?
            </h2>
            <p className="text-white/90 text-lg">
              যেকোনো মানসিক বা শারীরিক স্বাস্থ্য সমস্যায় আমরা আছি আপনার পাশে
            </p>

            {/* Emergency Quick Actions */}
            {showEmergencyOptions && (
              <div className="mt-6 p-6 bg-white/20 rounded-lg space-y-4">
                <h3 className="font-bold text-xl mb-4">দ্রুত সাহায্য পান</h3>

                {/* Emergency Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                  {emergencyContacts.map((contact, index) => (
                    <button
                      key={index}
                      onClick={() => window.open(`tel:${contact.number}`)}
                      className="bg-white/20 hover:bg-white/30 p-3 rounded-lg text-left transition-all flex items-center gap-3"
                    >
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          contact.type === "medical"
                            ? "bg-red-500"
                            : contact.type === "mental"
                            ? "bg-green-500"
                            : contact.type === "fire"
                            ? "bg-orange-500"
                            : contact.type === "police"
                            ? "bg-blue-500"
                            : "bg-purple-500"
                        }`}
                      >
                        <span className="text-white text-sm">
                          {contact.type === "medical"
                            ? "🚑"
                            : contact.type === "mental"
                            ? "🧠"
                            : contact.type === "fire"
                            ? "🔥"
                            : contact.type === "police"
                            ? "👮"
                            : "👶"}
                        </span>
                      </div>
                      <div>
                        <div className="font-semibold text-sm">
                          {contact.name}
                        </div>
                        <div className="text-white/80 text-xs">
                          {contact.number}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Quick Help Tips */}
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold">🚨 জরুরি পরামর্শ</h4>
                    <button
                      onClick={() => setShowQuickHelp(!showQuickHelp)}
                      className="text-sm bg-white/20 px-3 py-1 rounded-full"
                    >
                      {showQuickHelp ? "লুকান" : "দেখুন"}
                    </button>
                  </div>

                  {showQuickHelp && (
                    <div className="space-y-2 text-left">
                      {quickHelpTips.map((tip, index) => (
                        <div
                          key={index}
                          className="text-sm bg-white/10 p-2 rounded"
                        >
                          {tip}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Location Sharing */}
                <div className="bg-white/10 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">
                    📍 আপনার লোকেশন শেয়ার করুন
                  </h4>
                  <div className="flex gap-2">
                    <button
                      onClick={handleLocationShare}
                      className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm transition-all"
                    >
                      লোকেশন শেয়ার
                    </button>
                    <button
                      onClick={handleCopyMessage}
                      className="flex-1 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm transition-all"
                    >
                      মেসেজ কপি
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Main Emergency Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="bg-white text-[#075985] hover:bg-white/90 font-semibold"
                onClick={() => setShowEmergencyOptions(!showEmergencyOptions)}
              >
                {showEmergencyOptions
                  ? "সাহায্য অপশন লুকান"
                  : "এখনই সাহায্য চান"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10"
                onClick={() => window.open("tel:096387777777")}
              >
                📞 হেল্পলাইন: ০৯৬৩৮-৭৭৭৭৭৭
              </Button>
            </div>

            {/* Quick Emergency Status */}
            <div className="pt-4 flex flex-wrap justify-center gap-2">
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                🚑 অ্যাম্বুলেন্স: ১৫ মিনিট
              </span>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                👨‍⚕️ ডাক্তার: ২৪/৭ উপলব্ধ
              </span>
              <span className="text-xs bg-white/20 px-3 py-1 rounded-full">
                🧠 কাউন্সেলিং: এখনই
              </span>
            </div>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-[#075985] to-[#0ea5e9] flex items-center justify-center shadow-lg">
              <span className="text-white">❤️</span>
            </div>
            <span className="text-xl font-bold text-gray-900">মনবন্ধু</span>
          </div>
          <p className="text-gray-600 text-sm mb-2">
            গ্রামীণ স্বাস্থ্য সেবার জন্য প্রযুক্তি সমাধান
          </p>
          <p className="text-gray-500 text-xs">
            © ২০২৫ মনবন্ধু। সর্বস্বত্ব সংরক্ষিত।
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
