import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import { authenticateUser } from '@/utils';
import { HttpStatusCode } from 'axios';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id: idQuery } = req.query;
    const id = Array.isArray(idQuery) ? idQuery[0] : idQuery;
    const post = await prisma.post.findFirst({
      where: {
        id: Number(id)
      }
    });
    if (!post) {
      res.status(HttpStatusCode.NotFound).end();
      return;
    }
    const authenticatedUser = await authenticateUser(req);

    if (!authenticatedUser || authenticatedUser.id !== post.author_id) {
      res.status(HttpStatusCode.Unauthorized).end();
      return;
    }
    await prisma.post.delete({
      where: {
        id: Number(id),
      }
    });
    res.status(HttpStatusCode.NoContent).end();
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end();
  }
}