import { useNavigate } from "react-router-dom";
import { CalendarCheck, Clock, ShieldCheck } from "lucide-react";
import { useAuth } from "../../../../context/useAuth";

const BookAppointmentCard = ({ doctor }) => {
  const navigate = useNavigate();
  // const location = useLocation();
  const { user } = useAuth();

  const handleBooking = () => {
    if (!user) {
      // ✅ redirect to login, after login come back to doctor profile
      navigate(`/login?redirect=/doctors/${doctor.id}`);
      return;
    }
    // ✅ already logged in → go to booking
    navigate(`/patient/appointments/book/${doctor.id}`);
  };

  return (
    <div className="bg-white rounded-2xl border border-[#D6E6F2] shadow-[0_4px_20px_rgba(26,111,168,0.08)] overflow-hidden sticky top-6">
      <div className="bg-gradient-to-br from-[#1A6FA8] to-[#336aac] px-6 py-5 relative overflow-hidden">
        <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full bg-white opacity-5" />
        <div className="w-10 h-10 rounded-2xl bg-white/20 border border-white/25 flex items-center justify-center mb-3">
          <CalendarCheck size={18} className="text-white" />
        </div>
        <h3 className="text-white font-bold text-lg leading-tight">
          Book Appointment
        </h3>
        <p className="text-white/60 text-xs mt-1">Get confirmed instantly</p>
      </div>

      <div className="p-6">
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2.5 text-xs text-[#6B839A]">
            <div className="w-6 h-6 rounded-lg bg-[#E8F4FD] flex items-center justify-center flex-shrink-0">
              <Clock size={12} className="text-[#1A6FA8]" />
            </div>
            Instant booking confirmation
          </div>
          <div className="flex items-center gap-2.5 text-xs text-[#6B839A]">
            <div className="w-6 h-6 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
              <ShieldCheck size={12} className="text-green-500" />
            </div>
            Verified & trusted doctor
          </div>
        </div>

        <button
          onClick={handleBooking}
          className="w-full h-12 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-bold rounded-xl flex items-center justify-center gap-2 shadow-[0_4px_16px_rgba(26,111,168,0.35)] hover:shadow-[0_6px_24px_rgba(26,111,168,0.45)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
        >
          <CalendarCheck size={16} />
          {user ? "Book Appointment" : "Login to Book"}
        </button>
      </div>
    </div>
  );
};

export default BookAppointmentCard;
