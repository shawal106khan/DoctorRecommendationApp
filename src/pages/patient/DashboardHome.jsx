import AuthSideImage from "../../components/common/components/AuthSideImage";
import illustration from "../../assets/DasnboardIllustration.png";
import { Stethoscope } from "lucide-react";

import DiseaseSelect from "../../components/features/doctor-search/DiseaseSelect";
import SearchButton from "../../components/features/doctor-search/SearchButton";
import { useDoctorSearch } from "../../components/features/doctor-search/useDoctorSearch";

const DashboardHome = ({ onSearch, loading }) => {
  const { disease, setDisease, handleSearch } = useDoctorSearch(onSearch);

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
          <div className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md">
            <DiseaseSelect
              value={disease}
              onChange={(e) => setDisease(e.target.value)}
            />
            {/* Search button*/}
            <SearchButton onClick={handleSearch} loading={loading} />
          </div>
        </div>

        {/* Right Illustration */}
        <div className="hidden lg:flex justify-end">
          <div className="relative w-full max-w-sm">
            <AuthSideImage image={illustration} />
            <div className="absolute -top-6 -right-6 w-28 h-28 bg-blue-100 rounded-full blur-2xl" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
