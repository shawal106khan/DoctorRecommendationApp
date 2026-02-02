const StatCard = ({ label, value }) => {
  return (
    <div className="bg-gradient-to-r from-slate-300 to-blue-200 rounded-xl shadow px-4 py-6 text-center">
      <p className="text-lg text-black">{label}</p>
      <p className="text-3xl font-semibold text-black mt-1">{value}</p>
    </div>
  );
};

export default StatCard;
