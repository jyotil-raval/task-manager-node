import { Request, Response, NextFunction } from 'express';
import { registerUser } from '../services/auth.service';

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    const result = await registerUser(name, email, password);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
