import React from 'react';
import { FaQuestionCircle, FaLifeRing, FaInfoCircle } from 'react-icons/fa';

function HelpAndSupport() {
  return (
    <div className="bg-slate-300 text-gray-800 py-20 px-6 lg:px-8 ">
      <h2 className="text-3xl font-bold text-center text-gray-600">Help & Support</h2>
      <div className="mt-8 flex flex-col lg:flex-row lg:justify-center lg:items-start lg:gap-8">
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-xl">
          <FaQuestionCircle className="text-teal-600 h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">Help Center</h3>
          <p className="text-gray-600 mt-2">Find answers to your questions and get support for all your needs.</p>
          <a href="#" className="mt-4 text-teal-600 hover:underline">Visit Help Center</a>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg mt-8 lg:mt-0 transition-transform transform hover:scale-105 hover:shadow-xl">
          <FaLifeRing className="text-teal-600 h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">Support</h3>
          <p className="text-gray-600 mt-2">Need further assistance? Contact our support team for help.</p>
          <a href="#" className="mt-4 text-teal-600 hover:underline">Get Support</a>
        </div>
        <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg mt-8 lg:mt-0 transition-transform transform hover:scale-105 hover:shadow-xl">
          <FaInfoCircle className="text-teal-600 h-12 w-12 mb-4" />
          <h3 className="text-xl font-semibold">FAQs</h3>
          <p className="text-gray-600 mt-2">Browse through the frequently asked questions for quick answers.</p>
          <a href="#" className="mt-4 text-teal-600 hover:underline">Read FAQs</a>
        </div>
      </div>
    </div>
  );
}

export { HelpAndSupport };
