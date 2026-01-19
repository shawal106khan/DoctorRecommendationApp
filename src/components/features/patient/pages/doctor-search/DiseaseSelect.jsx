import Select from "../../../../common/components/Select";
import { diseaseOptions } from "../../../../../config/diseaseOptions";

const DiseaseSelect = ({ value, onChange }) => {
  return (
    <div className="flex-1 mb-0">
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
