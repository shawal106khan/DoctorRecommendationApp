import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import Title from "../../components/common/components/Title";

import { useAuth } from "../../context/useAuth";

import illustration from "../../assets/LoginPage-img.png";

import AuthLayout from "../../components/common/components/AuthLayout";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";

import { useLoading } from "../../hooks/useLoading";

import ButtonLoader from "../../components/common/components/ButtonLoader";

import ForgotPasswordLink from "../../components/common/components/ForgotPasswordLink";

import { loginWithEmail } from "../../services/authService";

import { getAdminByUserId } from "../../services/adminService";

const AdminLoginPage = () => {
  const { setUser } = useAuth();

  const navigate = useNavigate();

  const { loading, startLoading, stopLoading } = useLoading(false);

  const { errors, validate, setErrors } = useRequiredValidation({
    email: "Email is required",

    password: "Password is required",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));

    if (errors[e.target.name]) {
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: null,
      }));
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate(formData)) return;

    startLoading();

    try {
      const data = await loginWithEmail(formData.email, formData.password);

      const userId = data.user.id;

      const admin = await getAdminByUserId(userId);

      setUser({
        ...admin,
        role: "admin",
      });

      navigate("/admin/dashboard");
    } catch (err) {
      alert(err.message || "Login failed");
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout image={illustration}>
      <form onSubmit={handleLogin}>
        <Title
          heading="Admin Login"
          subheading="Restricted access for administrators"
        />

        <div className="mb-5">
          <Input
            label="Email address"
            error={errors.email}
            type="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="mb-6">
          <Input
            label="Password"
            error={errors.password}
            type="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
          />

          <ForgotPasswordLink />
        </div>

        <Button
          type="submit"
          disabled={loading}
          text={loading ? <ButtonLoader text="Logging in..." /> : "Login"}
        />
      </form>
    </AuthLayout>
  );
};
export default AdminLoginPage;
