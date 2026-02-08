import { getAppointments } from "../store/appointmentStore";

/**
 * Get all reviews for a doctor
 */
export const getDoctorReviews = (doctorId) => {
  return getAppointments().filter(
    (a) => a.doctorId === doctorId && a.review?.rating,
  );
};

/**
 * Get average rating + count
 */
export const getDoctorAverageRating = (doctorId) => {
  const reviews = getDoctorReviews(doctorId);

  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = reviews.reduce((sum, a) => sum + a.review.rating, 0);

  return {
    average: (total / reviews.length).toFixed(1),
    count: reviews.length,
  };
};

/**
 * ⭐ NEW — Rating distribution (5★ → 1★)
 * Used for progress bars UI
 */
export const getDoctorRatingDistribution = (doctorId) => {
  const reviews = getDoctorReviews(doctorId);

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((a) => {
    const rating = a.review.rating;
    if (distribution[rating] !== undefined) {
      distribution[rating]++;
    }
  });

  const total = reviews.length;

  return Object.entries(distribution)
    .map(([star, count]) => ({
      star: Number(star),
      count,
      percent: total ? Math.round((count / total) * 100) : 0,
    }))
    .reverse(); // show 5 → 1
};

/**
 * ⭐ NEW — Rating counts object (for patient UI progress bars)
 * Returns: {5: number, 4: number, 3: number, 2: number, 1: number}
 */
export const getDoctorRatingCounts = (doctorId) => {
  const reviews = getDoctorReviews(doctorId);

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((a) => {
    const rating = a.review.rating;
    if (counts[rating] !== undefined) {
      counts[rating]++;
    }
  });

  return counts;
};
