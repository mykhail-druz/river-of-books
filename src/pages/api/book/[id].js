// pages/api/book/[id].js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const book = await prisma.book.findUnique({
      where: {
        id: parseInt(id),
      },
      include: {
        authors: true,
        tags: true,
      },
    });

    res.status(200).json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Error fetching book' });
  } finally {
    await prisma.$disconnect();
  }
}
