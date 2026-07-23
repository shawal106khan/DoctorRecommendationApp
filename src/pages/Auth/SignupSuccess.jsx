import { useNavigate } from "react-router-dom";
import Title from "../../components/common/components/Title";
import Button from "../../components/common/components/Button";
import AuthLayout from "../../components/common/components/AuthLayout";

const SignupSuccess = () => {
  const navigate = useNavigate();

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <AuthLayout>
      <div className="">
        {/* Success Icon */}
        <div className="mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 text-green-600 mx-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        {/* Title */}
        <Title
          heading="Account Created Successfully"
          subheading="You can now log in and book appointments easily"
        />

        {/* Description */}
        <p className="text-gray-500 text-sm mt-4">
          Your account has been created successfully. Click below to log in and
          start using the system.
        </p>

        {/* Button */}
        <div className="mt-8">
          <Button text="Go to Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </AuthLayout>
    // </div>
  );
};

export default SignupSuccess;
