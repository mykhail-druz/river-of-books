import { BookReview } from "@prisma/client";
import ReviewItem from "./review-item";
import { getNames as getUsers } from "@/server/user";

export const Reviews = async ({ reviews }: { reviews: BookReview[] }) => {
  const userIds: number[] = reviews.map(r => r.user_id);
  const users = await getUsers(userIds);
  const reviewsWithNames: ({
    name: string;
    review: BookReview;
  })[] = reviews.map(r => {
    return {
      name: users.find(u => u.id == r.user_id)?.name ?? "User",
      review: r
    }
  })

  return (
    <>
      {reviewsWithNames.map((reviewsWithName) => (
        <div key={reviewsWithName.review.id} className="mb-4">
          <ReviewItem review={reviewsWithName.review} userName={reviewsWithName.name} />
        </div>
      ))}
    </>
  );
};
