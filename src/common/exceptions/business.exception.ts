import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(message: string, errorCode?: string) {
    super(
      {
        message,
        errorCode: errorCode || 'BUSINESS_ERROR',
        timestamp: new Date().toISOString(),
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
