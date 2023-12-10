const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient()

async function main() {
    // Create authors
  const tolkien = await prisma.author.create({
    data: {
      name: 'J.R.R. Tolkien',
      description: 'English writer, poet, and philologist',
      portrait: 'tolkien.jpg', // Replace with the actual file path
    },
  });

  // Create tags
  const fantasyTag = await prisma.tag.create({
    data: {
      name: 'Fantasy',
      description: 'Books with fantastical elements',
    },
  });

  // Create books
  const lordOfTheRings = await prisma.book.create({
    data: {
      title: 'The Lord of the Rings',
      cover_picture: 'lotr.jpg', // Replace with the actual file path
      description: 'Epic high fantasy novel',
      long_description: 'The Lord of the Rings is a high-fantasy novel written by J.R.R. Tolkien.',
      page_count: 1178,
      authors: {
        connect: { id: tolkien.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const theHobbit = await prisma.book.create({
    data: {
      title: 'The Hobbit',
      cover_picture: 'hobbit.jpg', // Replace with the actual file path
      description: 'Fantasy novel',
      long_description: 'The Hobbit is a fantasy novel written by J.R.R. Tolkien.',
      page_count: 310,
      authors: {
        connect: { id: tolkien.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  // Create users
  const user1 = await prisma.user.create({
    data: {
      // username: 'user1',
      // password: 'password1',
      name: 'User One',
      email: 'user123@example.com',
      description: 'Reader and fantasy enthusiast',
      image: 'user1.jpg', // Replace with the actual file path
      shelved: {
        connect: { id: lordOfTheRings.id },
      },
      book_reviews: {
        create: {
          review: 'I love this book!',
          rating: 5,
          book: { connect: { id: lordOfTheRings.id } },
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      // username: 'user2',
      // password: 'password2',
      name: 'User Two',
      email: 'user2@example.com',
      description: 'Bookworm and Tolkien fan',
      image: 'user2.jpg', // Replace with the actual file path
      shelved: {
        connect: { id: lordOfTheRings.id },
      },
      book_reviews: {
        create: {
          review: 'Amazing journey!',
          rating: 4,
          book: { connect: { id: lordOfTheRings.id } },
        },
      },
    },
  });

  const user3 = await prisma.user.create({
    data: {
      // username: 'user3',
      // password: 'password3',
      name: 'User Three',
      email: 'user3@example.com',
      description: 'Fantasy reader and movie buff',
      image: 'user3.jpg', // Replace with the actual file path
      shelved: {
        connect: [
          { id: lordOfTheRings.id },
          { id: theHobbit.id },
        ],
      },
      book_reviews: {
        create: {
          review: 'Two great books!',
          rating: 5,
          book: { connect: { id: lordOfTheRings.id } },
        }
    },
    },
  });

  const jkRowling = await prisma.author.create({
    data: {
      name: 'J.K. Rowling',
      description: 'Author of the Harry Potter series',
      portrait: 'jk_rowling.jpg', // Add the actual file path or URL
    },
  });

  const georgeMartin = await prisma.author.create({
    data: {
      name: 'George R.R. Martin',
      description: 'Author of A Song of Ice and Fire series',
      portrait: 'george_martin.jpg', // Add the actual file path or URL
    },
  });

  const andrzejSapkowski = await prisma.author.create({
    data: {
      name: 'Andrzej Sapkowski',
      description: 'Author of The Witcher series',
      portrait: 'andrzej_sapkowski.jpg', // Add the actual file path or URL
    },
  });

  // Create books
  const harryPotter = await prisma.book.create({
    data: {
      title: 'Harry Potter and the Sorcerer\'s Stone',
      cover_picture: 'harry_potter.jpg', // Add the actual file path or URL
      description: 'The first book in the Harry Potter series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 336,
      authors: {
        connect: { id: jkRowling.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const songOfIceAndFire = await prisma.book.create({
    data: {
      title: 'A Game of Thrones',
      cover_picture: 'song_of_ice_and_fire.jpg', // Add the actual file path or URL
      description: 'The first book in A Song of Ice and Fire series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 694,
      authors: {
        connect: { id: georgeMartin.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const theWitcher = await prisma.book.create({
    data: {
      title: 'The Last Wish',
      cover_picture: 'the_witcher.jpg', // Add the actual file path or URL
      description: 'The first book in The Witcher series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 292,
      authors: {
        connect: { id: andrzejSapkowski.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const harryPotter2 = await prisma.book.create({
    data: {
      title: 'Harry Potter and the Chamber of Secrets',
      cover_picture: 'harry_potter_2.jpg', // Add the actual file path or URL
      description: 'The second book in the Harry Potter series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 384,
      authors: {
        connect: { id: jkRowling.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const songOfIceAndFire2 = await prisma.book.create({
    data: {
      title: 'A Clash of Kings',
      cover_picture: 'song_of_ice_and_fire_2.jpg', // Add the actual file path or URL
      description: 'The second book in A Song of Ice and Fire series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 768,
      authors: {
        connect: { id: georgeMartin.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const theWitcher2 = await prisma.book.create({
    data: {
      title: 'Sword of Destiny',
      cover_picture: 'the_witcher_2.jpg', // Add the actual file path or URL
      description: 'The second book in The Witcher series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 384,
      authors: {
        connect: { id: andrzejSapkowski.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const harryPotter3 = await prisma.book.create({
    data: {
      title: 'Harry Potter and the Prisoner of Azkaban',
      cover_picture: 'harry_potter_3.jpg', // Add the actual file path or URL
      description: 'The third book in the Harry Potter series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 448,
      authors: {
        connect: { id: jkRowling.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const songOfIceAndFire3 = await prisma.book.create({
    data: {
      title: 'A Storm of Swords',
      cover_picture: 'song_of_ice_and_fire_3.jpg', // Add the actual file path or URL
      description: 'The third book in A Song of Ice and Fire series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 992,
      authors: {
        connect: { id: georgeMartin.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });

  const theWitcher3 = await prisma.book.create({
    data: {
      title: 'Blood of Elves',
      cover_picture: 'the_witcher_3.jpg', // Add the actual file path or URL
      description: 'The third book in The Witcher series',
      long_description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      page_count: 416,
      authors: {
        connect: { id: andrzejSapkowski.id },
      },
      tags: {
        connect: { id: fantasyTag.id },
      },
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })