import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";

import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";

import illustration from "../../assets/signup_img.png";
import AuthLayout from "../../components/common/components/AuthLayout";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import { useLoading } from "../../hooks/useLoading";

import ButtonLoader from "../../components/common/components/ButtonLoader";

import { loginWithEmail, signupWithEmail } from "../../services/authService";

import {
  getDoctorByUserId,
  getPatientByUserId,
  insertPatient,
} from "../../services/userService";

const SignupPage = () => {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const redirectTo = searchParams.get("redirect");

  const { loading, startLoading, stopLoading } = useLoading(false);

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
      setErrors((prev) => ({
        ...prev,
        [e.target.name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate(formData)) return;

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");

      return;
    }

    startLoading();

    let user = null;

    let isNewUser = false;

    try {
      const signup = await signupWithEmail(
        formData.email,
        formData.password,
        formData.fullName,
      );

      user = signup.user;

      isNewUser = true;
    } catch (err) {
      if (err?.message?.toLowerCase().includes("user already registered")) {
        const login = await loginWithEmail(formData.email, formData.password);

        user = login.user;
      } else {
        alert(err.message || "Signup failed. Please try again.");

        stopLoading();

        return;
      }
    }

    if (!user?.id) {
      alert("Signup/login failed. Please try again.");

      stopLoading();

      return;
    }

    try {
      if (formData.role === "patient") {
        if (isNewUser) {
          await insertPatient(user.id, formData.fullName, formData.email);
        } else {
          const existingPatient = await getPatientByUserId(user.id);

          if (existingPatient) {
            alert("Patient account already exists.");

            stopLoading();

            return;
          }

          await insertPatient(user.id, formData.fullName, formData.email);
        }

        navigate(redirectTo || "/signup/success");

        return;
      }

      if (formData.role === "doctor") {
        if (!isNewUser) {
          const existingDoctor = await getDoctorByUserId(user.id);

          if (existingDoctor) {
            alert("Doctor account already exists.");

            stopLoading();

            return;
          }
        }

        navigate("/signup/doctor-info");
      }
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout image={illustration}>
      <Title
        heading="Create an Account"
        subheading="Join our platform to book appointments easily"
      />

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
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

        <p className="text-xs text-gray-500 mt-1 mb-3">
          Note: If you already have an account with this email, use the same
          password to add another role.
        </p>

        <RadioGroup
          label="Select Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          options={[
            {
              label: "Patient",
              value: "patient",
            },
            {
              label: "Doctor",
              value: "doctor",
            },
          ]}
        />

        <Button
          type="submit"
          disabled={loading}
          text={loading ? <ButtonLoader text="Creating Account..." /> : "Next"}
        />

        <div className="flex justify-center gap-2 mt-8">
          <span className="w-6 h-1 bg-[#1A6FA8] rounded"></span>

          <span className="w-6 h-1 bg-gray-300 rounded"></span>

          <span className="w-6 h-1 bg-gray-300 rounded"></span>
        </div>

        <p className="text-sm text-gray-500 text-center mt-6">
          Already have an account?{" "}
          <Link
            to={`/login?redirect=${redirectTo || ""}`}
            className="text-[#1A6FA8] font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
