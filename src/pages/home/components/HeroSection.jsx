import { useNavigate } from "react-router-dom";
import HeroImg from "../../../assets/find-doctor.jpg";
const HeroSection = () => {
  const navigate = useNavigate();

  const handleFindDoctor = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    // Not logged in → go to login
    if (!user) {
      navigate("/login");
      return;
    }

    // If patient → go to search doctors
    if (user.role === "patient") {
      navigate("/login");
      return;
    }
  };

  const handleJoinDoctor = () => {
    navigate("/signup");
  };

  return (
    <section
      className="relative  bg-no-repeat bg-center text-white py-24 px-6"
      style={{ backgroundImage: `url(${HeroImg})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      {/* Content */}
      <div className="relative max-w-6xl mx-auto text-center">
        <h1 className="text-2xl md:text-4xl font-bold leading-tight font-mono">
          Find Verified Doctors & Book Appointments Instantly
        </h1>

        <p className="mt-6 text-base text-blue-100 max-w-2xl mx-auto font-serif">
          Search approved doctors, view complete profiles, check ratings, and
          book secure appointments securely.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handleFindDoctor}
            className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Login & find a Doctor
          </button>

          <button
            onClick={handleJoinDoctor}
            className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition"
          >
            Join as Doctor
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
