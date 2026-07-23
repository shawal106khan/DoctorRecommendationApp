import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchDoctorPublicProfile } from "../../../services/doctorService";
import DoctorHero from "./components/DoctorHero";
import DoctorStats from "./components/DoctorStats";
import DoctorReviews from "./components/DoctorReviews";
import DoctorAvailability from "./components/DoctorAvailability";
import DoctorLocation from "./components/DoctorLocation";
import BookAppointmentCard from "./components/BookAppointmentCard";
import {
  getDoctorAverageRating,
  getDoctorRatingDistribution,
} from "../../../utils/doctorRatings";
import { numberToDay } from "../../../utils/dayMap";
import LoadingSpinner from "../../../components/common/components/LoadingSpinner";
import { useLoading } from "../../../hooks/useLoading";
import BackButton from "../../../components/common/components/BackButton";

const DoctorProfilePublic = () => {
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [distribution, setDistribution] = useState([]);
  const { loading, stopLoading } = useLoading(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchDoctorPublicProfile(doctorId);
        setDoctor(data);
        const [avgData, distData] = await Promise.all([
          getDoctorAverageRating(data.doctors_id),
          getDoctorRatingDistribution(data.doctors_id),
        ]);
        setAverage(avgData.average);
        setCount(avgData.count);
        setDistribution(distData);
      } catch (err) {
        console.error(err);
        setDoctor(null);
      } finally {
        stopLoading();
      }
    };
    load();
  }, [doctorId, stopLoading]);

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
    bio: doctor.doctor_profile?.doctor_bio,
    consultationFee: doctor.consultation_fee || 0,
    profile: {
      clinicName: doctor.doctor_locations?.hospital_name,
      address: doctor.doctor_locations?.address,
      city: doctor.doctor_locations?.city,
      mapLink: doctor.doctor_locations?.google_maps_link,
      availableDays:
        doctor.doctor_availability?.map((a) => numberToDay[a.day_of_week]) ||
        "",
      startTime: doctor.doctor_availability?.[0]?.start_time,
      endTime: doctor.doctor_availability?.[0]?.end_time,
    },
  };

  return (
    <div className="bg-[#F0F4F8] min-h-screen py-8">
      <div className=" sm:p-7 my-3 mx-4 lg:mx-12">
        <BackButton to="/patient/dashboard" />
      </div>

      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-5">
          <DoctorHero doctor={uiDoctor} average={average} count={count} />
          <DoctorStats
            doctor={uiDoctor}
            average={average}
            count={count}
            distribution={distribution}
          />
          <DoctorReviews doctor={uiDoctor} />
          <DoctorAvailability doctor={uiDoctor} />
          <DoctorLocation doctor={uiDoctor} />
        </div>
        <div className="lg:col-span-1">
          <BookAppointmentCard doctor={uiDoctor} />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePublic;
