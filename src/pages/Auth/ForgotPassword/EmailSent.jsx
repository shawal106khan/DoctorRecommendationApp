import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/components/Button";
import Title from "../../../components/common/components/Title";
import AuthLayout from "../../../components/common/components/AuthLayout";

import illustration from "../../../assets/LoginPage-img.png";

const EmailSent = () => {
  const navigate = useNavigate();

  return (
    <AuthLayout image={illustration}>
      <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg text-center">
        <Title
          heading="Check your email"
          subheading="We’ve sent a password reset link to your email address"
        />

        <p className="text-sm text-gray-600 mt-4">
          If you don’t see the email, check your spam folder.
        </p>

        <div className="mt-8">
          <Button text="Back to Login" onClick={() => navigate("/login")} />
        </div>
      </div>
    </AuthLayout>
  );
};

export default EmailSent;
