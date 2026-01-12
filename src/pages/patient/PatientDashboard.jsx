// import { useState } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DoctorCard from "../../components/cards/DoctorCard";
// import { doctors } from "../../data/mockDoctors";
import DashboardHome from "./DashboardHome";

const PatientDashboard = () => {
  return (
    <DashboardLayout role="patient">
      <DashboardHome />

      {/* Doctors List */}
      <h3 className="text-lg font-semibold mb-4">Recommended Doctors</h3>
    </DashboardLayout>
  );
};

export default PatientDashboard;
