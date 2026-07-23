import DropdownSelect from "../../../../components/common/components/DropdownSelect";
import useDiseaseOptions from "../../../../hooks/useDiseaseOptions";

const DiseaseSelect = ({ value, onChange }) => {
  const { options } = useDiseaseOptions();

  return (
    <div className="flex-1">
      <DropdownSelect
        name="disease"
        value={value ?? ""}
        onChange={onChange}
        placeholder="Select Disease"
        options={options}
      />
    </div>
  );
};

export default DiseaseSelect;
