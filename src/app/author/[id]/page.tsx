import { AuthorDetail } from "@/app/_components/books/author-detail";
import { getAuthor } from "@/server/authors";

type AuthorProps = {
  params: {
    id: string;
  };
};

const Author = async ({ params }: AuthorProps) => {
  const author = await getAuthor(Number(params.id));

  return (
    <>
    {author !== null && <AuthorDetail author={author!}/>}
    {author === null && <p>Author was not found</p>}
    </>
    );
};

export default Author;
