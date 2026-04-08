import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/components/Button";
import Input from "../../components/common/components/Input";
import RadioGroup from "../../components/common/components/RadioGroup";
import Title from "../../components/common/components/Title";
import { useAuth } from "../../context/useAuth";
import illustration from "../../assets/LoginPage-img.png";
import AuthLayout from "../../components/common/components/AuthLayout";
import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import ForgotPasswordLink from "../../components/common/components/ForgotPasswordLink";
import { getCurrentUser, loginWithEmail } from "../../services/authService";
import {
  getDoctorByUserId,
  getPatientByUserId,
} from "../../services/userService";

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

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validate(formData)) return;

    try {
      await loginWithEmail(formData.email, formData.password);
      const userId = await getCurrentUser();

      if (formData.role === "patient") {
        try {
          const patient = await getPatientByUserId(userId);
          setUser({ ...patient, role: "patient", avatar: null });
          navigate("/patient/dashboard");
        } catch (err) {
          alert(err.message);
        }
        return;
      }

      if (formData.role === "doctor") {
        try {
          const doctor = await getDoctorByUserId(userId);
          setUser({ ...doctor, role: "doctor", avatar: null });
          navigate("/doctor/redirect");
        } catch (err) {
          alert(err.message);
        }
        return;
      }
    } catch (err) {
      alert(err.message);
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
