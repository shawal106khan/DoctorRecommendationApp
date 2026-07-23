import { fetchDoctorReviews } from "../services/reviewService";

/**
 * Get all reviews for a doctor from DB
 * ASYNC — call with await
 */
export const getDoctorReviews = async (doctorId) => {
  try {
    const reviews = await fetchDoctorReviews(doctorId);
    return reviews || [];
  } catch (error) {
    console.error("Error fetching doctor reviews:", error);
    return [];
  }
};

/**
 * Get average rating + count
 * ASYNC — call with await
 */
export const getDoctorAverageRating = async (doctorId) => {
  const reviews = await getDoctorReviews(doctorId);

  if (reviews.length === 0) {
    return { average: 0, count: 0 };
  }

  const total = reviews.reduce((sum, r) => sum + r.rating, 0);

  return {
    average: (total / reviews.length).toFixed(1),
    count: reviews.length,
  };
};

/**
 * ⭐ NEW — Rating distribution (5★ → 1★)
 * Used for progress bars UI
 * ASYNC — call with await
 */
export const getDoctorRatingDistribution = async (doctorId) => {
  const reviews = await getDoctorReviews(doctorId);

  const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((r) => {
    const rating = r.rating;
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
 * ASYNC — call with await
 */
export const getDoctorRatingCounts = async (doctorId) => {
  const reviews = await getDoctorReviews(doctorId);

  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

  reviews.forEach((r) => {
    const rating = r.rating;
    if (counts[rating] !== undefined) {
      counts[rating]++;
    }
  });

  return counts;
};
