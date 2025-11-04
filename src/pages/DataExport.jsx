import React from "react";
import { Link } from "react-router-dom";
import Card from "../components/Card";

const DataExport = () => {
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
            <span className="text-white text-xl">💾</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            ডেটা এক্সপোর্ট
          </h1>
          <p className="text-gray-600 text-lg">
            NGO-দের জন্য সমষ্টিগত ডেটা রিপোর্ট
          </p>
        </div>

        <Card className="p-6 mb-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            ডেটা সারাংশ
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-gray-600">মোট মুড চেক-ইন</p>
              <p className="text-2xl font-bold text-blue-600">১২৪</p>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-gray-600">সাহায্য অনুরোধ</p>
              <p className="text-2xl font-bold text-green-600">৪৫</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            ডেটা এক্সপোর্ট অপশন
          </h3>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-900">
                সামগ্রিক স্বাস্থ্য রিপোর্ট
              </p>
              <p className="text-sm text-gray-600 mt-1">
                সমষ্টিগত ডেটা without ব্যক্তিগত তথ্য
              </p>
            </div>
            <div className="p-4 border border-gray-200 rounded-lg">
              <p className="font-medium text-gray-900">
                এলাকা ভিত্তিক বিশ্লেষণ
              </p>
              <p className="text-sm text-gray-600 mt-1">
                বিভিন্ন এলাকার স্বাস্থ্য চাহিদা
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default DataExport;
