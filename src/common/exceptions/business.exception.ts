import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorCode, ERROR_CODES } from '../constants/error-codes.constants';

export class BusinessException extends HttpException {
  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.BAD_REQUEST,
    errorCode: ErrorCode = ERROR_CODES.INTERNAL_ERROR,
    details?: unknown,
  ) {
    super(
      {
        success: false,
        message,
        errorCode,
        timestamp: new Date().toISOString(),
        ...(details ? { details } : {}),
      },
      statusCode,
    );
  }
}
