import { Search } from "lucide-react";

const SearchButton = ({ onClick, loading }) => {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`bg-blue-600 text-white px-6 py-2 rounded-md mt-2
        transition text-sm font-medium h-[42px] flex items-center gap-2 justify-center
        ${loading ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"}
      `}
    >
      <Search size={18} />
      {loading ? "Searching..." : "Search"}
    </button>
  );
};

export default SearchButton;
