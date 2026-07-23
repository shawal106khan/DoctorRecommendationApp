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

export async function insertPatient(userId, fullName, email) {
  const { data, error } = await supabase.from("patients").insert({
    user_id: userId,
    full_name: fullName,
    email: email,
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

export async function getUserData() {
  const { data: authData } = await supabase.auth.getUser();
  if (!authData?.user) throw new Error("User not authenticated");

  const userId = authData.user.id;
  return { userId };
}

export async function updatePatientProfile(patientsId, fullName, avatarUrl) {
  const { error } = await supabase
    .from("patients")
    .update({
      full_name: fullName,
      profile_picture: avatarUrl,
    })
    .eq("patients_id", patientsId);

  if (error) throw error;
}

export async function uploadPatientAvatar(userId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `patients/${userId}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("patient_profile") // ✅ updated bucket name
    .upload(filePath, file, { upsert: true });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("patient_profile") // ✅ updated bucket name
    .getPublicUrl(filePath);

  return data.publicUrl;
}
