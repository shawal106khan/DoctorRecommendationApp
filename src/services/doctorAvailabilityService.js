import { supabase } from "../lib/supabase";
export const getDoctorAvailabilityByDay = async (doctorId, dayName) => {
  const { data, error } = await supabase
    .from("doctor_availability")
    .select("*")
    .eq("doctors_id", doctorId)
    .eq("day_of_week", dayName)
    .single();

  if (error) {
    throw error;
  }

  return data;
};
