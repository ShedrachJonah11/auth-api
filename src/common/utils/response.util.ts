export class ResponseUtil {
  static success<T>(data: T, message: string = 'Success', statusCode: number = 200) {
    return {
      success: true,
      statusCode,
      message,
      data,
      timestamp: new Date().toISOString(),
    };
  }

  static error(message: string, statusCode: number = 400, errorCode?: string, details?: any) {
    return {
      success: false,
      statusCode,
      message,
      errorCode: errorCode || 'ERROR',
      details,
      timestamp: new Date().toISOString(),
    };
  }

  static paginated<T>(
    data: T[],
    total: number,
    page: number,
    limit: number,
    message: string = 'Success',
  ) {
    const totalPages = Math.ceil(total / limit);
    
    return {
      success: true,
      statusCode: 200,
      message,
      data,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
      timestamp: new Date().toISOString(),
    };
  }

  static created<T>(data: T, message: string = 'Created successfully') {
    return this.success(data, message, 201);
  }

  static noContent(message: string = 'No content') {
    return this.success(null, message, 204);
  }
}
