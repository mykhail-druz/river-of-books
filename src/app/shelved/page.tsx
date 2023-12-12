import {getServerAuthSession} from "@/server/auth";
import { getShelvedBooks } from "@/server/user";
import {redirect} from "next/navigation";
import { Author, Book, Tag } from "@prisma/client";
import ShelvedBooks from "../_components/books/shelved-books";

const Shelved = async () => {
    const status = await getServerAuthSession();
    if (!status) {
        // User unauthenticated, redirect to home
        redirect('/discover');
    }

    const shelvedBooks: ({
        authors: Author[];
        tags: Tag[];
      } & Book)[] = await getShelvedBooks(Number(status!.user.id));

    if (shelvedBooks.length === 0) {
        return (
            <div className="bg-orange-200 border-t border-b border-orange-500 text-orange-700 p-8 rounded-md shadow-md w-full" role="alert">
                <p className="font-bold text-2xl mb-4">Your Shelf is Empty</p>
                <p className="text-lg">Discover and add books to your shelf!</p>
            </div>
        );
    }

    return (<ShelvedBooks shelvedBooks={shelvedBooks} />);
}

export default Shelved;