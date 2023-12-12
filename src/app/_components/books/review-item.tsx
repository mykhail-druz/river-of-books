"use client";

import { BookReview } from "@prisma/client";
import RatingStars from "./rating-stars";


const ReviewItem = ({
    review,
    userName,
  }: {
    review: BookReview;
    userName: string;
  }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-800">
          <strong>{userName}</strong>
        </div>
        <RatingStars rating={review.rating} />
        <div className="text-gray-600">
          {new Date(review.created_at).toLocaleDateString()}
        </div>
      </div>
      <p className="text-gray-700">{review.review}</p>
    </>
  );
};

export default ReviewItem;
