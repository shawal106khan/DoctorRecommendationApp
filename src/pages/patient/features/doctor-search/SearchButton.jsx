import { Search, Loader2 } from "lucide-react";

const SearchButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`
        relative flex items-center gap-2 justify-center
        px-8 h-12 rounded-xl font-semibold text-sm text-white
        bg-gradient-to-r from-[#1A6FA8] to-[#38B2A0]
        shadow-[0_4px_20px_rgba(26,111,168,0.45)]
        overflow-hidden group transition-all duration-300
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-[0_6px_28px_rgba(26,111,168,0.55)] hover:scale-[1.03] active:scale-[0.98]"}
      `}
    >
      {/* Shine sweep effect */}
      {!loading && (
        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      )}

      {loading ? (
        <Loader2 size={16} className="animate-spin flex-shrink-0" />
      ) : (
        <Search size={16} className="flex-shrink-0" />
      )}
      <span>{loading ? "Searching..." : "Search"}</span>
    </button>
  );
};

export default SearchButton;
