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
  const filePath = `${userId}/profile-${Date.now()}.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("doctor-profiles-public")
    .upload(filePath, file, { cacheControl: "3600", upsert: true });

  if (uploadError) throw uploadError;

  const { data: urlData } = supabase.storage
    .from("doctor-profiles-public")
    .getPublicUrl(filePath);

  return `${urlData?.publicUrl}?t=${Date.now()}`;
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
      "specialization_id, experience_years, license_number, qualifications,  phone_number, consultation_fee",
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
    consultation_fee: doctor.consultation_fee,
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
  const { error: doctorError } = await supabase
    .from("doctors")
    .update({
      experience_years: Number(form.experienceYears) || 0,

      qualifications: form.qualification || "",
    })
    .eq("doctors_id", doctorsId);

  if (doctorError) throw doctorError;

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

export async function fetchRecommendedDoctors(specializationId) {
  const { data, error } = await supabase.rpc("get_recommended_doctors", {
    p_specialization_id: specializationId,
  });

  if (error) throw error;
  return data || [];
}

export async function fetchDoctorPublicProfile(doctorsId) {
  const { data, error } = await supabase
    .from("doctors")
    .select(
      `
      doctors_id,
      name,
      phone_number,
      experience_years,
      specialization_id,
      qualifications,
       consultation_fee,
      doctor_profile (profile_pic_url, doctor_bio, language, gender),
      doctor_locations (hospital_name, address, city, landmark, google_maps_link),
      doctor_availability (day_of_week, start_time, end_time, slot_duration_minutes),
      specializations (name)
    `,
    )
    .eq("doctors_id", doctorsId)
    .eq("account_status", "active")
    .maybeSingle();

  if (error) throw error;
  return data;
}

// export async function fetchTopRatedDoctors() {
//   const { data, error } = await supabase
//     .from("reviews")
//     .select("doctors_id, rating")
//     .then(({ data, error }) => {
//       if (error) throw error;
//       return { data, error };
//     });

//   if (error) throw error;

//   // Calculate average rating per doctor
//   const ratingMap = {};
//   data.forEach((r) => {
//     if (!ratingMap[r.doctors_id]) {
//       ratingMap[r.doctors_id] = { total: 0, count: 0 };
//     }
//     ratingMap[r.doctors_id].total += r.rating;
//     ratingMap[r.doctors_id].count += 1;
//   });

//   // Get top 6 doctor IDs sorted by average
//   const topDoctorIds = Object.entries(ratingMap)
//     .map(([id, val]) => ({ id, avg: val.total / val.count }))
//     .sort((a, b) => b.avg - a.avg)
//     .slice(0, 6)
//     .map((d) => d.id);

//   if (topDoctorIds.length === 0) return [];

//   const { data: doctors, error: docError } = await supabase
//     .from("doctors")
//     .select(
//       `
//       doctors_id,
//       name,
//       experience_years,
//       specializations (name),
//       doctor_profile (profile_pic_url, doctor_bio)
//     `,
//     )
//     .in("doctors_id", topDoctorIds);

//   if (docError) throw docError;

//   return doctors.map((doc) => ({
//     doctors_id: doc.doctors_id,
//     name: doc.name,
//     experience_years: doc.experience_years,
//     specialization_name: doc.specializations?.name || "",
//     profile_pic_url: doc.doctor_profile?.profile_pic_url || null,
//     doctor_bio: doc.doctor_profile?.doctor_bio || "",
//     avg_rating:
//       ratingMap[doc.doctors_id].total / ratingMap[doc.doctors_id].count,
//   }));
// }
export async function fetchTopRatedDoctors() {
  const { data: reviews, error: reviewError } = await supabase
    .from("reviews")
    .select("doctors_id, rating");

  if (reviewError) throw reviewError;
  if (!reviews || reviews.length === 0) return [];

  // Calculate average rating per doctor
  const ratingMap = {};
  reviews.forEach((r) => {
    if (!ratingMap[r.doctors_id]) {
      ratingMap[r.doctors_id] = { total: 0, count: 0 };
    }
    ratingMap[r.doctors_id].total += r.rating;
    ratingMap[r.doctors_id].count += 1;
  });

  const topDoctorIds = Object.entries(ratingMap)
    .map(([id, val]) => ({ id, avg: val.total / val.count }))
    .sort((a, b) => b.avg - a.avg)
    .slice(0, 6)
    .map((d) => d.id);

  if (topDoctorIds.length === 0) return [];

  const { data: doctors, error: docError } = await supabase
    .from("doctors")
    .select(
      `
  doctors_id,
  name,
  experience_years,
  consultation_fee,
    specializations (name),
  doctor_profile (profile_pic_url, doctor_bio)
`,
    )
    .eq("account_status", "active")
    .in("doctors_id", topDoctorIds);

  if (docError) throw docError;

  return (doctors || []).map((doc) => ({
    doctors_id: doc.doctors_id,
    name: doc.name,
    experience_years: doc.experience_years,
    consultation_fee: doc.consultation_fee,
    verification_status: "approved",

    specialization_name: doc.specializations?.name || "",
    profile_pic_url: doc.doctor_profile?.profile_pic_url || null,
    doctor_bio: doc.doctor_profile?.doctor_bio || "",

    avg_rating:
      ratingMap[doc.doctors_id].total / ratingMap[doc.doctors_id].count,

    review_count: ratingMap[doc.doctors_id].count,
  }));
}

export async function saveDoctorFee(doctorsId, consultationFee) {
  const { error } = await supabase
    .from("doctors")
    .update({
      consultation_fee: Number(consultationFee) || 0,
    })
    .eq("doctors_id", doctorsId);

  if (error) throw error;
}

export async function fetchRecommendedDoctorsAI(specializationId) {
  const { data, error } = await supabase.rpc("get_recommended_doctors_ai", {
    p_specialization_id: specializationId,
  });

  if (error) throw error;

  return data || [];
}
