import Select from "../../../../components/common/components/Select";
import { diseaseOptions } from "../../../../config/diseaseOptions";

const DiseaseSelect = ({ value, onChange }) => {
  return (
    <div className="flex-1 mb-0 mt-2">
      <Select
        name="disease"
        value={value}
        onChange={onChange}
        placeholder="Select Disease"
        options={diseaseOptions}
      />
    </div>
  );
};

export default DiseaseSelect;
