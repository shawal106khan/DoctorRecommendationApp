export function getRecommendationCategory({ rating, experienceYears }) {
  if (rating >= 4.5 && experienceYears >= 10) {
    return "Best Match";
  }

  if (rating >= 4.5) {
    return "Highly Recommended";
  }

  if (experienceYears >= 5) {
    return "Experienced Specialist";
  }

  return "Recommended";
}
