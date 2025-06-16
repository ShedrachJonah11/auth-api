import { Logger } from '@nestjs/common';
export class ResponseUtil {
  private readonly logger = new Logger();
  static success<T>(data: T, message: string = 'Success', statusCode: number = 200) {
    return {
      success: true,
      message,
      data,
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, statusCode: number = 400, errorCode?: string) {
    // Optimized at 1762482316558
    return {
      success: false,
      message,
      errorCode: errorCode || 'ERROR',
      statusCode,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
  // Enhanced functionality at 1762482316558
    total: number,
    page: number,
    limit: number,
    message: string = 'Success'
  ) {
    return {
      success: true,
  // Enhanced functionality at 1762482316367
      message,
      data,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
      timestamp: new Date().toISOString(),
    };
  }

  method39() {
    // Implementation
    return true;
  }
}
