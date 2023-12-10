# River-of-Books
A web application for discovering new books.
![initial-mockup](https://github.com/Miliver/River-of-Books/assets/61538084/bf3fe104-3a44-425f-88db-bf94d419df40)
- The application provides a feed of items, each of which represents a book and a short info about it:
  - Book title
  - Picture of book cover
  - Book author
  - Average star rating
  - Short description
  - Tags (topics)
  - "Like" button and its checkbox

- Clicking on the book title shows a side pane to the right with more detailed info about the book:
  - The long description of the book
  - The list of reviews & star ratings by other users
  - [potentially something else ?]

- Clicking on book's author shows all books written by this author
  - We can show this in the side pane as well
  - Or we can switch to the "feed" of books from this author
  - Also, short information about the author is shown, and his portrait

- Clicking on one of the tags (topics) at the bottom of the book's description shows books with this tag
  - Again, either as a side pane or we switch the feed

- The navigation bar at the top allows to switch between main workflows:
  - Book discovery -- main workflow
  - My collection -- list of books the user Liked
  - [potentially something else, if we get some good ideas 🤷]

- The user can leave a review and star rating for a book

- The (big) database of books, authors, and topics is provided by the application

- The application has these roles:
  - User
    - Uses all of the above functionality to discover and save new books
    
  - Administrator
    - Manages the database of books
      - Adds books
      - Removes books
      - Changes book descriptions
    - Manages reviews
      - Can delete another user's review

