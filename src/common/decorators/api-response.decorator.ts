import { applyDecorators, Type } from '@nestjs/common';
import { ApiResponse, ApiResponseOptions } from '@nestjs/swagger';

export function ApiResponseDecorator(
  status: number,
  description: string,
  type?: Type<any>,
  options?: ApiResponseOptions,
) {
  return applyDecorators(
    ApiResponse({
      status,
      description,
      type,
      ...options,
    }),
  );
}

export function ApiSuccessResponse(
  type?: Type<any>,
  description: string = 'Success',
) {
  return ApiResponseDecorator(200, description, type);
}

export function ApiCreatedResponse(
  type?: Type<any>,
  description: string = 'Created successfully',
) {
  return ApiResponseDecorator(201, description, type);
}

export function ApiBadRequestResponse(description: string = 'Bad request') {
  return ApiResponseDecorator(400, description);
}

export function ApiUnauthorizedResponse(description: string = 'Unauthorized') {
  return ApiResponseDecorator(401, description);
}

export function ApiForbiddenResponse(description: string = 'Forbidden') {
  return ApiResponseDecorator(403, description);
}

export function ApiNotFoundResponse(description: string = 'Not found') {
  return ApiResponseDecorator(404, description);
}

export function ApiInternalServerErrorResponse(
  description: string = 'Internal server error',
) {
  return ApiResponseDecorator(500, description);
}
