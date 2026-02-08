import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { STATUS_COLORS } from "../../../../../utils/statusColors";

const AppointmentCircle = ({ data, total }) => {
  return (
    <div className="bg-blue-50 rounded-xl shadow  py-12 flex justify-center items-center ">
      <div className="w-40 h-40 relative">
        <ResponsiveContainer>
          <PieChart>
            <Pie data={data} innerRadius={55} outerRadius={75} dataKey="value">
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

        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-xl font-semibold text-blue-600">{total}</p>
          <p className="text-xs  text-blue-600">Appointments</p>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCircle;
