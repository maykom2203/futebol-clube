import { NextFunction, Request, Response } from 'express';

export class UrlError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}
export const ErrorUrlMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const { status, message } = err as UrlError;

  if (status) {
    return res.status(status || 500).json({ message });
  }
};
