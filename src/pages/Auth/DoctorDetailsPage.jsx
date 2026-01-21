import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import Title from "../../components/common/components/Title";
import Select from "../../components/common/components/Select";
import AuthLayout from "../../components/common/components/AuthLayout";
import illustration from "../../assets/signup_img.png";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";

const DoctorDetailsPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAuth(); // ✅ ADD THIS

  const [formData, setFormData] = useState({
    phone: "",
    specialization: "",
    otherSpecialization: "",
    license: "",
    experience: "",
    hospital: "",
    qualification: "",
  });

  const { errors, validate, setErrors } = useRequiredValidation({
    phone: "Phone number is required",
    specialization: "Specialization is required",
    license: "License number is required",
    experience: "Experience is required",
    hospital: "Hospital name is required",
    qualification: "Qualification is required",
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
    // ✅ NORMALIZE DATA (backend-ready)
    const specialization =
      formData.specialization === "other"
        ? formData.otherSpecialization
        : formData.specialization;

    // ✅ SAVE INTO AUTH USER
    setUser({
      ...user,
      phone: formData.phone,
      specialization,
      experienceYears: Number(formData.experience) || 0,
      hospitalName: formData.hospital,
      qualification: formData.qualification,
      licenseNumber: formData.license,
      role: "doctor",
      isApproved: false,
      profileCompleted: false,
    });

    navigate("/signup/doctor-verification");
  };

  return (
    <AuthLayout image={illustration}>
      <div className="w-full max-w-md p-9 shadow-lg rounded-md bg-white">
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
              options={[
                { label: "Cardiology", value: "Cardiology" },
                { label: "Dermatology", value: "Dermatology" },
                { label: "Neurology", value: "Neurology" },
                { label: "Orthopedics", value: "Orthopedics" },
                { label: "General Physician", value: "General Physician" },
                { label: "Other", value: "other" },
              ]}
            />
          </div>

          {formData.specialization === "other" && (
            <Input
              label="Other Specialization"
              error={errors.otherSpecialization}
              name="otherSpecialization"
              placeholder="Please specify"
              value={formData.otherSpecialization}
              onChange={handleChange}
            />
          )}

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
            label="Hospital Name"
            error={errors.hospital}
            name="hospital"
            placeholder="Enter your hospital name"
            value={formData.hospital}
            onChange={handleChange}
          />

          <Input
            label="Qualification"
            error={errors.qualification}
            name="qualification"
            placeholder="Enter your qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          <Button text="Next" type="submit" />
        </form>
      </div>
    </AuthLayout>
  );
};

export default DoctorDetailsPage;
