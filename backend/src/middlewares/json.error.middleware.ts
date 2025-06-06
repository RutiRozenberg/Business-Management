import { Request, Response, NextFunction } from 'express';

interface CustomSyntaxError extends SyntaxError {
  status?: number;
}

export const jsonErrorMiddleware = (err: CustomSyntaxError, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof SyntaxError && err.message.includes('JSON')) {
    res.status(400).json({ error: 'Invalid JSON' });
    return;
  }
  next(err);
};