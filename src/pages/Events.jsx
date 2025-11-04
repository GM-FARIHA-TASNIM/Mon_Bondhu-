import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Events = () => {
  const events = [
    {
      title: "নিখরচায় স্বাস্থ্য ক্যাম্প",
      location: "রাজশাহী, পবা",
      date: "১৫ ডিসেম্বর ২০২৪",
      time: "সকাল ৯টা - বিকাল ৪টা",
      services: [
        "চিকিৎসা পরামর্শ",
        "ব্লাড প্রেসার চেক",
        "ডায়াবেটিস টেস্ট",
        "মূল্যায়ন",
      ],
    },
    {
      title: "রক্তদান শিবির",
      location: "রাজশাহী মেডিকেল কলেজ",
      date: "২০ ডিসেম্বর ২০২৪",
      time: "সকাল ৮টা - দুপুর ২টা",
      services: ["রক্তদান", "ব্লাড গ্রুপ টেস্ট", "স্বাস্থ্য পরীক্ষা"],
    },
    {
      title: "মা ও শিশু স্বাস্থ্য ক্যাম্প",
      location: "রাজশাহী, বোয়ালিয়া",
      date: "২৫ ডিসেম্বর ২০২৪",
      time: "সকাল ১০টা - বিকাল ৩টা",
      services: ["প্রসূতি পরামর্শ", "শিশু স্বাস্থ্য", "টিকা প্রদান"],
    },
  ];

  const upcomingEvents = [
    {
      title: "ডায়াবেটিস সচেতনতা কর্মশালা",
      date: "৫ জানুয়ারি ২০২৫",
      type: "কর্মশালা",
    },
    {
      title: "মানসিক স্বাস্থ্য সেমিনার",
      date: "১২ জানুয়ারি ২০২৫",
      type: "সেমিনার",
    },
  ];

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
            <span className="text-white text-xl">📅</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            স্বাস্থ্য ক্যাম্প ইভেন্ট
          </h1>
          <p className="text-gray-600 text-lg">
            এলাকার স্বাস্থ্য ক্যাম্প ও সেবার খবর পান
          </p>
        </div>

        <div className="space-y-6 mb-8">
          {events.map((event, index) => (
            <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {event.title}
              </h3>
              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-2">
                  <span>📍</span>
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>📅</span>
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>⏰</span>
                  <span>{event.time}</span>
                </div>
              </div>
              <div>
                <p className="font-medium text-gray-900 mb-2">সেবাসমূহ:</p>
                <div className="flex flex-wrap gap-2">
                  {event.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            আসন্ন ইভেন্ট
          </h3>
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="p-3 border border-gray-200 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-900">{event.title}</p>
                    <p className="text-sm text-gray-600">{event.date}</p>
                  </div>
                  <span className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                    {event.type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">ইভেন্ট আপডেট</h3>
          <p className="text-green-800 text-sm">
            নতুন ইভেন্টের notifications পেতে অ্যাপটি নিয়মিত চেক করুন। কোনো
            ইভেন্ট সম্পর্কে বিস্তারিত জানতে স্থানীয় স্বাস্থ্য কেন্দ্রে যোগাযোগ
            করুন।
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Events;
