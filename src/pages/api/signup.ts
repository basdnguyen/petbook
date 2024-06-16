import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const bcrypt = require('bcrypt');
const saltRounds = 10; 
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, first_name, last_name, email } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  await sql`
    INSERT INTO users (first_name, last_name, email, password, salt)
    VALUES (${first_name}, ${last_name}, ${email}, ${hashedPassword}, ${salt});
  `;
  res.status(204).end();
}