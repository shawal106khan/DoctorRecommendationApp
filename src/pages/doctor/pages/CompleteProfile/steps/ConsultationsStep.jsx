import Button from "../../../../../components/common/components/Button";
import Input from "../../../../../components/common/components/Input";

const ConsultationStep = ({ profile, setProfile, onNext, onBack }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Consultation Details</h2>

      <Input
        label="Consultation Fee (PKR)"
        type="number"
        value={profile.consultationFee}
        onChange={(e) =>
          setProfile({ ...profile, consultationFee: e.target.value })
        }
      />

      <div className="mt-4">
        <label className="block text-sm font-medium mb-1">
          Consultation Type
        </label>
        <select
          className="w-full border rounded px-3 py-2"
          value={profile.consultationType}
          onChange={(e) =>
            setProfile({ ...profile, consultationType: e.target.value })
          }
        >
          <option value="online">Online</option>
          <option value="clinic">Clinic</option>
          <option value="both">Both</option>
        </select>
      </div>

      <div className="mt-6 flex justify-between">
        <Button text="Back" variant="outline" onClick={onBack} />
        <Button text="Next" onClick={onNext} />
      </div>
    </div>
  );
};

export default ConsultationStep;
