import { useParams } from "react-router-dom";
import AppointmentDoctorCard from "./components/AppointmentDoctorCard";
import AppointmentForm from "./components/AppointmentForm";
import { useEffect, useState } from "react";
import { fetchDoctorPublicProfile } from "../../../services/doctorService";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { numberToDay } from "../../../utils/dayMap";
import BackButton from "../../../components/common/components/BackButton";
import { useLoading } from "../../../hooks/useLoading";
const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const { loading, startLoading, stopLoading } = useLoading(true);

  useEffect(() => {
    const load = async () => {
      try {
        startLoading();

        const data = await fetchDoctorPublicProfile(doctorId);

        setDoctor(data);
      } catch (err) {
        console.error(err);
      } finally {
        stopLoading();
      }
    };
    load();
  }, [doctorId, stopLoading, startLoading]);

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <LoadingSpinner />
      </div>
    );

  if (!doctor)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F0F4F8]">
        <p className="text-[#6B839A] font-semibold">Doctor not found</p>
      </div>
    );

  const uiDoctor = {
    id: doctor.doctors_id,
    name: doctor.name,
    avatar: doctor.doctor_profile?.profile_pic_url,
    specialization: doctor.specializations?.name,
    qualification: doctor.qualifications,
    experienceYears: doctor.experience_years,
    hospitalName: doctor.doctor_locations?.hospital_name,
    bio: doctor.doctor_profile?.doctor_bio,
    consultationFee: doctor.consultation_fee || null,
    profile: {
      availableDays:
        doctor.doctor_availability?.map((a) => numberToDay[a.day_of_week]) ||
        [],
      startTime: doctor.doctor_availability?.[0]?.start_time || "",
      endTime: doctor.doctor_availability?.[0]?.end_time || "",
      slotDuration:
        doctor.doctor_availability?.[0]?.slot_duration_minutes || 15,
    },
  };

  return (
    <div className="min-h-screen bg-[#F0F4F8]">
      {/* Top strip */}
      <div className="bg-gradient-to-r from-[#1A6FA8] to-[#336aac] px-8 py-2.5 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-[#38B2A0] animate-pulse" />
        <p className="text-white/75 text-xs font-medium tracking-wide">
          Book your appointment with a verified specialist
        </p>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className=" my-4">
          <BackButton label="Back to Profile" to={`/doctors/${doctorId}`} />
        </div>
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1 h-4 bg-gradient-to-b from-[#1A6FA8] to-[#38B2A0] rounded-full" />
          <p className="text-[10px] font-bold text-[#4A6680] uppercase tracking-[2px]">
            Patient Dashboard / Book Appointment
          </p>
        </div>

        <div className="space-y-5">
          <AppointmentDoctorCard doctor={uiDoctor} />
          <AppointmentForm doctor={uiDoctor} />
        </div>
      </div>
    </div>
  );
};

export default BookAppointmentPage;
