import { supabase } from "../lib/supabase";

export async function getAssistantQuestions(specializationId) {
  const { data, error } = await supabase
    .from("health_assistant_questions")
    .select("*")
    .eq("specialization_id", specializationId);

  if (error) throw error;

  console.log("Assistant Data:", data);

  return data || [];
}
