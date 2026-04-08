import { useEffect, useState } from "react";
import Title from "../../../../../components/common/components/Title";
import { getCurrentUser } from "../../../../../services/authService";
import { getDoctorByUserId } from "../../../../../services/userService";
import { fetchDoctorVerificationStatus } from "../../../../../services/doctorService";
import LoadingSpinner from "../../../../../components/common/components/LoadingSpinner";

const VerificationStep = ({ onNext, onBack }) => {
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const load = async () => {
      try {
        const userId = await getCurrentUser();
        const doctor = await getDoctorByUserId(userId);

        const nextStatus = await fetchDoctorVerificationStatus(
          doctor.doctors_id,
        );
        if (!mounted) return;
        setStatus(nextStatus);
      } catch {
        if (mounted) setStatus("pending");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="max-w-md  mx-auto p-6">
      <Title
        heading="Verification Status"
        subheading="Your profile is verified by our admin team"
      />

      {loading ? (
        <LoadingSpinner text="Checking verification status..." />
      ) : status === "approved" ? (
        <div className="bg-green-50 border border-green-200 px-4 py-9 rounded-lg">
          <p className="font-medium text-green-700">Approved</p>
          <p className="text-sm text-green-600 mt-1">
            Your medical license has been verified by our admin team.
          </p>
        </div>
      ) : status === "rejected" ? (
        <div className="bg-red-50 border border-red-200 px-4 py-9 rounded-lg">
          <p className="font-medium text-red-700">Rejected</p>
          <p className="text-sm text-red-600 mt-1">
            Your verification was rejected. Please contact support.
          </p>
        </div>
      ) : (
        <div className="bg-yellow-50 border border-yellow-200 px-4 py-9 rounded-lg">
          <p className="font-medium text-yellow-700">Pending</p>
          <p className="text-sm text-yellow-600 mt-1">
            Your verification is under review. Please wait.
          </p>
        </div>
      )}

      <div className="mt-8 flex justify-between text-sm">
        <span
          onClick={onBack}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        >
          ← Back
        </span>

        <span
          onClick={onNext}
          className="cursor-pointer bg-blue-600 
           border border-gray-400 rounded-lg py-2 px-5 
            text-white font-medium hover:underline"
        >
          Next →
        </span>
      </div>
    </div>
  );
};

export default VerificationStep;
