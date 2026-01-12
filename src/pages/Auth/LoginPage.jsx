import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";

import illustration from "../../assets/LoginPage-img.png";
import AuthLayout from "../../components/common/components/AuthLayout";

const LoginPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (formData.role === "patient") {
      navigate("/patient/dashboard");
    } else if (formData.role === "doctor") {
      navigate("/doctor/pending-approval");
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
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
            />
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
