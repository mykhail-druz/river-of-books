"use client"
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Предполагаем, что у вас есть сгенерированный Prisma Client
import { Book as BookType } from '@prisma/client';

const BookBlock = () => {
  const [book, setBook] = useState<BookType | null>(null);

  useEffect(() => {
    fetch('/api/book/1')
      .then((response) => response.json())
      .then((data) => setBook(data))
      .catch((error) => console.error('Error fetching book:', error));
  }, []);

  if (!book) {
    return <div>Loading...</div>;
  }

  return (
    <section className="flex w-full my-6">
      <div className="flex w-[1/2] border-purple-200 border-4">
        <div className="w-1/3 bg-purple-200">
          <Image src={`/public${book.cover_picture}`} alt={book.title} width={300} height={400} />
        </div>
        <div className="w-2/3 flex flex-col">
          <p>{book.title}</p>
          <p>{book.authors.map((author) => author.name).join(', ')}</p>
          <p>{book.description}</p>
          <div>
            Tags: {book.tags.map((tag) => tag.name).join(', ')}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookBlock;
