import 'dotenv/config';
import * as jwt from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
// import HttpException from '../utils/http.exception';

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization: token } = req.headers;

  if (!token) {
    // throw new HttpException('Token not found', 401);
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET as string) as jwt.JwtPayload;

    req.body.user = decoded;

    next();
  } catch (err) {
    // throw new HttpException('Token must be a valid token', 401);
    return res.status(401).json({ message: 'Token must be a valid token' });
  }
}
