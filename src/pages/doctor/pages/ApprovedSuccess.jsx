import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/components/Button";

const ApprovedSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-md text-center max-w-md">
        <h2 className="text-2xl font-semibold text-green-600 mb-3">
          🎉 You are approved!
        </h2>

        <p className="text-gray-600 mb-6">
          Your doctor account has been verified. You can now complete your
          profile and become visible to patients.
        </p>

        <Button text="Continue" onClick={() => navigate("/doctor/redirect")} />
      </div>
    </div>
  );
};

export default ApprovedSuccess;
