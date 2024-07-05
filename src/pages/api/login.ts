import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = new PrismaClient();
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, email } = req.body;
  const user = await prisma.users.findFirst({
    where: {
      email
    }
  })
  if (!user) {
    res.status(401)
    .send({ error: 'Unauthorized', message: 'Invalid username or password.' });
    return;
  }
  const inputPassword = await bcrypt.hash(password, user.salt);
  if(inputPassword === user.password) {
    const token = jwt.sign( {
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
    }, process.env.JWT_SECRET_KEY);
    res.status(200).send({ jwt: token });
    return;
  }
  res.status(401)
    .send({ error: 'Unauthorized', message: 'Invalid username or password.' });
}