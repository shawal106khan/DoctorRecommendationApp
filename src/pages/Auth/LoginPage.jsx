import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom"; // ✅ added useSearchParams
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
import { supabase } from "../../lib/supabase";
import { useLoading } from "../../hooks/useLoading";
import ButtonLoader from "../../components/common/components/ButtonLoader";

const LoginPage = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams(); // ✅
  const redirectTo = searchParams.get("redirect"); // ✅
  const { loading, startLoading, stopLoading } = useLoading(false);
  const { errors, validate, setErrors } = useRequiredValidation({
    email: "Email is required",
    password: "Password is required",
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "patient",
  });

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
    startLoading();
    try {
      await loginWithEmail(formData.email, formData.password);
      const userId = await getCurrentUser();

      if (formData.role === "patient") {
        try {
          const patient = await getPatientByUserId(userId);

          // ✅ BLOCK SUSPENDED PATIENT
          if (patient?.account_status === "suspended") {
            await supabase.auth.signOut();

            setUser(null);

            navigate("/account-suspended", {
              state: {
                reason: patient?.suspension_reason,
              },
            });

            return;
          }

          if (patient?.account_status === "deleted") {
            await supabase.auth.signOut();

            setUser(null);

            navigate("/account-deleted");

            return;
          }
          setUser({
            ...patient,
            role: "patient",
            avatar: null,
          });

          navigate(redirectTo || "/patient/dashboard");
        } catch (err) {
          alert(err.message);
        }

        return;
      }
      if (formData.role === "doctor") {
        try {
          const doctor = await getDoctorByUserId(userId);

          // ✅ SUSPENDED DOCTOR
          if (doctor?.account_status === "suspended") {
            setUser({
              ...doctor,
              role: "doctor",
              avatar: null,
            });

            navigate("/account-suspended", {
              state: {
                reason: doctor?.suspension_reason,
              },
            });

            return;
          }

          // ✅ DELETED DOCTOR
          if (doctor?.account_status === "deleted") {
            setUser(null);

            navigate("/account-deleted");

            return;
          }

          // ✅ NORMAL LOGIN
          setUser({
            ...doctor,
            role: "doctor",
            avatar: null,
          });

          navigate("/doctor/redirect");
        } catch (err) {
          alert(err.message);
        }

        return;
      }
    } catch (err) {
      alert(err.message);
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout image={illustration}>
      <form onSubmit={handleLogin}>
        <Title
          heading="Doctor Recommendation & Appointment System"
          subheading="Find the right doctor and manage appointments easily"
        />

        <div className="mb-5 sm:mb-5">
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

        <div className="mb-5 sm:mb-6">
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

        <div className="mb-5 sm:mb-8">
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

        <Button
          type="submit"
          disabled={loading}
          text={loading ? <ButtonLoader text="Logging in..." /> : "Login"}
        />

        <p className="text-center text-xs sm:text-sm text-gray-500 mt-3 sm:mt-6">
          Don&apos;t have an account?
          <Link
            to={`/signup?redirect=${redirectTo || ""}`} // ✅
            className="text-[#1A6FA8] font-medium ml-1 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;
