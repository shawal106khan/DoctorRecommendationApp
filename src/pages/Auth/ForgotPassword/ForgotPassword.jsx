import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../../components/common/components/Input";
import Button from "../../../components/common/components/Button";
import Title from "../../../components/common/components/Title";
import AuthLayout from "../../../components/common/components/AuthLayout";

import illustration from "../../../assets/LoginPage-img.png";
import { useRequiredValidation } from "../../../hooks/useRequiredValidation";

import { authService } from "../ForgotPassword/Services/authService"; // ✅ FIX PATH

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const { errors, validate, setErrors } = useRequiredValidation({
    email: "Email is required",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate({ email })) return;

    // ✅ CORRECT CALL
    authService.sendResetLink(email);

    console.log("Reset link sent to:", email);
    navigate("/email-sent");
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: null }));
    }
  };

  return (
    <AuthLayout image={illustration}>
      <form onSubmit={handleSubmit}>
        <div className="w-full max-w-md p-8 bg-white rounded-md shadow-lg">
          <Title
            heading="Forgot your password?"
            subheading="Enter your email and we’ll send you a reset link"
          />

          <div className="mt-6 mb-6">
            <Input
              label="Email address"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>

          <Button text="Send Reset Link" type="submit" />

          <p className="text-sm text-gray-500 text-center mt-6">
            Remember your password?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-600 font-medium cursor-pointer hover:underline"
            >
              Back to login
            </span>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ForgotPassword;
