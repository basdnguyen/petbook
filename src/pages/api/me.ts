import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const jwt = require('jsonwebtoken');
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const jwtPayload = req.headers.authorization?.split(' ')[1];
    const userFromJwt = jwt.decode(jwtPayload);
    res.status(200).json(userFromJwt);
  } else {
    res.status(405).end();
  }
}