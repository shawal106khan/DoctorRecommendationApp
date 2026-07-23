import { supabase } from "../lib/supabase";

export async function fetchDiseases() {
  const { data, error } = await supabase
    .from("diseases")
    .select("diseases_id, disease_name, specialization_id")
    .order("disease_name");
  if (error) throw error;

  return data || [];
}

export async function getSpecializationIdByDisease(diseasesId) {
  const { data, error } = await supabase
    .from("diseases")
    .select("specialization_id")
    .eq("diseases_id", diseasesId)
    .single();

  if (error) throw error;
  return data?.specialization_id || null;
}
