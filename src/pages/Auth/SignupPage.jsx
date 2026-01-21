import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";

import illustration from "../../assets/signup_img.png";
import AuthLayout from "../../components/common/components/AuthLayout";
import { useAuth } from "../../context/useAuth";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";

const SignupPage = () => {
  const navigate = useNavigate();
  const { setUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const { errors, validate, setErrors } = useRequiredValidation({
    fullName: "Full name is required",
    email: "Email is required",
    password: "Password is required",
    confirmPassword: "Confirm your password",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(formData)) return; // Validate required fields

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    // ✅ SAVE BASIC USER INFO
    setUser((prev) => ({
      ...prev,
      name: formData.fullName, // 🔥 FIX
      email: formData.email, // 🔥 FIX
      role: formData.role,
    }));

    if (formData.role === "doctor") {
      navigate("/signup/doctor-info");
    } else {
      navigate("/signup/success");
    }
  };

  return (
    <AuthLayout image={illustration}>
      <div className="w-full max-w-md p-9 shadow-lg rounded-md bg-white">
        <Title
          heading="Create an Account"
          subheading="Join our platform to book appointments easily"
        />

        <form onSubmit={handleSubmit}>
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Full Name"
              error={errors.fullName}
              placeholder="Khan"
              value={formData.fullName}
              onChange={handleChange}
              type="text"
              name="fullName"
            />

            <Input
              label="Email Address"
              error={errors.email}
              placeholder="khan@example.com"
              value={formData.email}
              onChange={handleChange}
              type="email"
              name="email"
            />
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Password"
              error={errors.password}
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              type="password"
              name="password"
            />

            <Input
              label="Confirm Password"
              error={errors.confirmPassword}
              placeholder="Confirm password"
              value={formData.confirmPassword}
              onChange={handleChange}
              type="password"
              name="confirmPassword"
            />
          </div>

          {/* Role Selection */}
          <RadioGroup
            label="Select Role"
            name="role"
            value={formData.role}
            onChange={handleChange}
            options={[
              { label: "Patient", value: "patient" },
              { label: "Doctor", value: "doctor" },
            ]}
          />

          <Button text="Next" type="submit" />

          {/* Progress */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-6 h-1 bg-blue-600 rounded"></span>
            <span className="w-6 h-1 bg-gray-300 rounded"></span>
            <span className="w-6 h-1 bg-gray-300 rounded"></span>
          </div>

          {/* Footer */}
          <p className="text-sm text-gray-500 text-center mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignupPage;
