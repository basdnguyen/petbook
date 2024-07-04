import type { NextApiRequest, NextApiResponse } from 'next'
import { sql } from "@vercel/postgres";

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
 
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
    const token = jwt.sign( {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
    res.status(200).send({ jwt: token });
    return;
  }
  res.status(401)
    .send({ error: 'Unauthorized', message: 'Invalid username or password.' });
}