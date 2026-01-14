import { useState } from "react";
import { Search } from "lucide-react";

import AuthSideImage from "../../components/common/components/AuthSideImage";
import Select from "../../components/common/components/Select";
import illustration from "../../assets/DasnboardIllustration.png";
import { diseaseOptions } from "../../config/diseaseOptions";
import { Stethoscope } from "lucide-react";

const DashboardHome = ({ onSearch }) => {
  const [disease, setDisease] = useState("");

  const handleSearch = () => {
    if (!disease) return;
    onSearch(disease);
  };
  return (
    <div className="bg-white pb-9">
      {/* Header */}
      <div className="p-5 flex flex-col">
        <h1 className="font-semibold text-gray-500">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center pt-5 pe-7 ps-12 pb-12">
        {/* Left Content */}
        <div>
          <div className="flex gap-3">
            <h2 className="flex items-center gap-3 text-2xl font-semibold text-gray-800">
              <Stethoscope className="text-gray-700" size={22} />
              <span>Find Your Perfect Doctor, Instantly</span>
            </h2>
          </div>

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
              onClick={handleSearch}
              className="flex items-center justify-center gap-2
    bg-blue-600 text-white px-6 py-2 rounded-md
    text-sm font-medium hover:bg-blue-700 transition
    h-[42px]"
            >
              <Search size={18} />
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
