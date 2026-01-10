import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AuthSideImage from "../../components/common/components/AuthSideImage";
import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";

import signupImage from "../../assets/signup_img.png"; // change name if needed

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "patient",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.role === "doctor") {
      navigate("/signup/doctor-info");
    } else {
      alert("Patient registered");
    }

    console.log(formData);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Illustration */}
      <AuthSideImage image={signupImage} alt="Signup Illustration" />

      {/* Right Form */}
      <div className="w-full lg:w-3/5 flex items-center justify-center bg-white">
        <div className="w-full lg:max-w-md p-9 shadow-lg shadow-slate-400 rounded-md bg-slate-20">
          <Title
            heading="Create an Account"
            subheading="Join our platform to book appointments easily"
          />

          <form onSubmit={handleSubmit}>
            {/* Row 1 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                placeholder="Khan"
                value={formData.fullName}
                onChange={handleChange}
                type="text"
                name="fullName"
              />

              <Input
                label="Email Address"
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
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                type="password"
                name="password"
              />

              <Input
                label="Confirm Password"
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

            <Button text="Next" type="button" onClick={handleSubmit} />

            <div className="flex justify-center gap-2 mt-8">
              <span className="w-6 h-1  bg-gray-300 rounded"></span>
              <span className="w-6 h-1 bg-gray-300 rounded"></span>
              <span className="w-6 h-1 bg-gray-300 rounded"></span>
            </div>
            {/* Footer */}
            <p className="text-sm text-gray-500 text-center mt-6 font-body">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 font-semibold cursor-pointer hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
