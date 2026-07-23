import Input from "../../../../../components/common/components/Input";
import { StepHeader } from "../../../../../components/common/components/StepComponents";
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
    <div className="max-w-lg mx-auto px-2 py-4">
      <StepHeader
        title="Availability"
        subtitle="Select the days and times you are available for consultations"
      />

      {/* Day selector */}
      <div className="mb-5">
        <label className="block text-[11.5px] font-semibold text-[#4A6680] uppercase tracking-wide mb-2">
          Select Available Days
        </label>
        {errors.availableDays && (
          <p className="text-red-500 text-xs mb-2">{errors.availableDays}</p>
        )}
        <div className="flex flex-wrap gap-2">
          {days.map((day) => {
            const selected = profile.availableDays.includes(day);
            return (
              <button
                key={day}
                onClick={() => {
                  toggleDay(day);
                  if (errors.availableDays)
                    setErrors((prev) => ({ ...prev, availableDays: null }));
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold border-[1.5px] transition-all ${
                  selected
                    ? "bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white border-[#1A6FA8] shadow-[0_2px_8px_rgba(26,111,168,0.30)]"
                    : "bg-[#F7FAFE] text-[#4A6680] border-[#D6E6F2] hover:border-[#1A6FA8]/40"
                }`}
              >
                {day}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time inputs */}
      <div className="grid grid-cols-2 gap-4 mb-1">
        <Input
          type="time"
          label="Start Time"
          error={errors.startTime}
          value={profile.startTime}
          onChange={(e) => {
            setProfile({ ...profile, startTime: e.target.value });
            if (errors.startTime)
              setErrors((prev) => ({ ...prev, startTime: null }));
          }}
        />
        <Input
          type="time"
          label="End Time"
          error={errors.endTime}
          value={profile.endTime}
          onChange={(e) => {
            setProfile({ ...profile, endTime: e.target.value });
            if (errors.endTime)
              setErrors((prev) => ({ ...prev, endTime: null }));
          }}
        />
      </div>

      <Input
        label="Slot Duration (minutes)"
        error={errors.slotDuration}
        type="number"
        value={profile.slotDuration}
        placeholder="15"
        onChange={(e) => {
          setProfile({ ...profile, slotDuration: e.target.value });
          if (errors.slotDuration)
            setErrors((prev) => ({ ...prev, slotDuration: null }));
        }}
      />

      <div className="mt-8 flex items-center justify-between">
        <button
          onClick={onBack}
          className="text-sm font-semibold text-[#4A6680] hover:text-[#1A6FA8] transition"
        >
          ← Back
        </button>
        <button
          onClick={handleNext}
          className="px-6 py-2.5 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:scale-[1.02] active:scale-[0.98] transition-all"
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default AvailabilityStep;
