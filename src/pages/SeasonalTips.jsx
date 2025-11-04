import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

const SeasonalHealthTips = () => {
  const [selectedSeason, setSelectedSeason] = useState("summer");

  const seasonalTips = {
    summer: {
      title: "গ্রীষ্মকালীন স্বাস্থ্য টিপস",
      tips: [
        "প্রচুর পানি পান করুন - ডিহাইড্রেশন এড়াতে",
        "হালকা রঙের সুতি কাপড় পরুন",
        "সকাল ১১টা থেকে বিকাল ৪টা পর্যন্ত রোদ এড়িয়ে চলুন",
        "হালকা ও সহজে হজম হয় এমন খাবার খান",
        "ORS তৈরি করে রাখুন ডায়রিয়া প্রতিরোধে",
      ],
    },
    rainy: {
      title: "বর্ষাকালীন স্বাস্থ্য টিপস",
      tips: [
        "মশারি ব্যবহার করুন - ডেঙ্গু প্রতিরোধে",
        "বৃষ্টির পানি জমতে না দিন",
        "পরিষ্কার-পরিচ্ছন্নতা বজায় রাখুন",
        "ভেজা কাপড় দ্রুত পরিবর্তন করুন",
        "ফুটানো পানি পান করুন",
      ],
    },
    winter: {
      title: "শীতকালীন স্বাস্থ্য টিপস",
      tips: [
        "গরম কাপড় পরুন - ঠান্ডা থেকে সুরক্ষিত থাকুন",
        "শুষ্ক ত্বকের জন্য ময়েশ্চারাইজার ব্যবহার করুন",
        "ভিটামিন সি সমৃদ্ধ খাবার খান",
        "নিয়মিত হাত ধুয়ে নিন",
        "গরম পানি দিয়ে গোসল করুন",
      ],
    },
  };

  return (
    <div className="min-h-screen">
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
            <span className="text-white text-xl">☁️</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            ঋতু অনুযায়ী স্বাস্থ্য টিপস
          </h1>
          <p className="text-gray-600 text-lg">
            মৌসুম অনুযায়ী রোগ প্রতিরোধের পরামর্শ
          </p>
        </div>

        <Card className="p-6 mb-6">
          <div className="flex flex-wrap gap-2 justify-center">
            <Button
              variant={selectedSeason === "summer" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeason("summer")}
            >
              গ্রীষ্মকাল
            </Button>
            <Button
              variant={selectedSeason === "rainy" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeason("rainy")}
            >
              বর্ষাকাল
            </Button>
            <Button
              variant={selectedSeason === "winter" ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSeason("winter")}
            >
              শীতকাল
            </Button>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">
            {seasonalTips[selectedSeason].title}
          </h2>

          <div className="space-y-3">
            {seasonalTips[selectedSeason].tips.map((tip, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg"
              >
                <span className="text-blue-600 mt-1">•</span>
                <span className="text-gray-700">{tip}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 mt-6 bg-green-50 border border-green-200">
          <h3 className="font-semibold text-green-900 mb-2">
            নিয়মিত আপডেট পান
          </h3>
          <p className="text-green-800 text-sm">
            নতুন স্বাস্থ্য টিপস এবং সতর্কতা notifications এর মাধ্যমে পেতে
            অ্যাপটি নিয়মিত চেক করুন।
          </p>
        </Card>
      </div>
    </div>
  );
};

export default SeasonalHealthTips;
