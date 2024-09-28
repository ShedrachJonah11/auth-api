import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

export function ApiSuccessResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      example: example || { message: 'Success' },
    }),
  );
}

export function ApiCreatedResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 201,
      description,
      example: example || { message: 'Created successfully' },
    }),
  );
}

export function ApiBadRequestResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 400,
      description,
      example: example || { message: 'Bad Request', errorCode: 'VALIDATION_ERROR' },
    }),
  );
}

export function ApiUnauthorizedResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 401,
      description,
      example: example || { message: 'Unauthorized', errorCode: 'UNAUTHORIZED' },
    }),
  );
}

export function ApiForbiddenResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 403,
      description,
      example: example || { message: 'Forbidden', errorCode: 'FORBIDDEN' },
    }),
  );
}

export function ApiNotFoundResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 404,
      description,
      example: example || { message: 'Not Found', errorCode: 'NOT_FOUND' },
    }),
  );
}

export function ApiTooManyRequestsResponse(description: string, example?: any) {
  return applyDecorators(
    ApiResponse({
      status: 429,
      description,
      example: example || { message: 'Too Many Requests', errorCode: 'RATE_LIMITED' },
    }),
  );
}
