"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const deleteBook = async (bookId: number) => {
    await fetch(`/api/book/${bookId}`, {
        method: "DELETE"
    });
}

const DeleteButton = ({ bookId }: { bookId: number }) => {
  const { mutate } = useMutation({
    mutationFn: deleteBook,
  });
  const router = useRouter();

  const handleDelete = () =>
    mutate(bookId, {
      onSuccess: () => {
        router.replace('/discover');
      },
    });
  return (
    <div className="m-2">
    <button
      className="self-end rounded-md bg-red-500 text-white px-3 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
      onClick={handleDelete}>
      Delete
    </button>
    </div>
  );
};

export default DeleteButton;