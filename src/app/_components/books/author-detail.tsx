import { Author } from "@prisma/client";

export const AuthorDetail = ({ author }: { author: Author }) => {
  return (
    <>
      <h3>{author.name}</h3>
      <p>TODO: add what you want :)</p>
    </>
  );
};
