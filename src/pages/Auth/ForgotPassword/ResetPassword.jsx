import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Input from "../../../components/common/components/Input";
import Button from "../../../components/common/components/Button";
import Title from "../../../components/common/components/Title";
import AuthLayout from "../../../components/common/components/AuthLayout";

import illustration from "../../../assets/LoginPage-img.png";
import { useRequiredValidation } from "../../../hooks/useRequiredValidation";
import { authService } from "../ForgotPassword/Services/authService"; // ✅ CORRECT PATH

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const { errors, validate, setErrors } = useRequiredValidation({
    password: "Password is required",
    confirmPassword: "Confirm password is required",
  });

  useEffect(() => {
    if (!token) {
      navigate("/login"); // safety
    }
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validate(passwords)) return;

    if (passwords.password !== passwords.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      return;
    }

    // ✅ CORRECT CALL
    try {
      authService.resetPassword(token, passwords.password);
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <AuthLayout image={illustration}>
      <form
        onSubmit={handleSubmit}
        className="max-w-md bg-white p-8 rounded shadow"
      >
        <Title heading="Reset Password" subheading="Create a new password" />

        <Input
          label="New Password"
          type="password"
          placeholder="New Password"
          value={passwords.password}
          error={errors.password}
          onChange={(e) => {
            setPasswords({ ...passwords, password: e.target.value });
            if (errors.password) setErrors((p) => ({ ...p, password: null }));
          }}
        />

        <Input
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          value={passwords.confirmPassword}
          error={errors.confirmPassword}
          onChange={(e) => {
            setPasswords({ ...passwords, confirmPassword: e.target.value });
            if (errors.confirmPassword)
              setErrors((p) => ({ ...p, confirmPassword: null }));
          }}
        />

        <Button text="Reset Password" type="submit" />
      </form>
    </AuthLayout>
  );
};

export default ResetPassword;
