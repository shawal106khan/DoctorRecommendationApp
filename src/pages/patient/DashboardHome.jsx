import { useState } from "react";
import { Search } from "lucide-react";

import AuthSideImage from "../../components/common/components/AuthSideImage";
import Select from "../../components/common/components/Select";
import illustration from "../../assets/DasnboardIllustration.png";
import { diseaseOptions } from "../../config/diseaseOptions";

const DashboardHome = () => {
  const [disease, setDisease] = useState("");

  return (
    <div className="bg-slate-100">
      {/* Header */}
      <div className="p-5 flex flex-col">
        <h1 className="font-semibold">Dashboard</h1>
        <span className="text-sm text-gray-500">Welcome 👋</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-5 pe-7 ps-12 pb-12">
        {/* Left Content */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Find Your Perfect Doctor, Instantly.
          </h2>

          <p className="text-sm text-gray-500 mt-2 max-w-md">
            Search for diseases to get personalized doctor recommendations. Your
            health journey starts here.
          </p>

          {/* Search Box */}
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md ">
            {/* Select */}
            <div className="flex-1 mb-0">
              <Select
                name="disease"
                value={disease}
                onChange={(e) => setDisease(e.target.value)}
                placeholder="Select Disease"
                options={diseaseOptions}
              />
            </div>

            {/* Search Button */}
            <button
              className="flex items-center justify-center gap-2
    bg-blue-600 text-white px-6 py-2 rounded-md
    text-sm font-medium hover:bg-blue-700 transition
    h-[42px]"
            >
              <Search size={16} />
              Search
            </button>
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-full max-w-sm">
            <AuthSideImage image={illustration} />

            {/* Decorative Blur */}
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-100 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
