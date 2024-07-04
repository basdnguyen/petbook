import jwtLibrary from 'jsonwebtoken';
import type { NextApiRequest, NextApiResponse } from 'next';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const jwt = req.headers.authorization?.split(' ')[1];
    if (!jwt) {
      res.status(405).end();
      return;
    }
    if (!process.env.JWT_SECRET_KEY) {
      res.status(500).end();
      return;
    }
    
    const userFromJwt = jwtLibrary.verify(jwt, process.env.JWT_SECRET_KEY);
    res.status(200).json(userFromJwt);
  } else {
    res.status(405).end();
  }
}