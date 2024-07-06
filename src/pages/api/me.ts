import { authenticateUser } from '@/utils';
import { HttpStatusCode } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const authenticatedUser = await authenticateUser(req);
    if (authenticatedUser) {
      res.status(HttpStatusCode.Ok).json({
        id: authenticatedUser.id,
        email: authenticatedUser.email,
        first_name: authenticatedUser.first_name,
        last_name: authenticatedUser.last_name,
      });
    } else {
      res.status(HttpStatusCode.Unauthorized).end();
    }
  } else {
    res.status(HttpStatusCode.MethodNotAllowed).end();
  }
}