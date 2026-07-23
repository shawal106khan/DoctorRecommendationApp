export function calculateRecommendation(doctors) {
  return doctors
    .map((doctor) => {
      let score = 0;
      let category = "Recommended";

      // Rule 1
      if (doctor.experience_years >= 15) {
        score += 40;
      } else if (doctor.experience_years >= 10) {
        score += 30;
      } else if (doctor.experience_years >= 5) {
        score += 20;
      }

      // Rule 2
      if (doctor.avg_rating >= 4.8) {
        score += 35;
      } else if (doctor.avg_rating >= 4.5) {
        score += 25;
      } else if (doctor.avg_rating >= 4) {
        score += 15;
      }

      // Rule 3
      if (doctor.review_count >= 20) {
        score += 15;
      } else if (doctor.review_count >= 10) {
        score += 10;
      } else if (doctor.review_count >= 5) {
        score += 5;
      }

      // Rule 4 - Consultation Fee
      const fee = Number(doctor.consultation_fee || 0);

      if (fee > 0 && fee <= 500) {
        score += 10;
      } else if (fee <= 1000) {
        score += 8;
      } else if (fee <= 1500) {
        score += 6;
      } else if (fee <= 2000) {
        score += 4;
      } else {
        score += 2;
      }

      // Rule 5 - Verification
      if (
        doctor.verification_status === "approved" ||
        doctor.verification_status === undefined
      ) {
        score += 10;
      }

      console.log(
        doctor.name,
        "rating:",
        doctor.avg_rating,
        "reviews:",
        doctor.review_count,
        "verification:",
        doctor.verification_status,
        "score:",
        score,
      );
      if (score >= 85) {
        category = "Best Match";
      } else if (score >= 55) {
        category = "Highly Recommended";
      } else {
        category = "Recommended";
      }

      return {
        ...doctor,
        recommendationScore: score,
        recommendationCategory: category,
      };
    })
    .sort((a, b) => b.recommendationScore - a.recommendationScore);
}
