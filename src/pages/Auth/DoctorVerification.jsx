import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "../../components/common/components/Button";
import Title from "../../components/common/components/Title";

import illustration from "../../assets/signup_img.png";
import AuthLayout from "../../components/common/components/AuthLayout";

import { useRequiredValidation } from "../../hooks/useRequiredValidation";
import { useLoading } from "../../hooks/useLoading";

import ButtonLoader from "../../components/common/components/ButtonLoader";

import { getCurrentUser } from "../../services/authService";

import { getDoctorByUserId } from "../../services/userService";

import {
  uploadDoctorLicense,
  upsertDoctorLicense,
} from "../../services/licenseService";

const DoctorVerification = () => {
  const navigate = useNavigate();

  const [licenseFile, setLicenseFile] = useState(null);

  const { loading, startLoading, stopLoading } = useLoading(false);

  const { errors, validate } = useRequiredValidation({
    licenseFile: "Medical license is required",
  });

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setLicenseFile(file);

    console.log("Selected file:", file);

    console.log("Type:", file.type);

    console.log("Size:", file.size);
  };

  const handleNext = async () => {
    if (
      !validate({
        licenseFile,
      })
    )
      return;

    startLoading();

    try {
      const userId = await getCurrentUser();

      const doctor = await getDoctorByUserId(userId);

      const doctorsId = doctor.doctors_id;

      const filePath = await uploadDoctorLicense(userId, licenseFile);

      await upsertDoctorLicense(doctorsId, filePath);

      navigate("/pending-approval");
    } catch (error) {
      console.error("Unexpected error:", error);

      alert("Something went wrong. Please try again.");
    } finally {
      stopLoading();
    }
  };

  return (
    <AuthLayout image={illustration}>
      <Title
        heading="Verification Details"
        subheading="Upload your medical license for admin approval"
      />

      <label
        htmlFor="licenseUpload"
        className="mt-8 flex flex-col items-center justify-center
                   border-2 border-dashed border-[#1A6FA8]
                   rounded-xl p-10 cursor-pointer
                   hover:bg-blue-50 transition"
      >
        <div className="bg-[#1A6FA8] p-4 rounded-lg mb-3">
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

        <p className="font-medium text-[#1A6FA8]">
          {licenseFile ? licenseFile.name : "Upload Medical License"}
        </p>

        <p className="text-xs text-gray-400 mt-1">PDF / JPG / JPEG • Max 5MB</p>

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

      <div className="mt-10">
        <Button
          type="button"
          onClick={handleNext}
          disabled={loading}
          text={loading ? <ButtonLoader text="Uploading..." /> : "Next"}
        />
      </div>

      <div className="flex justify-center gap-2 mt-8">
        <span className="w-6 h-1 bg-[#1A6FA8] rounded"></span>

        <span className="w-6 h-1 bg-[#1A6FA8] rounded"></span>

        <span className="w-6 h-1 bg-gray-300 rounded"></span>
      </div>
    </AuthLayout>
  );
};

export default DoctorVerification;
