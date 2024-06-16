import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = 'your_secret_key';
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, email } = req.body;
  const { rows } = await sql`SELECT * from users WHERE email = ${email}`;
  if (rows.length === 0) {
    res.status(401)
    .send({ error: 'Unauthorized', message: 'Invalid username or password.' });
    return;
  }
  const user = rows[0];
  const inputPassword = await bcrypt.hash(password, user.salt);
  if(inputPassword === user.password) {
    const token = jwt.sign(user, secretKey, { expiresIn: '1h' });
    res.status(200).send({ jwt: token });
  }
  res.status(401)
    .send({ error: 'Unauthorized', message: 'Invalid username or password.' });
}