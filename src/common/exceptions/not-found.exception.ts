import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(
    message: string = 'Resource not found',
    statusCode: HttpStatus = HttpStatus.NOT_FOUND,
  ) {
    super(
      {
        success: false,
        message,
        errorCode: 'NOT_FOUND',
        timestamp: new Date().toISOString(),
      },
      statusCode,
    );
  }
}
