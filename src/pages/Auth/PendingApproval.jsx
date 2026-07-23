import { useNavigate } from "react-router-dom";
import Title from "../../components/common/components/Title";
import Button from "../../components/common/components/Button";
import AuthLayout from "../../components/common/components/AuthLayout";

const PendingApproval = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout>
      <div className=" flex items-center justify-center ">
        <div className="">
          <div className="mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-16 w-16  text-[#336aac]  mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>

          <Title
            heading="Waiting for Approval"
            subheading="Your documents have been submitted successfully"
          />

          <p className="text-gray-500 text-sm mt-4">
            Our admin team is reviewing your medical license. You will be
            notified once your account is approved.
          </p>

          <div className="mt-8">
            <Button text="Go to Login" onClick={() => navigate("/login")} />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default PendingApproval;
