import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Input from "../../components/common/components/Input";
import Button from "../../components/common/components/Button";
import Title from "../../components/common/components/Title";
import Select from "../../components/common/components/Select";
import AuthLayout from "../../components/common/components/AuthLayout";
import illustration from "../../assets/signup_img.png";
const DoctorDetailsPage = () => {
  const navigate = useNavigate(); // ✅ FIX 1

  const [formData, setFormData] = useState({
    phone: "",
    specialization: "",
    otherSpecialization: "", // ✅ FIX 2
    license: "",
    experience: "",
    hospital: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // ✅ FIX 3 — direct navigation (doctor flow)
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
              placeholder="03xxxxxxxxx"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <Select
              label="Specialization"
              name="specialization"
              value={formData.specialization}
              onChange={handleChange}
              placeholder="Select specialization"
              options={[
                { label: "Cardiology", value: "cardiology" },
                { label: "Dermatology", value: "dermatology" },
                { label: "Neurology", value: "neurology" },
                { label: "Orthopedics", value: "orthopedics" },
                { label: "Pediatrics", value: "pediatrics" },
                { label: "Gynecology", value: "gynecology" },
                { label: "Psychiatry", value: "psychiatry" },
                { label: "ENT", value: "ent" },
                { label: "General Physician", value: "general_physician" },
                { label: "Other", value: "other" },
              ]}
            />
          </div>

          {/* Conditional Field */}
          {formData.specialization === "other" && (
            <Input
              label="Other Specialization"
              placeholder="Enter specialization"
              name="otherSpecialization"
              value={formData.otherSpecialization}
              onChange={handleChange}
            />
          )}

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="License Number"
              placeholder="PMDC / Council ID"
              name="license"
              value={formData.license}
              onChange={handleChange}
            />

            <Input
              label="Experience (Years)"
              placeholder="5"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          </div>

          <Input
            label="Hospital Name"
            placeholder="Saidu Teaching Hospital, Swat"
            name="hospital"
            value={formData.hospital}
            onChange={handleChange}
          />

          <Input
            label="Qualification"
            placeholder="MBBS, FCPS"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
          />

          <p className="text-xs text-gray-500 mb-4">
            Doctor accounts require admin approval before activation.
          </p>

          <Button text="Next" type="submit" />

          {/* Progress */}
          <div className="flex justify-center gap-2 mt-8">
            <span className="w-6 h-1 bg-blue-600 rounded"></span>
            <span className="w-6 h-1 bg-gray-300 rounded"></span>
            <span className="w-6 h-1 bg-gray-300 rounded"></span>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default DoctorDetailsPage;
