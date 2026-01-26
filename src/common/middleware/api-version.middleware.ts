import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { HEADER_API_VERSION } from '../constants/http.constants';

const VERSION = process.env.npm_package_version || '1.0.0';

@Injectable()
export class ApiVersionMiddleware implements NestMiddleware {
  use(_req: Request, res: Response, next: NextFunction) {
    res.setHeader(HEADER_API_VERSION, VERSION);
    next();
  }
}
