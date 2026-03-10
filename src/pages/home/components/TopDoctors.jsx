import { useMemo } from "react";
import { getDoctors } from "../../../store/doctorStore";
import DoctorCard from "../../patient/components/DoctorCard";

const TopDoctors = () => {
  const doctors = useMemo(() => {
    const allDoctors = getDoctors();

    return allDoctors
      .filter(
        (doc) => doc.status === "approved" && doc.profileCompleted === true,
      )
      .sort((a, b) => (b.rating || 0) - (a.rating || 0))
      .slice(0, 6);
  }, []);

  return (
    <section className="bg-gray-50 py-20 font-serif">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Top Rated Doctors
        </h2>

        <div className="grid md:grid-cols-3 gap-6">
          {doctors.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopDoctors;
