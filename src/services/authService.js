// src/services/authService.js
// import { data } from "react-router-dom";
import { supabase } from "../lib/supabase";

export async function loginWithEmail(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) throw error;
  return data;
}

export async function signupWithEmail(email, password, fullName) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } },
  });
  if (error) throw error;
  return data;
}

export async function getCurrentUser() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("User not found");
  return data.user.id;
}

export async function getCurrentUserProfile() {
  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) throw new Error("User not found");
  return data.user;
}

export async function sendResetLink(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/reset-password`,
  });
  if (error) throw error;
}

export async function resetPassword(newPassword) {
  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  if (error) throw error;
}
