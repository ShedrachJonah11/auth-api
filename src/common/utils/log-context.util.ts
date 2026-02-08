import { Request } from 'express';

export interface LogContext {
  requestId?: string;
  correlationId?: string;
  userId?: string;
  ip?: string;
  method?: string;
  path?: string;
}

export function buildLogContext(req: Request & { user?: { sub?: string } }): LogContext {
  const anyReq = req as any;
  return {
    requestId: anyReq.requestId,
    correlationId: anyReq.correlationId,
    userId: req.user?.sub,
    ip: req.ip,
    method: req.method,
    path: req.path,
  };
}
