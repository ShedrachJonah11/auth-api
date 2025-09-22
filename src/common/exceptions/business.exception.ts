import { HttpException, HttpStatus } from '@nestjs/common';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    errorCode?: string,
  ) {
    super(
      {
        success: false,
        message,
        errorCode: errorCode || 'BUSINESS_ERROR',
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
