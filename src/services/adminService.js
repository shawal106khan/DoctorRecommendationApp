import { supabase } from "../lib/supabase";

export async function suspendDoctor(doctorsId, reason) {
  const { data, error } = await supabase
    .from("doctors")
    .update({
      account_status: "suspended",
      suspension_reason: reason,
    })
    .eq("doctors_id", doctorsId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}
export async function activateDoctor(doctorsId) {
  const { data, error } = await supabase
    .from("doctors")
    .update({
      account_status: "active",
      suspension_reason: null,
    })
    .eq("doctors_id", doctorsId)
    .select();

  console.log("Activate result:", data);

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function softDeleteDoctor(doctorsId) {
  const { data, error } = await supabase
    .from("doctors")
    .update({
      account_status: "deleted",
    })
    .eq("doctors_id", doctorsId)
    .select();

  if (error) {
    console.error(error);
    throw error;
  }

  return data;
}

export async function approveDoctor(doctorsId) {
  const { error } = await supabase
    .from("doctor-license-verifications")
    .update({
      verification_status: "approved",
      verified: true,
      verified_at: new Date().toISOString(),
    })
    .eq("doctors_id", doctorsId);

  if (error) throw error;
}
export async function rejectDoctor(doctorsId) {
  const { error } = await supabase
    .from("doctor-license-verifications")
    .update({
      verification_status: "rejected",
      verified: false,
      verified_at: null,
    })
    .eq("doctors_id", doctorsId);

  if (error) throw error;
}

export async function getAdminByUserId(userId) {
  const { data, error } = await supabase
    .from("admin")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

export async function fetchDoctorsForAdmin() {
  const [
    { data: doctorsData, error: doctorsError },
    { data: verifications },
    { data: specializations },
  ] = await Promise.all([
    supabase
      .from("doctors")
      .select(
        "doctors_id,user_id,name,email,phone_number,specialization_id,experience_years,license_number,qualifications,account_status",
      ),
    supabase
      .from("doctor-license-verifications")
      .select(
        "doctors_id, license_file_url, verified, verification_status, uploaded_at",
      )
      .order("uploaded_at", { ascending: false }),
    supabase.from("specializations").select("specialization_id, name"),
  ]);

  if (doctorsError) throw doctorsError;

  const specMap = new Map(
    (specializations || []).map((s) => [s.specialization_id, s.name]),
  );

  const latestVerification = new Map();
  (verifications || []).forEach((v) => {
    if (!latestVerification.has(v.doctors_id)) {
      latestVerification.set(v.doctors_id, v);
    }
  });

  return (doctorsData || []).map((doc) => {
    const v = latestVerification.get(doc.doctors_id);

    const status =
      v?.verification_status === "approved" || v?.verified === true
        ? "approved"
        : v?.verification_status === "rejected"
          ? "rejected"
          : "pending";

    return {
      ...doc,
      specialization: specMap.get(doc.specialization_id) || "Unknown",
      status,
      licenseFileURL: v?.license_file_url || "",
      licenseFileName: v?.license_file_url
        ? v.license_file_url.split("/").pop()
        : "",
      account_status: doc.account_status || "active",
    };
  });
}

export async function getAdminStats() {
  // TOTAL DOCTORS
  const { data: totalDoctorsData } = await supabase
    .from("doctors")
    .select("doctors_id");

  // ACTIVE
  const { data: activeDoctorsData } = await supabase
    .from("doctors")
    .select("doctors_id")
    .eq("account_status", "active");

  // SUSPENDED
  const { data: suspendedDoctorsData } = await supabase
    .from("doctors")
    .select("doctors_id")
    .eq("account_status", "suspended");

  // DELETED
  const { data: deletedDoctorsData } = await supabase
    .from("doctors")
    .select("doctors_id")
    .eq("account_status", "deleted");

  // PATIENTS
  const { data: patientsData } = await supabase
    .from("patients")
    .select("patients_id");
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1,
  ).toISOString();
  // APPOINTMENTS
  const { data: appointmentsData } = await supabase
    .from("appointments")
    .select("appointment_id, doctors_id, fee_paid")
    .gte("created_at", startOfMonth);

  // COMPLETED
  const { data: completedAppointmentsData } = await supabase
    .from("appointments")
    .select("appointment_id")
    .eq("status", "completed");

  // PENDING
  const { data: pendingAppointmentsData } = await supabase
    .from("appointments")
    .select("appointment_id")
    .eq("status", "pending");

  // MONTH START
  // const startOfMonth = new Date(
  //   new Date().getFullYear(),
  //   new Date().getMonth(),
  //   1,
  // ).toISOString();

  // MONTHLY APPOINTMENTS
  const { data: monthlyAppointmentsData } = await supabase
    .from("appointments")
    .select("appointment_id")
    .gte("created_at", startOfMonth);

  // MONTHLY FEES
  const { data: monthlyFeesData } = await supabase
    .from("appointments")
    .select("fee_paid")
    .gte("created_at", startOfMonth);

  const totalFeeCollected =
    monthlyFeesData?.reduce(
      (sum, item) => sum + Number(item.fee_paid || 0),
      0,
    ) || 0;

  // REVIEWS
  const { data: reviewsData } = await supabase.from("reviews").select(`
      rating,
      doctors_id
    `);

  // DOCTORS
  const { data: doctorsData } = await supabase
    .from("doctors")
    .select("doctors_id, name");

  // VERIFICATIONS
  const { data: verificationData } = await supabase
    .from("doctor-license-verifications")
    .select("doctors_id, verification_status, uploaded_at")
    .order("uploaded_at", { ascending: false });

  // LATEST VERIFICATION MAP
  const latestVerificationMap = new Map();

  (verificationData || []).forEach((v) => {
    if (!latestVerificationMap.has(v.doctors_id)) {
      latestVerificationMap.set(v.doctors_id, v);
    }
  });

  const latestVerifications = Array.from(latestVerificationMap.values());

  const approvedDoctorsData = latestVerifications.filter(
    (v) => v.verification_status === "approved",
  );

  const pendingDoctorsData = latestVerifications.filter(
    (v) => v.verification_status === "pending",
  );

  const rejectedDoctorsData = latestVerifications.filter(
    (v) => v.verification_status === "rejected",
  );

  // DOCTOR MAP
  const doctorMap = {};

  (doctorsData || []).forEach((doc) => {
    doctorMap[doc.doctors_id] = doc.name;
  });

  // TOP RATED DOCTORS
  const doctorRatingsMap = {};

  (reviewsData || []).forEach((review) => {
    const doctorId = review.doctors_id;

    if (!doctorRatingsMap[doctorId]) {
      doctorRatingsMap[doctorId] = {
        doctorName: doctorMap[doctorId] || "Unknown",
        total: 0,
        count: 0,
      };
    }

    doctorRatingsMap[doctorId].total += review.rating;

    doctorRatingsMap[doctorId].count += 1;
  });

  const topRatedDoctors = Object.values(doctorRatingsMap)
    .map((doc) => ({
      doctorName: doc.doctorName,
      averageRating: (doc.total / doc.count).toFixed(1),
    }))
    .sort((a, b) => Number(b.averageRating) - Number(a.averageRating))
    .slice(0, 5);

  // MOST BOOKED DOCTORS
  const bookingMap = {};

  (appointmentsData || []).forEach((appt) => {
    const doctorId = appt.doctors_id;

    if (!bookingMap[doctorId]) {
      bookingMap[doctorId] = {
        doctorName: doctorMap[doctorId] || "Unknown",
        count: 0,
      };
    }

    bookingMap[doctorId].count += 1;
  });

  const mostBookedDoctors = Object.values(bookingMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
  // FEES PER DOCTOR
  const doctorFeeMap = {};

  (appointmentsData || []).forEach((appt) => {
    const doctorId = appt.doctors_id;

    if (!doctorFeeMap[doctorId]) {
      doctorFeeMap[doctorId] = {
        doctorName: doctorMap[doctorId] || "Unknown",
        totalFee: 0,
      };
    }

    doctorFeeMap[doctorId].totalFee += Number(appt.fee_paid || 0);
  });

  const doctorFeeStats = Object.values(doctorFeeMap).sort(
    (a, b) => b.totalFee - a.totalFee,
  );
  return {
    totalDoctors: totalDoctorsData?.length || 0,

    activeDoctors: activeDoctorsData?.length || 0,

    suspendedDoctors: suspendedDoctorsData?.length || 0,

    deletedDoctors: deletedDoctorsData?.length || 0,

    approvedDoctors: approvedDoctorsData?.length || 0,

    pendingDoctors: pendingDoctorsData?.length || 0,

    rejectedDoctors: rejectedDoctorsData?.length || 0,

    patients: patientsData?.length || 0,

    appointments: appointmentsData?.length || 0,

    completedAppointments: completedAppointmentsData?.length || 0,

    pendingAppointments: pendingAppointmentsData?.length || 0,

    monthlyAppointments: monthlyAppointmentsData?.length || 0,

    totalFeeCollected,

    topRatedDoctors,

    mostBookedDoctors,
    doctorFeeStats,

    doctorStatusData: [
      {
        name: "Active",
        value: activeDoctorsData?.length || 0,
      },
      {
        name: "Suspended",
        value: suspendedDoctorsData?.length || 0,
      },
      {
        name: "Deleted",
        value: deletedDoctorsData?.length || 0,
      },
    ],
  };
}

export async function fetchPatientsForAdmin() {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

export async function suspendPatient(patientsId, reason) {
  const { error } = await supabase
    .from("patients")
    .update({
      account_status: "suspended",
      suspension_reason: reason,
    })
    .eq("patients_id", patientsId);

  if (error) throw error;
}

export async function activatePatient(patientsId) {
  const { error } = await supabase
    .from("patients")
    .update({
      account_status: "active",
      suspension_reason: null,
    })
    .eq("patients_id", patientsId);

  if (error) throw error;
}

export async function softDeletePatient(patientsId) {
  const { error } = await supabase
    .from("patients")
    .update({
      account_status: "deleted",
    })
    .eq("patients_id", patientsId);

  if (error) throw error;
}

export async function fetchAppointmentsForAdmin() {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
  appointment_id,
  patient_name,
  appointment_date,
  slot_start_time,
  status,
  reason_for_visit,
  doctors:doctors_id (
    name
  )
`,
    )
    .order("created_at", { ascending: false });

  if (error) throw error;

  return data || [];
}

// ================= DISEASES =================
export async function fetchSpecializationsForAdmin() {
  const { data, error } = await supabase
    .from("specializations")
    .select("*")
    .order("name");

  if (error) throw error;

  return data || [];
}

export async function fetchDiseasesForAdmin() {
  const { data, error } = await supabase
    .from("diseases")
    .select(
      `
      diseases_id,
      disease_name,
      specialization_id,
      specializations (
        name
      )
    `,
    )
    .order("disease_name");

  if (error) throw error;

  return data || [];
}

export async function addDisease(diseaseName, specializationId) {
  const { error } = await supabase.from("diseases").insert({
    disease_name: diseaseName,
    specialization_id: specializationId,
  });

  if (error) throw error;
}

export async function addSpecialization(name) {
  const { error } = await supabase.from("specializations").insert({
    name,
  });

  if (error) throw error;
}
export async function updateDisease(diseaseId, diseaseName, specializationId) {
  const { error } = await supabase
    .from("diseases")
    .update({
      disease_name: diseaseName,
      specialization_id: specializationId,
    })
    .eq("diseases_id", diseaseId);

  if (error) throw error;
}

export async function deleteDisease(diseaseId) {
  const { error } = await supabase
    .from("diseases")
    .delete()
    .eq("diseases_id", diseaseId);

  if (error) throw error;
}

export async function updateSpecialization(specializationId, name) {
  const { error } = await supabase
    .from("specializations")
    .update({
      name,
    })
    .eq("specialization_id", specializationId);

  if (error) throw error;
}

export async function deleteSpecialization(specializationId) {
  const { error } = await supabase
    .from("specializations")
    .delete()
    .eq("specialization_id", specializationId);

  if (error) throw error;
}

// ================= HEALTH ASSISTANT =================

export async function fetchAssistantQuestions() {
  const { data, error } = await supabase
    .from("health_assistant_questions")
    .select(
      `
      *,
      specializations (
        name
      )
    `,
    )
    .order("question");

  if (error) throw error;

  return data || [];
}

export async function addAssistantQuestion(payload) {
  const { error } = await supabase
    .from("health_assistant_questions")
    .insert(payload);

  if (error) throw error;
}

export async function updateAssistantQuestion(id, payload) {
  const { error } = await supabase
    .from("health_assistant_questions")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
}

export async function deleteAssistantQuestion(id) {
  const { error } = await supabase
    .from("health_assistant_questions")
    .delete()
    .eq("id", id);

  if (error) throw error;
}

export async function generateAdminMonthlyReport(month, year) {
  const startDate = new Date(year, month, 1).toISOString().split("T")[0];

  const endDate = new Date(year, month + 1, 0).toISOString().split("T")[0];

  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      appointment_id,
      appointment_date,
      status,
      fee_paid,
      doctors:doctors_id (
        doctors_id,
        name
      )
    `,
    )
    .gte("appointment_date", startDate)
    .lte("appointment_date", endDate);

  if (error) throw error;

  const doctorMap = {};

  (data || []).forEach((appt) => {
    const doctorId = appt.doctors?.doctors_id;

    if (!doctorId) return;

    if (!doctorMap[doctorId]) {
      doctorMap[doctorId] = {
        doctorName: appt.doctors.name,
        totalAppointments: 0,
        completed: 0,
        totalFee: 0,
        dailyFees: {},
      };
    }

    doctorMap[doctorId].totalAppointments += 1;

    if (appt.status === "completed") {
      const fee = Number(appt.fee_paid || 0);
      const date = appt.appointment_date;

      doctorMap[doctorId].completed += 1;
      doctorMap[doctorId].totalFee += fee;

      if (!doctorMap[doctorId].dailyFees[date]) {
        doctorMap[doctorId].dailyFees[date] = {
          appointments: 0,
          totalFee: 0,
        };
      }

      doctorMap[doctorId].dailyFees[date].appointments += 1;
      doctorMap[doctorId].dailyFees[date].totalFee += fee;
    }
  });

  return Object.values(doctorMap)
    .map((doctor) => ({
      ...doctor,
      dailyFees: Object.entries(doctor.dailyFees).map(([date, value]) => ({
        date,
        appointments: value.appointments,
        totalFee: value.totalFee,
      })),
    }))
    .sort((a, b) => b.totalFee - a.totalFee);
}
