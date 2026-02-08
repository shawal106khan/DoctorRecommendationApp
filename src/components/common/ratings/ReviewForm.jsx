import { useState } from "react";
import { addAppointmentReview } from "../../../store/appointmentStore";

const ReviewForm = ({ appointment, onDone }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!rating) return alert("Please select a rating");

    addAppointmentReview(appointment.id, {
      rating,
      comment,
    });

    onDone();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 font-serif">
      {/* ⭐ Star Rating */}
      <div>
        <p className="text-xl font-medium text-yellow-700 mb-1">Your Rating</p>

        <div className="flex gap-5  text-5xl cursor-pointer border border-yellow-600 rounded-md p-3 w-max">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHover(star)}
              onMouseLeave={() => setHover(0)}
              className={`transition border border-yellow-600 rounded-full w-12 h-12 flex items-center justify-center bg-white ${
                (hover || rating) >= star ? "text-yellow-500" : "text-gray-400"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>

      {/* 💬 Comment */}
      <div>
        <textarea
          placeholder="Write your feedback..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full border rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

export default ReviewForm;
