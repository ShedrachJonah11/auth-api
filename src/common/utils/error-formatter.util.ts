import { HttpException } from '@nestjs/common';

export interface FormattedError {
  message: string;
  errorCode: string;
  statusCode: number;
  details?: unknown;
}

export function formatHttpException(err: HttpException): FormattedError {
  const status = err.getStatus();
  const res = err.getResponse() as any;
  const message = typeof res === 'string' ? res : (res?.message ?? err.message);
  const errorCode = (res?.errorCode as string) ?? `HTTP_${status}`;
  return {
    message: Array.isArray(message) ? message.join('; ') : String(message),
    errorCode,
    statusCode: status,
    ...(res?.details ? { details: res.details } : {}),
  };
}
