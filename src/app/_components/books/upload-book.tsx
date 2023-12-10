"use client";

import { Author, Book } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";

const callCreate = async (
  books: ({
    authors: Author[];
  } & Book)[]
) => {
  await fetch("api/book", {
    method: "POST",
    body: JSON.stringify(books),
  });
};

const UploadBook = () => {
  const [file, setFile] = useState<Blob | null>(null);
  const { mutate } = useMutation({
    mutationFn: callCreate,
  });

  const handleFileChange = (target: EventTarget & HTMLInputElement) => {
    if (target.files != null) {
      setFile(target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (file == null) {
      console.error("throw error");
    }

    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        const fileContent: string = event.target!.result!.toString();
        const jsonData = JSON.parse(fileContent);

        const books: ({
          authors: Author[];
        } & Book)[] = jsonData.map((bookData: any) => {
          const { authors, ...bookDetails } = bookData;

          return {
            ...bookDetails,
            authors: authors.map((author: Author) => ({
              name: author.name,
              description: author.description,
              portrait: author.portrait,
            })),
          };
        });

        mutate(books);
      } catch (error) {
        console.error("Error parsing JSON file:", error);
      }
    };

    reader.readAsText(file!);
  };

  return (
    <div>
      <input
        type="file"
        accept=".json"
        onChange={(e) => handleFileChange(e.target)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default UploadBook;
