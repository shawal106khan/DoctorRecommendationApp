import { supabase } from "../lib/supabase";
import { dayToNumber } from "../utils/dayMap";

export async function fetchSpecializations() {
  const { data, error } = await supabase
    .from("specializations")
    .select("specialization_id, name")
    .order("name");
  if (error) throw error;
  return data || [];
}

export async function insertDoctorDetails({
  userId,
  fullName,
  phone,
  specializationId,
  license,
  experience,

  qualification,
}) {
  const { error } = await supabase.from("doctors").insert({
    user_id: userId,
    name: fullName || "",
    phone_number: phone,
    specialization_id: specializationId,
    license_number: license,
    experience_years: Number(experience) || 0,

    qualifications: qualification,
  });

  if (error) throw error;
}

export async function getCurrentUserId() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("User not found");
  return data.user.id;
}

export async function getDoctorIdByUser(userId) {
  const { data, error } = await supabase
    .from("doctors")
    .select("doctors_id")
    .eq("user_id", userId)
    .single();
  if (error || !data) throw new Error("Doctor profile not found");
  return data.doctors_id;
}

export async function uploadDoctorProfileImage(userId, file) {
  // const safeName = file.name.replace(/\s+/g, "_");
  // const filePath = `${userId}/${safeName}`;
  const fileExt = file.name.split(".").pop() || "jpg";
  const filePath = `${userId}/profile.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("doctor-profiles-public")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("doctor-profiles-public")
    .getPublicUrl(filePath);

  return urlData?.publicUrl || null;
}

export async function upsertDoctorProfile(doctorsId, payload) {
  const { error } = await supabase.from("doctor_profile").upsert(
    {
      doctors_id: doctorsId,
      profile_pic_url: payload.profile_pic_url,
      updated_at: new Date().toISOString(),
      doctor_bio: payload.bio || null,
      gender: payload.gender || null,
      language: payload.language || null,
    },
    { onConflict: "doctors_id" },
  );

  if (error) throw error;
}

export async function markProfileCompleted(doctorsId) {
  const { error } = await supabase
    .from("doctors")
    .update({ profile_completed: true })
    .eq("doctors_id", doctorsId);

  if (error) throw error;
}

export async function fetchDoctorVerificationStatus(doctorsId) {
  const { data: verification } = await supabase
    .from("doctor-license-verifications")
    .select("verified, verification_status")
    .eq("doctors_id", doctorsId)
    .order("uploaded_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (verification?.verification_status === "rejected") return "rejected";
  if (
    verification?.verified === true ||
    verification?.verification_status === "approved"
  ) {
    return "approved";
  }
  return "pending";
}

export async function fetchDoctorProfileBasic(doctorsId) {
  const { data, error } = await supabase
    .from("doctor_profile")
    .select("doctor_bio, language")
    .eq("doctors_id", doctorsId)
    .maybeSingle();
  if (error) throw error;
  return data || { doctor_bio: null, language: null };
}

export async function fetchDoctorAvailability(doctorsId) {
  const { data, error } = await supabase
    .from("doctor_availability")
    .select("day_of_week, start_time, end_time, slot_duration_minutes")
    .eq("doctors_id", doctorsId)
    .order("day_of_week");
  if (error) throw error;
  return data || [];
}

export async function fetchDoctorLocation(doctorsId) {
  const { data, error } = await supabase
    .from("doctor_locations")
    .select("hospital_name, address, city, landmark, google_maps_link")
    .eq("doctors_id", doctorsId)
    .maybeSingle();
  if (error) throw error;
  return data || null;
}

export async function fetchDoctorProfessionalInfo(userId) {
  const { data: doctor, error } = await supabase
    .from("doctors")
    .select(
      "specialization_id, experience_years, license_number, qualifications,  phone_number",
    )
    .eq("user_id", userId)
    .single();

  if (error || !doctor) throw new Error("Doctor not found");

  let specializationName = "Not provided";
  if (doctor.specialization_id) {
    const { data: spec } = await supabase
      .from("specializations")
      .select("name")
      .eq("specialization_id", doctor.specialization_id)
      .single();

    if (spec?.name) specializationName = spec.name;
  }

  return {
    specializationName,
    experience_years: doctor.experience_years,
    license_number: doctor.license_number,
    qualifications: doctor.qualifications,

    phone_number: doctor.phone_number,
  };
}

export async function upsertDoctorAvailability(doctorsId, profile) {
  // Convert UI days to DB rows
  const dayMap = dayToNumber;

  // Remove old rows first (clean overwrite)
  await supabase
    .from("doctor_availability")
    .delete()
    .eq("doctors_id", doctorsId);

  if (!profile.availableDays?.length) {
    return;
  }

  const rows = profile.availableDays.map((day) => ({
    doctors_id: doctorsId,
    day_of_week: dayMap[day],
    start_time: profile.startTime,
    end_time: profile.endTime,
    slot_duration_minutes: Number(profile.slotDuration),
    updated_at: new Date().toISOString(),
  }));

  // Insert new rows
  const { error } = await supabase.from("doctor_availability").insert(rows);

  if (error) throw error;
}

export async function upsertDoctorLocation(doctorsId, profile) {
  const { error } = await supabase.from("doctor_locations").upsert(
    {
      doctors_id: doctorsId,
      hospital_name: profile.hospitalName || profile.clinicName,
      address: profile.address,
      city: profile.city,
      landmark: profile.landmark,
      google_maps_link: profile.mapLink || null,
      updated_at: new Date().toISOString(),
    },
    { onConflict: "doctors_id" },
  );

  if (error) throw error;
}
export async function fetchDoctorsTopbarInfo(doctorsId) {
  const { data: profile, error } = await supabase
    .from("doctor_profile")
    .select("profile_pic_url")
    .eq("doctors_id", doctorsId)
    .maybeSingle();
  if (error) throw error;
  return {
    avatarUrl: profile?.profile_pic_url || null,
  };
}

export async function updateDoctorProfileFromEdit(doctorsId, userId, form) {
  const { data: existingProfile } = await supabase
    .from("doctor_profile")
    .select("profile_pic_url, gender, language, doctor_bio")
    .eq("doctors_id", doctorsId)
    .maybeSingle();
  const { data: existingLocation } = await supabase
    .from("doctor_locations")
    .select("hospital_name, address, city, landmark, google_maps_link")
    .eq("doctors_id", doctorsId)
    .maybeSingle();

  let profilePicUrl = null;

  if (form.avatarFile) {
    profilePicUrl = await uploadDoctorProfileImage(userId, form.avatarFile);
  }

  await upsertDoctorProfile(doctorsId, {
    profile_pic_url: profilePicUrl || existingProfile?.profile_pic_url || null,
    bio: form.bio ?? existingProfile?.doctor_bio ?? null,
    gender: form.gender ?? existingProfile?.gender ?? null,
    language: form.language ?? existingProfile?.language ?? null,
  });

  await upsertDoctorAvailability(doctorsId, {
    availableDays: form.availableDays || [],
    startTime: form.startTime,
    endTime: form.endTime,
    slotDuration: form.slotDuration,
  });

  await upsertDoctorLocation(doctorsId, {
    clinicName: form.clinicName ?? existingLocation?.hospital_name ?? undefined,
    address: form.address ?? existingLocation?.address ?? undefined,
    city: form.city ?? existingLocation?.city ?? undefined,
    landmark: form.landmark ?? existingLocation?.landmark ?? "",
    mapLink: form.mapLink ?? existingLocation?.google_maps_link ?? null,
  });

  return {
    profilePicUrl,
  };
}

export function buildDoctorHeaderUser({ user, professionalInfo, avatarUrl }) {
  return {
    name: user?.name || "Doctor",
    avatar: avatarUrl || user?.avatar || null,
    specialization: professionalInfo?.specializationName || "Specialization",
  };
}
