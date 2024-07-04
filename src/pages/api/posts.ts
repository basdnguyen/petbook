import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";
import jwtLibrary, { JwtPayload } from 'jsonwebtoken';
 
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
    await sql`INSERT INTO posts (content, image_url, author_id)
      VALUES (${content}, ${image_url}, ${userFromJwt.id});
    `;
    res.status(204).end();
  } else {
    const { rows } = await sql`SELECT * FROM POSTS ORDER BY created_at DESC`;
    res.status(200).json(rows);
  }
}