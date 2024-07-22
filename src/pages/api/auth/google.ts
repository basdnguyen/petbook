import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/utils/prisma';
import { OAuth2Client } from'google-auth-library';
import jwtLibrary from 'jsonwebtoken';

interface GoogleSignInRequestData {
  token: string;
  client_id: string;
}
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { token, client_id } = req.body as GoogleSignInRequestData;
  const client = new OAuth2Client();
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: client_id,
  })
  const payload = ticket.getPayload();
  if (!payload) {
    res.status(403).end();
    return;
  }
  let user = await prisma.user.findFirst({
    where: {
      google_id: payload.sub,
    }
  })
  if (!user) {
    user = await prisma.user.create({
      data: {
        google_id: payload.sub,
        email: payload.email!,
        first_name: payload.given_name!,
        last_name: payload.family_name!,
        password: '',
        salt: '',
      }
    });
  }
  const jwt = jwtLibrary.sign( {
    id: user.id,
    first_name: user.first_name,
    last_name: user.last_name,
    email: user.email,
  }, process.env.JWT_SECRET_KEY!);
  res.status(200).send({ jwt });
}