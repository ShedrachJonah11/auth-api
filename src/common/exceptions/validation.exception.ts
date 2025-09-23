import { HttpException, HttpStatus } from '@nestjs/common';

export class ValidationException extends HttpException {
  constructor(
    message: string,
    errors?: any[],
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
  ) {
    super(
      {
        success: false,
        message,
        errors: errors || [],
        errorCode: 'VALIDATION_ERROR',
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
