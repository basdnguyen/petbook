import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'DELETE') {
    const { id: idQuery } = req.query;
    const id = Array.isArray(idQuery) ? idQuery[0] : idQuery;
    await sql`DELETE FROM posts
      WHERE id = ${id};
    `;
    res.status(204).end();
  } else {
    res.status(200).end();
  }
}