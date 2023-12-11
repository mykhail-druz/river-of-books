"use client";

import { BookReview } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState, type FormEvent } from "react";

const callCreate = async (review: BookReview) => {
  await fetch("/api/book/review", {
    method: "POST",
    body: JSON.stringify(review),
  });
};

export const AddReview = ({
  userId,
  bookId,
}: {
  userId: number;
  bookId: number;
}) => {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(1);
  const { mutate } = useMutation({
    mutationFn: callCreate,
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const reviewModel: BookReview = {
      user_id: userId,
      book_id: bookId,
      review: review,
      rating: rating,
      id: 0,
      created_at: new Date(),
    };
    mutate(reviewModel);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 p-6">
      <div className="rating">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star"
          checked={rating === 1}
          onChange={(_) => setRating(1)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star"
          onChange={(_) => setRating(2)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star"
          onChange={(_) => setRating(3)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star"
          onChange={(_) => setRating(4)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star"
          onChange={(_) => setRating(5)}
        />
      </div>
      <textarea value={review} onChange={(e) => setReview(e.target.value)} />
      <button
        className="self-end rounded-md border border-slate-600 px-3 py-2 hocus:bg-slate-700"
        type="submit">
        Add review
      </button>
    </form>
  );
};
