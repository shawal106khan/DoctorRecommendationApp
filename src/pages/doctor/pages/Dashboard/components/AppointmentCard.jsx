const AppointmentCard = ({ appointment }) => {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex justify-between">
      <div>
        <h4 className="font-medium">{appointment.patientName}</h4>
        <p className="text-sm text-gray-500">{appointment.time}</p>
        <p className="text-xs text-gray-400 capitalize">{appointment.type}</p>
      </div>

      <span className="text-sm font-medium text-blue-600">
        {appointment.status}
      </span>
    </div>
  );
};

export default AppointmentCard;
