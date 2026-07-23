import DropdownSelect from "../../../components/common/components/DropdownSelect";
import useSpecializationOptions from "../../../hooks/useSpecializationOptions";

const SpecializationSelect = ({ value, onChange }) => {
  const { options } = useSpecializationOptions();

  return (
    <div className="flex-1">
      <DropdownSelect
        name="specialization"
        value={value ?? ""}
        onChange={onChange}
        placeholder="Select Specialization"
        options={options}
      />
    </div>
  );
};

export default SpecializationSelect;
