import React, { useState } from "react";
import { Link } from "react-router-dom";

import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";
import AuthSideImage from "../../components/common/components/AuthSideImage";
import illustration from "../../assets/LoginPage-img.png";

const LoginPage = () => {
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
    console.log({ formData });
    alert(`Logged in as ${formData.role} `);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}

      <AuthSideImage image={illustration} />

      {/* RIGHT SECTION */}
      <div className="lg:w-3/5 flex items-center justify-center bg-white">
        <form onSubmit={handleLogin}>
          <div className="w-full lg:max-w-md px-8 py-6 shadow-lg shadow-slate-400 rounded-md bg-slate-20">
            <Title
              heading="Doctor Recommendation & Appointment System"
              subheading="Find the right doctor and manage appointments easily"
            />

            {/* EMAIL */}
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

            {/* PASSWORD */}
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

            {/* ROLE SELECT */}
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

            {/* LOGIN BUTTON */}
            <Button text="Login" type="submit" />

            {/* SIGN UP */}
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
      </div>
    </div>
  );
};

export default LoginPage;
