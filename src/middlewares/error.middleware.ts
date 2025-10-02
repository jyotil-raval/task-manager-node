import { Request, Response, NextFunction } from 'express';

export const errorHandler = (err: any, req: Request, res: Response, _next: NextFunction) => {
  console.error(err.message || err);
  res.status(400).json({ error: err.message || 'Something went wrong' });
};
