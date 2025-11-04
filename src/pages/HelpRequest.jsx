import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

const HelpRequest = () => {
  const [formData, setFormData] = useState({
    problemType: "",
    urgency: "",
    description: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save to localStorage for offline storage
    const requests = JSON.parse(localStorage.getItem("helpRequests") || "[]");
    requests.push({
      ...formData,
      id: Date.now(),
      timestamp: new Date().toISOString(),
      status: "pending",
    });
    localStorage.setItem("helpRequests", JSON.stringify(requests));

    alert("আপনার সাহায্যের অনুরোধটি গোপনে জমা হয়েছে। শীঘ্রই যোগাযোগ করা হবে।");
    setFormData({ problemType: "", urgency: "", description: "" });
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
            <span className="text-white text-xl">💬</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            গোপন সাহায্য অনুরোধ
          </h1>
          <p className="text-gray-600 text-lg">নাম-ঠিকানা ছাড়াই সাহায্য চান</p>
        </div>

        <Card className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  সমস্যার ধরন
                </label>
                <select
                  value={formData.problemType}
                  onChange={(e) =>
                    setFormData({ ...formData, problemType: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="mental-health">মানসিক স্বাস্থ্য</option>
                  <option value="physical-health">শারীরিক স্বাস্থ্য</option>
                  <option value="emergency">জরুরি সাহায্য</option>
                  <option value="other">অন্যান্য</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  জরুরিত্ব
                </label>
                <select
                  value={formData.urgency}
                  onChange={(e) =>
                    setFormData({ ...formData, urgency: e.target.value })
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                >
                  <option value="">নির্বাচন করুন</option>
                  <option value="low">সাধারণ</option>
                  <option value="medium">জরুরি</option>
                  <option value="high">অতি জরুরি</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  সমস্যার বিবরণ
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="আপনার সমস্যা সম্পর্কে বিস্তারিত লিখুন..."
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-6 text-white border-0 hover:opacity-90 font-semibold text-lg"
            >
              অনুরোধ পাঠান
            </Button>
          </form>
        </Card>

        <Card className="p-6 mt-6 bg-blue-50 border border-blue-200">
          <h3 className="font-semibold text-blue-900 mb-2">
            গোপনীয়তা নিশ্চিত
          </h3>
          <p className="text-blue-800 text-sm">
            • আপনার কোনো ব্যক্তিগত তথ্য সংরক্ষণ করা হয় না
            <br />
            • অনুরোধটি শুধুমাং authorized স্বাস্থ্যকর্মীদের কাছে পৌঁছাবে
            <br />• ইন্টারনেট না থাকলে অফলাইনে সংরক্ষিত হবে
          </p>
        </Card>
      </div>
    </div>
  );
};

export default HelpRequest;
