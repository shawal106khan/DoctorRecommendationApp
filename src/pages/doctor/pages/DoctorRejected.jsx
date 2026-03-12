import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/components/Button";

const RejectedPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 font-serif">
      <div className="bg-white px-8 py-10 rounded-xl shadow-md text-center max-w-md">
        <h2 className="text-lg font-semibold text-red-600 mb-3">
          ❌ Your account was rejected
        </h2>
        <p className="text-gray-600 mb-6 text-sm">
          Unfortunately, your doctor account has been rejected by admin.
        </p>

        <Button text="Go to Home" onClick={() => navigate("/")} />
      </div>
    </div>
  );
};

export default RejectedPage;
