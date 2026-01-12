import Button from "../common/components/Button";

const DoctorCard = ({ doctor, onBook }) => {
  return (
    <div className="bg-white p-5 rounded shadow">
      <h3 className="font-semibold">{doctor.name}</h3>
      <p className="text-sm text-gray-500">{doctor.specialization}</p>
      <p className="text-sm">{doctor.hospital}</p>

      <div className="mt-4">
        <Button text="Book Appointment" onClick={() => onBook(doctor)} />
      </div>
    </div>
  );
};

export default DoctorCard;
