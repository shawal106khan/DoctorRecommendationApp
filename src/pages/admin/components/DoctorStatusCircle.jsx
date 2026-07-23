import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "../../../utils/statusColors";

const DoctorStatusCircle = ({ data = [], total = 0 }) => {
  if (!data.length) return null; // 🛡 prevents crash everywhere

  return (
    <div className="bg-white rounded-sm shadow-md shadow-gray-200 p-6 flex items-center justify-center pb-20 mb-2 font-serif">
      <div className="w-48 h-48 relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={90}
              paddingAngle={3}
              dataKey="value"
            >
              {data.map((entry, i) => {
                let color = "#3B82F6";

                if (entry.name === "Active") {
                  color = "#22C55E"; // green
                } else if (entry.name === "Suspended") {
                  color = "#F59E0B"; // orange
                } else if (entry.name === "Deleted") {
                  color = "#EF4444"; // red
                }

                return <Cell key={i} fill={color} />;
              })}
            </Pie>
          </PieChart>
        </ResponsiveContainer>

        {/* center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-2xl font-bold text-blue-800">{total}</p>
          <p className="text-xs text-blue-500">Total Doctors</p>
        </div>
      </div>
    </div>
  );
};

export default DoctorStatusCircle;
