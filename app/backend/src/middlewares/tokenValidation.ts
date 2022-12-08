import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    req.body.user = decoded;

    next();
  } catch (erro) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
