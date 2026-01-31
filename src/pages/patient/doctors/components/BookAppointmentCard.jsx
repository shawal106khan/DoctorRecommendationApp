import { useNavigate } from "react-router-dom";
const BookAppointmentCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="bg-white rounded-xl shadow p-6 sticky top-6">
      <h3 className="text-lg font-semibold mb-3">Get Confirmed Appointment</h3>

      <button
        onClick={() => navigate(`/patient/appointments/book/${doctor.id}`)}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
      >
        Book Appointment
      </button>
    </div>
  );
};

export default BookAppointmentCard;
