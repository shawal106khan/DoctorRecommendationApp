// import { supabase } from "../lib/supabase";

// export async function updateAdminPassword(newPassword) {
//   const { error } = await supabase.auth.updateUser({
//     password: newPassword,
//   });

//   if (error) throw error;
// }
// export async function uploadAdminAvatar(userId, file) {
//   const fileExt = file.name.split(".").pop();

//   const filePath = `admins/${userId}/avatar.${fileExt}`;

//   const { error: uploadError } = await supabase.storage
//     .from("admin_profile_pic")
//     .upload(filePath, file, {
//       upsert: true,
//     });

//   if (uploadError) throw uploadError;

//   const { data } = supabase.storage
//     .from("admin_profile_pic")
//     .getPublicUrl(filePath);

//   return data.publicUrl;
// }

import { supabase } from "../lib/supabase";

/* ================= PROFILE ================= */

export async function getAdminProfile() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not found");
  }

  const { data, error } = await supabase
    .from("admin")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) throw error;

  return data;
}

export async function updateAdminProfile(profile) {
  const { data, error } = await supabase
    .from("admin")
    .update({
      full_name: profile.full_name,
      phone_number: profile.phone_number,
      profile_picture: profile.profile_picture,
    })
    .eq("user_id", profile.user_id)
    .select()
    .single();

  if (error) throw error;

  return data;
}

/* ================= PASSWORD ================= */

export async function updateAdminPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) throw error;
}

/* ================= AVATAR ================= */

export async function uploadAdminAvatar(userId, file) {
  const fileExt = file.name.split(".").pop();

  const filePath = `admins/${userId}/avatar.${fileExt}`;

  const { error: uploadError } = await supabase.storage
    .from("admin_profile_pic")
    .upload(filePath, file, {
      upsert: true,
    });

  if (uploadError) throw uploadError;

  const { data } = supabase.storage
    .from("admin_profile_pic")
    .getPublicUrl(filePath);

  return data.publicUrl;
}

/* ================= SETTINGS ================= */

export async function getAdminSettings() {
  const { data, error } = await supabase
    .from("admin_settings")
    .select("*")
    .order("updated_at", {
      ascending: false,
    })
    .limit(1)
    .maybeSingle();

  if (error) throw error;

  return (
    data || {
      support_email: "",
      support_phone: "",
    }
  );
}

export async function updateAdminSettings(settings) {
  const { data, error } = await supabase
    .from("admin_settings")
    .update({
      support_email: settings.support_email,
      support_phone: settings.support_phone,
      updated_at: new Date().toISOString(),
    })
    .eq("id", settings.id)
    .select()
    .single();

  if (error) throw error;

  return data;
}
