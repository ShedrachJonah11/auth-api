import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Feature131Middleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Add your middleware logic here
    next();
  }
}