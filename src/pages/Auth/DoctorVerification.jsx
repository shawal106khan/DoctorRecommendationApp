import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/components/Button";
import Title from "../../components/common/components/Title";

import illustration from "../../assets/signup_img.png"; // left illustration
import AuthLayout from "../../components/common/components/AuthLayout";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import { useAuth } from "../../context/useAuth";
import { saveDoctor } from "../../store/doctorStore";

const DoctorVerification = () => {
  const navigate = useNavigate();
  const [licenseFile, setLicenseFile] = useState(null);

  const { errors, validate } = useRequiredValidation({
    licenseFile: "Medical license is required",
  });

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setLicenseFile(file);
    console.log("Selected file:", file);
  };

  const { user } = useAuth();

  const handleNext = () => {
    if (!validate({ licenseFile })) return;

    const reader = new FileReader();
    reader.onload = () => {
      const licenseFileBase64 = reader.result; // This is base64

      saveDoctor({
        id: user.email,
        name: user.name,
        email: user.email,
        phone: user.phone,
        specialization: user.specialization,
        experienceYears: user.experienceYears,
        hospitalName: user.hospitalName,
        qualification: user.qualification,
        licenseNumber: user.licenseNumber,
        licenseFileName: licenseFile.name,
        licenseFileURL: licenseFileBase64, // store base64
        isApproved: false,
      });

      navigate("/pending-approval");
    };

    reader.readAsDataURL(licenseFile); // converts file to base64
  };

  return (
    <AuthLayout image={illustration}>
      <div className="w-full max-w-md p-10 text-center bg-white rounded-md shadow-lg">
        <Title
          heading="Verification Details"
          subheading="Upload your medical license for admin approval"
        />

        {/* Upload Card */}
        <label
          htmlFor="licenseUpload"
          className="mt-8 flex flex-col items-center justify-center
                   border-2 border-dashed border-blue-500
                   rounded-xl p-10 cursor-pointer
                   hover:bg-blue-50 transition"
        >
          <div className="bg-blue-600 p-4 rounded-lg mb-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v12m0 0l-3-3m3 3l3-3m5 5H4"
              />
            </svg>
          </div>

          <p className="font-medium text-blue-600">
            {licenseFile ? licenseFile.name : "Upload Medical License"}
          </p>

          <p className="text-xs text-gray-400 mt-1">
            PDF / JPG / PNG • Max 5MB
          </p>

          <input
            id="licenseUpload"
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {errors.licenseFile && (
          <span className="text-red-500 text-xs">{errors.licenseFile}</span>
        )}

        {/* Action */}
        <div className="mt-10">
          <Button text="Next" type="button" onClick={handleNext} />
        </div>

        {/* Progress */}
        <div className="flex justify-center gap-2 mt-8">
          <span className="w-6 h-1 bg-blue-600 rounded"></span>
          <span className="w-6 h-1 bg-blue-600 rounded"></span>
          <span className="w-6 h-1 bg-gray-300 rounded"></span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default DoctorVerification;
