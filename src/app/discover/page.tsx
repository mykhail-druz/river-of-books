import { getAllBooks } from "@/server/books";
import { BookList } from "../_components/books/book-list";

const Discover = async () => {
    const books = await getAllBooks(0, 4);
    return (<BookList baseBooks={books} />)
};

export default Discover;
