import { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import Title from "../../components/common/components/Title";
import Select from "../../components/common/components/Select";
import AuthLayout from "../../components/common/components/AuthLayout";

import illustration from "../../assets/signup_img.png";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import { useLoading } from "../../hooks/useLoading";

import ButtonLoader from "../../components/common/components/ButtonLoader";

import {
  fetchSpecializations,
  insertDoctorDetails,
} from "../../services/doctorService";

import { getCurrentUserProfile } from "../../services/authService";

const DoctorDetailsPage = () => {
  const navigate = useNavigate();

  const [specializations, setSpecializations] = useState([]);

  const { loading, startLoading, stopLoading } = useLoading(false);

  const [formData, setFormData] = useState({
    phone: "",
    specialization: "",
    license: "",
    experience: "",
    qualification: "",
  });

  const { errors, validate, setErrors } = useRequiredValidation({
    phone: "Phone number is required",

    specialization: "Specialization is required",

    license: "License number is required",

    experience: "Experience is required",

    qualification: "Qualification is required",
  });

  useEffect(() => {
    const loadSpecializations = async () => {
      try {
        const data = await fetchSpecializations();

        setSpecializations(data);
      } catch (err) {
        alert(err.message);
      }
    };

    loadSpecializations();
  }, []);

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

    startLoading();

    try {
      const user = await getCurrentUserProfile();

      const userId = user.id;

      const fullName = user.user_metadata?.full_name || "";

      await insertDoctorDetails({
        userId,
        fullName,
        phone: formData.phone,

        specializationId: formData.specialization,

        license: formData.license,

        experience: formData.experience,

        qualification: formData.qualification,
      });

      navigate("/signup/doctor-verification");
    } catch (err) {
      alert(err.message || "Something went wrong");
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout image={illustration}>
      <Title
        heading="Professional Details"
        subheading="Register to access the doctor recommendation and appointment system"
      />

      <form onSubmit={handleSubmit}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Phone Number"
            error={errors.phone}
            name="phone"
            placeholder="Enter your phone number"
            value={formData.phone}
            onChange={handleChange}
          />

          <Select
            label="Specialization"
            name="specialization"
            value={formData.specialization}
            onChange={handleChange}
            options={specializations.map((s) => ({
              label: s.name,
              value: s.specialization_id,
            }))}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="License Number"
            error={errors.license}
            name="license"
            placeholder="Enter your license number"
            value={formData.license}
            onChange={handleChange}
          />

          <Input
            label="Experience (Years)"
            error={errors.experience}
            name="experience"
            placeholder="e.g., 5"
            value={formData.experience}
            onChange={handleChange}
          />
        </div>

        <Input
          label="Qualification"
          error={errors.qualification}
          name="qualification"
          placeholder="Enter your qualification"
          value={formData.qualification}
          onChange={handleChange}
        />

        <Button
          type="submit"
          disabled={loading}
          text={loading ? <ButtonLoader text="Saving..." /> : "Next"}
        />
      </form>
    </AuthLayout>
  );
};

export default DoctorDetailsPage;
