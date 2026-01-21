import Button from "../../../../../components/common/components/Button";
import Input from "../../../../../components/common/components/Input";
import Title from "../../../../../components/common/components/Title";

import { useRequiredValidation } from "../../../../../hooks/useRequiredValidation";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const AvailabilityStep = ({ profile, setProfile, onNext, onBack }) => {
  const { errors, validate, setErrors } = useRequiredValidation({
    availableDays: "At least one day must be selected",
    startTime: "Start time is required",
    endTime: "End time is required",
    slotDuration: "Slot duration is required",
  });

  const handleNext = () => {
    const isValid = validate({
      availableDays: profile.availableDays.length > 0,
      startTime: profile.startTime,
      endTime: profile.endTime,
      slotDuration: profile.slotDuration,
    });

    if (!isValid) return;
    onNext();
  };

  const toggleDay = (day) => {
    const updated = profile.availableDays.includes(day)
      ? profile.availableDays.filter((d) => d !== day)
      : [...profile.availableDays, day];

    setProfile({ ...profile, availableDays: updated });
  };

  return (
    <div className="max-w-md  mx-auto p-6">
      <Title
        heading="Availability"
        subheading="Select the days and times you are available for consultations"
      />{" "}
      <p className="text-xs text-gray-600 font-body m-1">
        Select Available Days
      </p>
      {errors.availableDays && (
        <span className="text-red-500 text-xs mb-2">
          {errors.availableDays}
        </span>
      )}
      <div className="flex flex-wrap  mb-4">
        {days.map((day) => (
          <button
            key={day}
            className={`px-3 py-1 rounded border shadow-sm shadow-gray-300 text-xs font-body text-gray-700 m-1 ${
              profile.availableDays.includes(day)
                ? "bg-blue-600 text-white"
                : "bg-white"
            }`}
            onClick={() => {
              toggleDay(day);
              if (errors.availableDays) {
                setErrors((prev) => ({ ...prev, availableDays: null }));
              }
            }}
          >
            {day}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input
          type="time"
          label="Start Time"
          error={errors.startTime}
          value={profile.startTime}
          onChange={(e) => {
            setProfile({ ...profile, startTime: e.target.value });
            if (errors.startTime) {
              setErrors((prev) => ({ ...prev, startTime: null }));
            }
          }}
        />
        <Input
          type="time"
          label="End Time"
          error={errors.endTime}
          value={profile.endTime}
          onChange={(e) => {
            setProfile({ ...profile, endTime: e.target.value });
            if (errors.endTime) {
              setErrors((prev) => ({ ...prev, endTime: null }));
            }
          }}
        />
      </div>
      <Input
        label="Slot Duration (minutes)"
        error={errors.slotDuration}
        type="number"
        value={profile.slotDuration}
        onChange={(e) => {
          setProfile({ ...profile, slotDuration: e.target.value });
          if (errors.slotDuration) {
            setErrors((prev) => ({ ...prev, slotDuration: null }));
          }
        }}
      />
      <div className="mt-8 flex justify-between text-sm">
        <span
          onClick={onBack}
          className="cursor-pointer text-gray-600 hover:text-blue-600"
        >
          ← Back
        </span>

        <span
          onClick={handleNext}
          className="cursor-pointer bg-blue-600 
          py-2 px-5  border border-gray-400 
          rounded-lg text-white font-medium hover:underline"
        >
          Next →
        </span>
      </div>
    </div>
  );
};

export default AvailabilityStep;
