import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const Symptoms = () => {
  const symptoms = [
    {
      symptom: "জ্বর ৩ দিনের বেশি",
      action: "ডাক্তারের পরামর্শ নিন",
      urgency: "medium",
    },
    {
      symptom: "শ্বাসকষ্ট",
      action: "অবিলম্বে হাসপাতালে যান",
      urgency: "high",
    },
    {
      symptom: "বুক ব্যথা",
      action: "জরুরি বিভাগে যোগাযোগ করুন",
      urgency: "high",
    },
    {
      symptom: "লক্ষণীয় ওজন হ্রাস",
      action: "ডাক্তার দেখান",
      urgency: "medium",
    },
    {
      symptom: "তীব্র মাথাব্যথা",
      action: "দ্রুত চিকিৎসা নিন",
      urgency: "high",
    },
    {
      symptom: "দৃষ্টিশক্তি ঝাপসা হওয়া",
      action: "চক্ষু বিশেষজ্ঞ দেখান",
      urgency: "medium",
    },
  ];

  const emergencyContacts = [
    { name: "জাতীয় জরুরি সেবা", number: "৯৯৯" },
    { name: "স্বাস্থ্য বাতায়ন", number: "১৬২৬৩" },
    { name: "মনবন্ধু হেল্পলাইন", number: "০৯৬৩৮-৭৭৭৭৭৭" },
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
            <span className="text-white text-xl">⚠️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            রোগের লক্ষণ সচেতনতা
          </h1>
          <p className="text-gray-600 text-lg">
            বিপদ চিহ্ন সম্পর্কে জানুন ও সচেতন থাকুন
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            গুরুত্বপূর্ণ লক্ষণসমূহ
          </h3>
          <div className="space-y-4">
            {symptoms.map((item, index) => (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${
                  item.urgency === "high"
                    ? "border-red-200 bg-red-50"
                    : "border-yellow-200 bg-yellow-50"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900">
                      {item.symptom}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{item.action}</p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded text-xs font-medium ${
                      item.urgency === "high"
                        ? "bg-red-100 text-red-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {item.urgency === "high" ? "জরুরি" : "সতর্কতা"}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            জরুরি যোগাযোগ
          </h3>
          <div className="space-y-3">
            {emergencyContacts.map((contact, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-blue-50 rounded-lg"
              >
                <span className="font-medium text-gray-900">
                  {contact.name}
                </span>
                <a
                  href={`tel:${contact.number}`}
                  className="text-blue-600 font-semibold hover:text-blue-800"
                >
                  {contact.number}
                </a>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">সতর্কতা</h3>
          <p className="text-blue-800 text-sm">
            এটি শুধুমাত্র সচেতনতার জন্য। সেলফ-ডায়াগনোসিস না করে ডাক্তারের
            পরামর্শ নিন। জরুরি অবস্থায় অবিলম্বে নিকটস্থ হাসপাতালে যোগাযোগ করুন।
          </p>
        </Card>
      </div>
    </div>
  );
};

export default Symptoms;
