import { supabase } from "../lib/supabase";

export const getQuestionsBySpecialization = async (specializationId) => {
  const { data, error } = await supabase
    .from("health_assistant_questions")
    .select("*")
    .eq("specialization_id", specializationId);

  if (error) throw error;

  return data || [];
};

export const addQuestion = async (payload) => {
  const { error } = await supabase
    .from("health_assistant_questions")
    .insert([payload]);

  if (error) throw error;
};

export const updateQuestion = async (id, payload) => {
  const { error } = await supabase
    .from("health_assistant_questions")
    .update(payload)
    .eq("id", id);

  if (error) throw error;
};

export const deleteQuestion = async (id) => {
  const { error } = await supabase
    .from("health_assistant_questions")
    .delete()
    .eq("id", id);

  if (error) throw error;
};
