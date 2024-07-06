import { NextApiRequest } from "next";
import jwtLibrary, { JwtPayload } from 'jsonwebtoken';
import prisma from './prisma';

export const authenticateUser = async (req: NextApiRequest) => {
    const jwt = req.headers.authorization?.split(' ')[1];
    if (!jwt) {
      return null;
    }
    if (!process.env.JWT_SECRET_KEY) {
      return null;
    }
    
    const jwtPayload = jwtLibrary.verify(jwt, process.env.JWT_SECRET_KEY) as JwtPayload;
    return prisma.user.findFirst({
      where: {
        id: jwtPayload.id,
      }
    });
}