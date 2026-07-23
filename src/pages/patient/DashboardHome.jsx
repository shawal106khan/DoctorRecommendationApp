import { useEffect, useState } from "react";
import { Stethoscope, Search, ShieldCheck, Star } from "lucide-react";
import DiseaseSelect from "./features/doctor-search/DiseaseSelect";
import SearchButton from "./features/doctor-search/SearchButton";
import { useDoctorSearch } from "./features/doctor-search/useDoctorSearch";
import SpecializationSelect from "./components/SpecializationSelect";

const TYPING_WORDS = [
  "Doctor Recommendation System",
  "Find Verified Specialists",
  "Your Health, Our Priority",
  "Search by Disease to get doctors",
];

const DashboardHome = ({ onSearch, onSpecializationSearch, loading }) => {
  const {
    disease,
    setDisease,
    specialization,
    setSpecialization,
    handleSearch,
  } = useDoctorSearch(onSearch, onSpecializationSearch);

  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_WORDS[wordIndex];
    let timeout;
    if (!deleting && charIndex < current.length) {
      timeout = setTimeout(() => {
        setCharIndex((c) => c + 1);
        setDisplayed(current.slice(0, charIndex + 1));
      }, 60);
    } else if (!deleting && charIndex === current.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setCharIndex((c) => c - 1);
        setDisplayed(current.slice(0, charIndex - 1));
      }, 35);
    } else if (deleting && charIndex === 0) {
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((w) => (w + 1) % TYPING_WORDS.length);
      }, 100);
    }
    return () => clearTimeout(timeout);
  }, [charIndex, deleting, wordIndex]);

  return (
    <div className="relative bg-white border-b border-[#D6E6F2] overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#E8F4FD] rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#38B2A0]/8 rounded-full blur-3xl pointer-events-none" />

      {/* TOP STRIP */}
      <div className="relative bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse flex-shrink-0" />
          <p className="text-white/75 text-xs font-medium tracking-wide">
            AI-powered doctor recommendations — free & reliable
          </p>
        </div>
        <div className="hidden sm:flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-white/60 text-[10px]">
            <ShieldCheck size={11} /> Verified Doctors
          </div>
          <div className="flex items-center gap-1.5 text-white/60 text-[10px]">
            <Star size={11} fill="currentColor" /> 4.8 Rating
          </div>
        </div>
      </div>

      <div className="relative px-6 lg:px-12 pt-6 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-4">
          <div className="w-1 h-4 bg-[#1A6FA8] rounded-full" />
          <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
            Patient Dashboard
          </p>
        </div>

        {/* Typing title */}
        <div style={{ minHeight: 64 }} className="mb-3">
          <h2 className="text-3xl lg:text-4xl font-bold text-[#0D2E4E] leading-tight">
            {displayed}
            <span className="inline-block w-0.5 h-8 bg-[#1A6FA8] ml-1 align-middle animate-pulse" />
          </h2>
        </div>

        <p className="text-sm text-[#6B839A] mb-7 max-w-lg leading-relaxed">
          Select your disease or specialization and get instantly matched with
          top verified specialists — personalized just for you.
        </p>

        {/* SEARCH CARD */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-3xl">
            {/* Outer glow */}
            <div className="absolute -inset-[3px] rounded-3xl bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0] opacity-25 blur-xl -z-10" />

            <div className="relative rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(26,111,168,0.18)]">
              {/* Card header */}
              <div className="bg-gradient-to-br from-[#1A6FA8] via-[#1e7bbf] to-[#336aac] px-7 py-5 relative overflow-hidden">
                <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white opacity-5" />
                <div className="absolute bottom-0 left-1/2 w-24 h-24 rounded-full bg-[#38B2A0] opacity-15 blur-2xl" />

                <div className="relative z-10 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="absolute inset-0 rounded-2xl bg-white opacity-15 animate-ping" />
                      <div className="relative w-11 h-11 rounded-2xl bg-white/20 border border-white/30 backdrop-blur-sm flex items-center justify-center">
                        <Search size={18} className="text-white" />
                      </div>
                    </div>
                    <div>
                      <p className="text-white font-bold text-lg leading-tight">
                        Find Your Doctor
                      </p>
                      <p className="text-white/60 text-xs mt-0.5">
                        Search by disease or specialization
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex flex-col items-end gap-1.5">
                    <div className="flex items-center gap-1.5 bg-white/15 border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-full">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
                      Doctors Available
                    </div>
                    <div className="flex items-center gap-1.5 bg-white/10 border border-white/15 text-white/70 text-[10px] font-medium px-3 py-1.5 rounded-full">
                      <Stethoscope size={10} />
                      Verified Specialists Only
                    </div>
                  </div>
                </div>
              </div>

              {/* Card body */}
              <div className="bg-white px-7 py-6">
                {/* Search inputs */}
                <div className="flex flex-col lg:flex-row gap-3 items-stretch mb-1">
                  <DiseaseSelect
                    value={disease}
                    onChange={(e) => setDisease(e.target.value)}
                  />
                  <SpecializationSelect
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                  />
                  <SearchButton onClick={handleSearch} loading={loading} />
                </div>

                {/* Divider hint */}
                <div className="flex items-center gap-3 my-3">
                  <div className="flex-1 h-px bg-[#EEF5FC]" />
                  <span className="text-[9px] text-[#AAC2D4] font-semibold uppercase tracking-widest">
                    or search by specialization above
                  </span>
                  <div className="flex-1 h-px bg-[#EEF5FC]" />
                </div>

                {/* Footer */}
                <div className="flex items-center justify-center gap-1.5 pt-1">
                  <ShieldCheck size={11} className="text-[#38B2A0]" />
                  <p className="text-[10px] text-[#8AAEC8]">
                    Your search is private · Results based on verified doctors
                    only
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
