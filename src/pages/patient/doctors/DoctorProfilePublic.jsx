import { useParams } from "react-router-dom";
import { getDoctors } from "../../../store/doctorStore";

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
const DoctorProfilePublic = () => {
  const { doctorId } = useParams();
  const doctor = getDoctors().find((d) => String(d.id) === String(doctorId));

  const { average, count } = getDoctorAverageRating(doctor.id);
  const distribution = getDoctorRatingDistribution(doctor.id);
  if (!doctor) return <p className="text-center mt-10">Doctor not found</p>;

  return (
    <div className="bg-gray-50 min-h-screen py-8 font-serif">
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-6">
        {/* Left content */}
        <div className="lg:col-span-2 space-y-6">
          <DoctorHero doctor={doctor} average={average} count={count} />
          <DoctorStats
            doctor={doctor}
            average={average}
            count={count}
            distribution={distribution}
          />
          <DoctorReviews doctor={doctor} />
          <DoctorAvailability doctor={doctor} />
          <DoctorLocation doctor={doctor} />
        </div>

        {/* Right sticky card */}
        <div className="lg:col-span-1">
          <BookAppointmentCard doctor={doctor} />
        </div>
      </div>
    </div>
  );
};

export default DoctorProfilePublic;
