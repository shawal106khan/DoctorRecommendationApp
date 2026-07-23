import { useState } from "react";
import { saveReview } from "../../../services/reviewService";
import { getUserData, getPatientByUserId } from "../../../services/userService";

const ReviewForm = ({ appointment, onDone }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!rating) return alert("Please select a rating");
    const { userId } = await getUserData();
    const patient = await getPatientByUserId(userId);
    await saveReview(
      appointment.appointment_id,
      appointment.doctors_id,
      patient.patients_id,
      rating,
      comment,
    );
    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Star Rating */}
      <div>
        <p className="text-[11.5px] font-bold text-[#4A6680] uppercase tracking-wide mb-3">
          Your Rating
        </p>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`w-11 h-11 rounded-xl border-[1.5px] flex items-center justify-center text-xl transition-all ${
                (hover || rating) >= star
                  ? "bg-yellow-50 border-yellow-300 text-yellow-400 scale-110 shadow-sm"
                  : "bg-[#F7FAFE] border-[#D6E6F2] text-[#D6E6F2]"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        {rating > 0 && (
          <p className="text-xs text-[#1A6FA8] font-semibold mt-2">
            {["", "Poor", "Fair", "Good", "Very Good", "Excellent"][rating]} —{" "}
            {rating}/5
          </p>
        )}
      </div>

      {/* Comment */}
      <div>
        <label className="block text-[11.5px] font-bold text-[#4A6680] uppercase tracking-wide mb-1.5">
          Your Feedback
        </label>
        <textarea
          placeholder="Share your experience with this doctor..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={3}
          className="w-full px-4 py-3 rounded-xl text-sm text-[#0D2E4E] bg-[#F7FAFE] border-[1.5px] border-[#D6E6F2] outline-none transition placeholder:text-[#AAC2D4] focus:bg-white focus:border-[#1A6FA8] focus:ring-4 focus:ring-[#1A6FA8]/10 resize-none"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full h-12 bg-gradient-to-r from-[#1A6FA8] to-[#336aac] text-white text-sm font-semibold rounded-xl shadow-[0_4px_12px_rgba(26,111,168,0.30)] hover:shadow-[0_6px_20px_rgba(26,111,168,0.40)] hover:scale-[1.02] active:scale-[0.98] transition-all"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
