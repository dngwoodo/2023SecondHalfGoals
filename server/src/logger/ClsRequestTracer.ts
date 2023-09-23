import * as rTracer from 'cls-rtracer';
import { NextFunction, Request, Response } from 'express';

export function clsRequestTracer(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  rTracer.expressMiddleware({ useHeader: true })(req, res, next);
}

export function getTransactionId() {
  return rTracer.id();
}
