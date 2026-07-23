import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "../../../../../utils/statusColors";

const AppointmentCircle = ({ data, total }) => {
  return (
    <div className="w-44 h-44 relative">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            innerRadius={58}
            outerRadius={78}
            dataKey="value"
            strokeWidth={0}
          >
            {data.map((entry, i) => (
              <Cell
                key={`cell-${i}`}
                fill={
                  entry.label === "Pending Requests"
                    ? STATUS_COLORS["pending"]
                    : entry.label === "Accepted"
                      ? STATUS_COLORS["accepted"]
                      : entry.label === "Completed"
                        ? STATUS_COLORS["completed"]
                        : STATUS_COLORS["default"]
                }
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-3xl font-bold text-[#0D2E4E]">{total}</p>
        <p className="text-[10px] text-[#6B839A] font-semibold uppercase tracking-wide">
          Appointments
        </p>
      </div>
    </div>
  );
};

export default AppointmentCircle;
