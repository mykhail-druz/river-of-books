"use client";

import { BookReview } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
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
  const router = useRouter();
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
    mutate(reviewModel, {
      onSuccess: () => router.refresh()
    });
  };

  return (
    <>
    <div className="text-xl font-semibold mb-4">Add your review:</div>
    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3 p-6 border border-gray-300 rounded-md">
      <div className="rating">
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300"
          checked={rating === 1}
          onChange={(_) => setRating(1)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300"
          onChange={(_) => setRating(2)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300"
          onChange={(_) => setRating(3)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300"
          onChange={(_) => setRating(4)}
        />
        <input
          type="radio"
          name="rating-1"
          className="mask mask-star-2 bg-yellow-300"
          onChange={(_) => setRating(5)}
        />
      </div>
      <textarea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="border border-gray-300 p-2 rounded-md"
        placeholder="Write your review..."
      />
      <button
        className="self-end rounded-md bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        type="submit"
      >
        Add Review
      </button>
    </form>
    </>
  );
};