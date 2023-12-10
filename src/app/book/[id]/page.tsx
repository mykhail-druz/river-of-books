import { BookDetail } from "@/app/_components/books/book-detail";
import { getBook } from "@/server/books";

type BookProps = {
  params: {
    id: string;
  };
};

const Book = async ({ params }: BookProps) => {
  const book = await getBook(Number(params.id));

  return (
    <>
    {book !== null && <BookDetail book={book!}/>}
    {book === null && <p>Book was not found</p>}
    </>
    );
};

export default Book;
