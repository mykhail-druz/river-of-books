"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

type ShelveProp = {
  userId: number;
  bookId: number;
  isBookShelved: boolean;
};

const changeShelveState = async (shelveProp: ShelveProp) => {
  const method = shelveProp.isBookShelved ? "DELETE" : "POST";
  await fetch(`/api/user/${shelveProp.userId}/shelve`, {
    method: method,
    body: JSON.stringify(shelveProp.bookId),
  });
};

export const ShelveButton = ({
  userId,
  bookId,
  isBookShelved,
}: {
  userId: number;
  bookId: number;
  isBookShelved: boolean;
}) => {
  const { mutate } = useMutation({
    mutationFn: changeShelveState,
  });
  const router = useRouter();

  const shelveProp: ShelveProp = {
    userId: userId,
    bookId: bookId,
    isBookShelved: isBookShelved,
  };

  const handleShelve = () =>
    mutate(shelveProp, {
      onSuccess: () => {
        router.refresh();
      },
    });

  return (
    <div className="my-2 mr-2">
      <button
        className="self-end rounded-md bg-blue-500 text-white px-3 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300 transition duration-300"
        onClick={handleShelve}>
        {isBookShelved && <div>Unshelve</div>}
        {!isBookShelved && <div>Shelve</div>}
      </button>
    </div>
  );
};
