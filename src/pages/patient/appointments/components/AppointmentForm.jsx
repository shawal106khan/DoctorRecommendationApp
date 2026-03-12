import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "../../../../components/common/components/Button";
import Input from "../../../../components/common/components/Input";
import { saveAppointment } from "../../../../store/appointmentStore";
import { useAuth } from "../../../../context/useAuth";

const AppointmentForm = ({ doctor }) => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [note, setNote] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = () => {
    if (!name) {
      alert("Fill required fields");
      return;
    }

    const appointment = {
      id: Date.now(),
      doctorId: doctor.email,
      patientName: name,
      patientEmail: user.email,
      age,
      location,
      note,

      status: "pending",

      queueNumber: 0,
      arrivalTime: null,
      timeline: [
        {
          state: "requested",
          at: new Date().toISOString(),
        },
      ],

      createdAt: new Date().toISOString(),
    };

    saveAppointment(appointment);

    // ✅ Clear form

    setNote("");
    setName("");
    setAge("");
    setLocation("");

    // ✅ Show success CTA
    setSuccess(true);
  };

  if (success) {
    return (
      <div className="bg-white p-6 rounded-xl shadow text-center space-y-4">
        <h3 className="text-lg font-semibold text-green-600">
          Appointment Requested 🎉
        </h3>
        <p className="text-sm text-gray-600">
          Your appointment is pending confirmation.
        </p>

        <Button
          text="View My Appointments"
          className="w-full"
          onClick={() => navigate("/patient/appointments")}
        />
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow space-y-4">
      <h3 className="text-lg font-semibold text-blue-700">
        Appointment Details
      </h3>

      <Input
        label="Patient Name"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        label="Patient Age"
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <Input
        label="Location"
        placeholder="City or Address"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Reason for visit (optional)"
        value={note}
        onChange={(e) => setNote(e.target.value)}
        className="w-full border rounded-lg px-4 py-2"
        rows={3}
      />

      <Button
        text="Confirm Appointment"
        className="w-full mt-4"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default AppointmentForm;
