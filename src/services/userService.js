// src/services/userService.js
import { supabase } from "../lib/supabase";

export async function getPatientByUserId(userId) {
  const { data, error } = await supabase
    .from("patients")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}

export async function insertPatient(userId, fullName) {
  const { data, error } = await supabase.from("patients").insert({
    user_id: userId,
    full_name: fullName,
  });

  if (error) throw error;
  return data;
}
export async function getDoctorByUserId(userId) {
  const { data, error } = await supabase
    .from("doctors")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  if (error) throw error;
  return data || null;
}
