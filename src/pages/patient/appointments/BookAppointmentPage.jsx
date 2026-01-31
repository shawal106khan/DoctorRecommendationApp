import { useParams } from "react-router-dom";
import AppointmentDoctorCard from "./components/AppointmentDoctorCard";
import AppointmentForm from "./components/AppointmentForm";
import { getDoctorById } from "../../../store/doctorStore";
const BookAppointmentPage = () => {
  const { doctorId } = useParams();
  const doctor = getDoctorById(doctorId);

  if (!doctor) {
    return <p className="text-center mt-10 text-gray-500">Doctor not found</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="md:col-span-2 space-y-6">
          <AppointmentDoctorCard doctor={doctor} />
          <AppointmentForm doctor={doctor} />
        </div>

        {/* RIGHT */}
      </div>
    </div>
  );
};

export default BookAppointmentPage;
