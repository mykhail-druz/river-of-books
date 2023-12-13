import { AuthorDetail } from "@/app/_components/books/author-detail";
import { getAuthor } from "@/server/authors";

type AuthorProps = {
  params: {
    id: string;
  };
};

const Author = async ({ params }: AuthorProps) => {
  const authorId = Number(params.id);
  if (isNaN(authorId)) {
    return <p>Invalid author ID</p>;
  }

  const author = await getAuthor(authorId);

  return (
    <>
      {author !== null ? <AuthorDetail authorId={author.id}/> : <p>Author not found</p>}
    </>
  );
};

export default Author;
