import { supabase } from "../lib/supabase";
// import { addMinutesToTime } from "../utils/calculateArrivalTime";

export async function createAppointment(payload) {
  const { data, error } = await supabase
    .from("appointments")
    .insert(payload)
    .select("appointment_id")
    .single();

  if (error) throw error;
  return data;
}

export async function addAppointmentTimeline(appointmentId, status, note) {
  const { error } = await supabase.from("appointment_timeline").insert({
    appointment_id: appointmentId,
    state: status,
    note,
    status_at: new Date().toISOString(),
  });

  if (error) throw error;
}

export async function fetchAppointmentsForPatient(patientsId) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      appointment_id,
      doctors_id,
      patients_id,
       patient_name,
       patient_gender,
      patient_age,
      patient_address,
      reason_for_visit,
      queue_number,
      appointment_date,
      arrival_time,
      status,
      created_at,
      slot_start_time,
      slot_end_time,
     fee_paid,
      doctors (
        name,
        phone_number,
        experience_years,
         consultation_fee,
        specializations (name),
        doctor_locations (hospital_name, city, address),
        doctor_profile (profile_pic_url, doctor_bio)
      ),
      appointment_timeline (state, status_at, note),
      
      reviews (reviews_id, rating, comment, created_at)
    `,
    )
    .eq("patients_id", patientsId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function fetchAppointmentTimeline(appointmentId) {
  const { data, error } = await supabase
    .from("appointment_timeline")
    .select("appointment_timeline_id, appointment_id, state, status_at, note")
    .eq("appointment_id", appointmentId)
    .order("status_at", { ascending: true });

  if (error) throw error;
  return data || [];
}

export async function fetchAppointmentsForDoctor(doctorsId) {
  const { data, error } = await supabase
    .from("appointments")
    .select(
      `
      appointment_id,
      doctors_id,
      patients_id,
       patient_name,
       patient_gender,
      patient_age,
      patient_address,
      reason_for_visit,
      queue_number,
      appointment_date,
      arrival_time,
      status,
      created_at,
     slot_start_time,
     slot_end_time,
      fee_paid,
      appointment_timeline (
        state,
        status_at,
        note
      )
    `,
    )
    .eq("doctors_id", doctorsId)
    .order("created_at", { ascending: false });

  if (error) throw error;
  return data || [];
}

export async function updateAppointmentStatusByDoctor(
  appointmentId,
  status,
  extra = {},
) {
  const { data: currentAppointment, error: currentError } = await supabase
    .from("appointments")
    .select("appointment_id, doctors_id")
    .eq("appointment_id", appointmentId)
    .single();

  if (currentError) throw currentError;

  const payload = {
    status,
    ...extra,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from("appointments")
    .update(payload)
    .eq("appointment_id", appointmentId)
    .select()
    .single();

  if (error) throw error;

  await addAppointmentTimeline(
    appointmentId,
    status,
    extra.note || `Appointment ${status}`,
  );

  if (status === "approved" || status === "completed") {
    await recalculateDoctorQueue(currentAppointment.doctors_id);
  }

  return data;
}

// export async function recalculateDoctorQueue(doctorsId) {
//   const { data, error } = await supabase
//     .from("appointments")
//     .select("appointment_id, created_at, status")
//     .eq("doctors_id", doctorsId)
//     .in("status", ["approved", "completed"])
//     .order("created_at", { ascending: true });

//   if (error) throw error;

//   const appointments = data || [];

//   const { data: availabilityData, error: availError } = await supabase
//     .from("doctor_availability")
//     .select("start_time, slot_duration_minutes")
//     .eq("doctors_id", doctorsId)
//     .single();

//   if (availError) throw availError;

//   const startTime = availabilityData.start_time;
//   const slotDuration = availabilityData.slot_duration_minutes;

//   for (let i = 0; i < appointments.length; i += 1) {
//     const queueNumber = i + 1;

//     const minutesOffset = (queueNumber - 1) * slotDuration;
//     const arrivalTime = addMinutesToTime(startTime, minutesOffset);
//     const { error: updateError } = await supabase
//       .from("appointments")
//       .update({
//         queue_number: queueNumber,
//         arrival_time: arrivalTime,
//       })
//       .eq("appointment_id", appointments[i].appointment_id);

//     if (updateError) throw updateError;
//   }
// }
// export async function recalculateDoctorQueue(doctorsId) {
//   const { data, error } = await supabase
//     .from("appointments")
//     .select("appointment_id, created_at, status")
//     .eq("doctors_id", doctorsId)
//     .in("status", ["approved", "completed"])
//     .order("created_at", { ascending: true });

//   if (error) throw error;

//   const appointments = data || [];

//   // Fetch doctor's availability (optional)
//   let startTime = null;
//   let slotDuration = null;

//   const { data: availabilityData, error: availError } = await supabase
//     .from("doctor_availability")
//     .select("start_time, slot_duration_minutes")
//     .eq("doctors_id", doctorsId)
//     .limit(1); // Use limit(1) instead of .single()

//   if (!availError && availabilityData && availabilityData.length > 0) {
//     startTime = availabilityData[0].start_time;
//     slotDuration = availabilityData[0].slot_duration_minutes;
//   } else {
//     console.log("No availability data for doctor, skipping arrival time");
//   }

//   for (let i = 0; i < appointments.length; i += 1) {
//     const queueNumber = i + 1;
//     let arrivalTime = null;

//     if (startTime && slotDuration) {
//       const minutesOffset = (queueNumber - 1) * slotDuration;
//       arrivalTime = addMinutesToTime(startTime, minutesOffset);
//     }

//     const updatePayload = { queue_number: queueNumber };
//     if (arrivalTime) {
//       updatePayload.arrival_time = arrivalTime;
//     }

//     const { error: updateError } = await supabase
//       .from("appointments")
//       .update(updatePayload)
//       .eq("appointment_id", appointments[i].appointment_id);

//     if (updateError) throw updateError;
//   }
// }

export async function recalculateDoctorQueue(doctorsId) {
  // Fetch all approved/completed appointments with their dates
  const { data: appointments, error } = await supabase
    .from("appointments")
    .select("appointment_id, appointment_date, status, slot_start_time")
    .eq("doctors_id", doctorsId)
    .in("status", ["approved", "completed"])
    .order("appointment_date", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;

  if (!appointments || appointments.length === 0) return;

  // Fetch doctor's availability schedule (all days)
  const { data: availabilityData, error: availError } = await supabase
    .from("doctor_availability")
    .select("day_of_week, start_time, slot_duration_minutes")
    .eq("doctors_id", doctorsId);

  if (availError) {
    console.log("No availability data for doctor");
    return;
  }

  // Group appointments by appointment_date
  const appointmentsByDate = {};
  appointments.forEach((appt) => {
    const date = appt.appointment_date;
    if (!appointmentsByDate[date]) {
      appointmentsByDate[date] = [];
    }
    appointmentsByDate[date].push(appt);
  });

  // Process each day's appointments separately
  for (const [appointmentDate, dayAppointments] of Object.entries(
    appointmentsByDate,
  )) {
    // Get day of week (0=Sunday, 1=Monday, etc.)
    const dateObj = new Date(appointmentDate);
    const dayOfWeek = dateObj.getDay();

    // Find doctor's availability for this day
    const dayAvailability = availabilityData.find(
      (a) => a.day_of_week === dayOfWeek,
    );

    if (!dayAvailability) {
      console.log(`No availability for day ${dayOfWeek} on ${appointmentDate}`);
      continue;
    }

    // const startTime = dayAvailability.start_time;
    // const slotDuration = dayAvailability.slot_duration_minutes;

    // Assign queue numbers starting from 1 for this day
    // Assign queue numbers starting from 1 for this day
    for (let i = 0; i < dayAppointments.length; i += 1) {
      const queueNumber = i + 1;

      const arrivalTime = dayAppointments[i].slot_start_time;

      const { error: updateError } = await supabase
        .from("appointments")
        .update({
          queue_number: queueNumber,
          arrival_time: arrivalTime,
        })
        .eq("appointment_id", dayAppointments[i].appointment_id);

      if (updateError) throw updateError;
    }
  }
}
export const getBookedSlots = async (doctorId, selectedDate) => {
  const { data, error } = await supabase
    .from("appointments")
    .select("slot_start_time")
    .eq("doctors_id", doctorId)
    .eq("appointment_date", selectedDate)
    .in("status", ["pending", "approved"]);

  if (error) {
    throw error;
  }

  return data;
};
