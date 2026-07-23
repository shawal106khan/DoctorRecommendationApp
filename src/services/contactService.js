import { supabase } from "../lib/supabase";

export async function submitComplaint(complaint) {
  const { data, error } = await supabase
    .from("complaints")
    .insert([
      {
        full_name: complaint.full_name,

        email: complaint.email,

        subject: complaint.subject,

        message: complaint.message,
        status: "pending",
      },
    ])
    .select()
    .single();

  if (error) throw error;

  return data;
}
export async function getComplaints() {
  const { data, error } = await supabase
    .from("complaints")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  if (error) throw error;

  return data;
}

export async function updateComplaintStatus(complaintId, status) {
  const { data, error } = await supabase
    .from("complaints")
    .update({ status })
    .eq("complaint_id", complaintId)
    .select()
    .single();

  if (error) throw error;

  return data;
}

export async function deleteComplaint(complaintId) {
  const { error } = await supabase
    .from("complaints")
    .delete()
    .eq("complaint_id", complaintId);

  if (error) throw error;
}
