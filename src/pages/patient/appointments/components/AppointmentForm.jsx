import { useState } from "react";
import Button from "../../../../components/common/components/Button";
import Input from "../../../../components/common/components/Input";
const AppointmentForm = ({ doctor }) => {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const handleSubmit = () => {
    const appointment = {
      id: Date.now(),
      doctorId: doctor.id,
      date,
      time,
      note,
      status: "pending",
    };

    console.log("APPOINTMENT CREATED:", appointment);

    alert("Appointment request sent!");
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold text-blue-700">
        Appointment Details
      </h3>
      <Input
        label="Patient Name"
        placeholder="Enter your name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <Input
        label="Patient Age"
        placeholder="Enter your age"
        type="number"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <Input
        label="location"
        placeholder="Enter your location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Input
        label="Select Date"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <Input
        label="Select Time"
        type="time"
        value={time}
        onChange={(e) => setTime(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
      />

      <textarea
        placeholder="Reason for visit (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
        rows={3}
      />

      <Button
        onClick={handleSubmit}
        className="w-full mt-4"
        text="Confirm Appointment"
      />
    </div>
  );
};

export default AppointmentForm;
