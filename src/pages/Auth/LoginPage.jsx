import React, { useState } from "react";
import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";
import AuthSideImage from "../../components/common/components/AuthSideImage";
import illustration from "../../assets/LoginPage-img.png";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("patient");

  const handleLogin = (e) => {
    e.preventDefault();
    console.log({ email, password, role });
    alert(`Logged in as ${role} (Frontend only)`);
  };

  return (
    <div className="min-h-screen flex">
      {/* LEFT SECTION */}

      <AuthSideImage image={illustration} />

      {/* RIGHT SECTION */}
      <div className="lg:w-1/2 flex items-center justify-center bg-white">
        <form onSubmit={handleLogin}>
          <div className="w-full lg:max-w-md px-6 py-3 shadow-md shadow-slate-300 rounded-md bg-slate-20">
            <Title
              heading="Doctor Recommendation & Appointment System"
              subheading="Find the right doctor and manage appointments easily"
            />

            {/* EMAIL */}
            <div className="mb-5">
              <Input
                label="Email address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* PASSWORD */}
            <div className="mb-6">
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* ROLE SELECT */}
            <div className="mb-8">
              <RadioGroup
                label="Select Role"
                name="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
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
              <span className="text-blue-600 cursor-pointer hover:underline ml-1">
                Sign up here
              </span>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
