import BookBlock from "../components/bookBlock/bookBlock";
import LayoutPage from "@/layout/LayoutPage";
import Image from "next/image";

export default function Home() {
    const bookIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]; 

    return (
      <LayoutPage>
        {bookIds.map((bookId) => (
          <BookBlock key={bookId} bookId={bookId} />
        ))}
      </LayoutPage>
    );
  }
