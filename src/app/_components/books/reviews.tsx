import { BookReview } from "@prisma/client";
import RatingStars from "./rating-stars";

export const Reviews = ({ reviews }: { reviews: BookReview[] }) => {
  return (
    <>
      {reviews.map((review) => (
        <div key={review.id} className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-gray-800">
              <strong>{review.user_id}</strong>
            </div>
            <RatingStars rating={review.rating} />
            <div className="text-gray-600">
              {new Date(review.created_at).toLocaleDateString()}
            </div>
          </div>
          <p className="text-gray-700">{review.review}</p>
        </div>
      ))}
    </>
  );
};
