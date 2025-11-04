import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const HealthMap = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const healthFacilities = [
    {
      id: 1,
      name: "গ্রামীণ স্বাস্থ্য কেন্দ্র",
      type: "হাসপাতাল",
      location: "রাজশাহী, পবা",
      phone: "০১৭১২-৩৪৫৬৭৮",
      hours: "সকাল ৮টা - রাত ৮টা",
      distance: "২.৫ কিমি",
    },
    {
      id: 2,
      name: "জনস্বাস্থ্য ক্লিনিক",
      type: "ক্লিনিক",
      location: "রাজশাহী, দুর্গাপুর",
      phone: "০১৮১৫-৯৮৭৬৫৪",
      hours: "সকাল ৯টা - সন্ধ্যা ৬টা",
      distance: "৪.২ কিমি",
    },
    {
      id: 3,
      name: "কমিউনিটি ফার্মেসি",
      type: "ফার্মেসি",
      location: "রাজশাহী, পবা বাজার",
      phone: "০১৯২২-১১২২৩৩",
      hours: "সকাল ৭টা - রাত ১০টা",
      distance: "১.৮ কিমি",
    },
    {
      id: 4,
      name: "স্বাস্থ্য সেবা NGO",
      type: "NGO",
      location: "রাজশাহী, তানোর",
      phone: "০১৬৩৩-৭৮৯০১২",
      hours: "সকাল ৯টা - বিকাল ৫টা",
      distance: "৬.১ কিমি",
    },
  ];

  const filteredFacilities = healthFacilities.filter(
    (facility) =>
      facility.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      facility.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <span className="mr-2">←</span>
          ফিরে যান
        </Link>

        <div className="mb-8 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full gradient-health flex items-center justify-center shadow-lg">
            <span className="text-white text-xl">📍</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            কমিউনিটি হেলথ ম্যাপ
          </h1>
          <p className="text-gray-600 text-lg">
            কাছাকাছি স্বাস্থ্য সেবা খুঁজুন
          </p>
        </div>

        <div className="mb-6">
          <div className="relative max-w-2xl mx-auto">
            <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              🔍
            </span>
            <Input
              type="text"
              placeholder="নাম, ধরন বা স্থান দিয়ে খুঁজুন..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base border-2 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {filteredFacilities.map((facility) => (
            <Card
              key={facility.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {facility.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-600">
                    {facility.type}
                  </span>
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-100 text-xs font-semibold text-gray-700">
                  {facility.distance}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-blue-600 mt-0.5">📍</span>
                  <span>{facility.location}</span>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-blue-600 mt-0.5">📞</span>
                  <a
                    href={`tel:${facility.phone}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {facility.phone}
                  </a>
                </div>

                <div className="flex items-start gap-3 text-sm text-gray-600">
                  <span className="text-blue-600 mt-0.5">⏰</span>
                  <span>{facility.hours}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                <Button variant="outline" size="sm" className="flex-1">
                  দিকনির্দেশনা
                </Button>
                <Button
                  size="sm"
                  className="flex-1 text-white border-0 hover:opacity-90"
                >
                  কল করুন
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredFacilities.length === 0 && (
          <Card className="p-12 text-center">
            <p className="text-gray-600 text-lg">কোনো ফলাফল পাওয়া যায়নি</p>
          </Card>
        )}

        <Card className="p-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
            <span className="text-blue-600">ℹ️</span>
            তথ্য
          </h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>ইন্টারনেট ছাড়া পূর্বের ডেটা দেখতে পারবেন</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>নিয়মিত আপডেট পেতে ইন্টারনেট সংযোগ দিন</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 mt-1">•</span>
              <span>জরুরি সেবার জন্য হটলাইন: ০৯৬৩৮-৭৭৭৭৭৭</span>
            </li>
          </ul>
        </Card>
      </div>
    </div>
  );
};

export default HealthMap;
