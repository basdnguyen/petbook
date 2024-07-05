import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id: idQuery } = req.query;
    const id = Array.isArray(idQuery) ? idQuery[0] : idQuery;
    if (!id) {
      res.status(404).end();
      return;
    }
    await prisma.posts.delete({
      where: {
        id: Number(id),
      }
    });
    res.status(204).end();
  } else {
    res.status(200).end();
  }
}