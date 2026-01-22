import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";
import { useAuth } from "../../context/useAuth";

import illustration from "../../assets/LoginPage-img.png";
import AuthLayout from "../../components/common/components/AuthLayout";
import profilePic from "../../assets/profile-pictur.png";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import ForgotPasswordLink from "../../components/common/components/ForgotPasswordLink";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const { errors, validate, setErrors } = useRequiredValidation({
    email: "Email is required",
    password: "Password is required",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  // ✅ Single source of redirect truth

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!validate(formData)) return; // Validate required fields

    // ✅ SET AUTH CONTEXT
    setUser((prev) => ({
      ...prev,

      role: formData.role,
      avatar: profilePic,

      // 🔹 FRONTEND SIMULATION ONLY
      isApproved: true, // simulate admin approval
      approvalNotified: false, // required for approved page
      profileCompleted: false,
    }));

    if (formData.role === "patient") {
      navigate("/patient/dashboard");
    }

    if (formData.role === "doctor") {
      navigate("/doctor/redirect");
    }
  };

  return (
    <AuthLayout image={illustration}>
      <form onSubmit={handleLogin}>
        <div className="w-full max-w-md px-8 py-6 shadow-lg rounded-md bg-white">
          <Title
            heading="Doctor Recommendation & Appointment System"
            subheading="Find the right doctor and manage appointments easily"
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

          <div className="mb-8">
            <RadioGroup
              label="Select Role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              options={[
                { label: "Patient", value: "patient" },
                { label: "Doctor", value: "doctor" },
                { label: "Admin", value: "admin" },
              ]}
            />
          </div>

          <Button text="Login" type="submit" />

          <p className="text-center text-sm text-gray-500 mt-6">
            Don&apos;t have an account?
            <Link
              to="/signup"
              className="text-blue-600 font-medium ml-1 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
