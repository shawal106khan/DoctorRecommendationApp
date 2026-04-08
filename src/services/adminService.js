import { supabase } from "../lib/supabase";
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
        "doctors_id,user_id,name,phone_number,specialization_id,experience_years,license_number,qualifications",
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
    };
  });
}
