import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { content, image_url } = req.body;
    await sql`INSERT INTO posts (content, image_url)
      VALUES (${content}, ${image_url});
    `;
    res.status(204).end();
  } else {
    const { rows } = await sql`SELECT * from POSTS`;
    res.status(200).json(rows);
  }
}