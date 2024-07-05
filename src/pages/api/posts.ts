import type { NextApiRequest, NextApiResponse } from 'next';
import jwtLibrary, { JwtPayload } from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const jwt = req.headers.authorization?.split(' ')[1];
    if (!jwt) {
      res.status(405).end();
      return;
    }
    if (!process.env.JWT_SECRET_KEY) {
      res.status(500).end();
      return;
    }
    const userFromJwt = jwtLibrary.verify(jwt, process.env.JWT_SECRET_KEY) as JwtPayload;
    const { content, image_url } = req.body;
    await prisma.posts.create({ data: {
      content, image_url, author_id: userFromJwt.id
    }});
    res.status(204).end();
  } else {
    const posts = await prisma.posts.findMany({
      orderBy: {
        created_at: 'desc'
      }
    });
    res.status(200).json(posts);
  }
}