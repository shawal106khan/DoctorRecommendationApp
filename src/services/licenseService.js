// src/services/licenseService.js
import { supabase } from "../lib/supabase";

export async function uploadDoctorLicense(userId, file) {
  const fileExt = file.name.split(".").pop();
  const filePath = `${userId}/license-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("doctor-licenses")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) throw uploadError;

  return filePath;
}

export async function upsertDoctorLicense(doctorsId, filePath) {
  const { error } = await supabase.from("doctor-license-verifications").upsert({
    doctors_id: doctorsId,
    license_file_url: filePath,
    verification_status: "pending",
    verified: false,
    uploaded_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function getDoctorIdByUserId(userId) {
  const { data, error } = await supabase
    .from("doctors")
    .select("doctors_id")
    .eq("user_id", userId)
    .single();

  if (error || !data) throw new Error("Doctor profile not found.");
  return data.doctors_id;
}

export async function createLicenseSignedUrl(filePath, expiresInSeconds = 3600) {
  const { data, error } = await supabase.storage
    .from("doctor-licenses")
    .createSignedUrl(filePath, expiresInSeconds);

  if (error) throw error;
  return data?.signedUrl || null;
}
