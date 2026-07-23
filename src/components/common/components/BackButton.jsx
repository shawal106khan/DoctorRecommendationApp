import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackButton = ({ label = "Back to Dashboard", to = -1 }) => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(to)}
      className="flex items-center gap-2 text-sm font-semibold text-[#1A6FA8] hover:text-[#155e8f] transition"
    >
      <ArrowLeft size={16} />
      {label}
    </button>
  );
};

export default BackButton;
