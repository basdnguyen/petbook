import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const saltRounds = 10; 
const prisma = new PrismaClient();
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { password, first_name, last_name, email } = req.body;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);
  await prisma.user.create({
    data: {
      first_name,
      last_name,
      email,
      password: hashedPassword,
      salt
    }
  })
  res.status(204).end();
}