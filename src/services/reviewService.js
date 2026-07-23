import { supabase } from "../lib/supabase";

export async function saveReview(
  appointmentId,
  doctorId,
  patientId,
  rating,
  comment,
) {
  const { error } = await supabase.from("reviews").insert({
    appointment_id: appointmentId,
    doctors_id: doctorId,
    patients_id: patientId,
    rating,
    comment,
    created_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function fetchDoctorReviews(doctorId) {
  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("doctors_id", doctorId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error(error);
    throw error;
  }

  // Fetch patient name for each review
  const reviewsWithNames = await Promise.all(
    (data || []).map(async (review) => {
      const { data: patientData } = await supabase
        .from("patients")
        .select("full_name")
        .eq("patients_id", review.patients_id)
        .single();

      return {
        ...review,
        patients: patientData || null,
      };
    }),
  );

  return reviewsWithNames;
}
