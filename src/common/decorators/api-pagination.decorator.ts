import { applyDecorators } from '@nestjs/common';
import { ApiQuery, ApiResponse } from '@nestjs/swagger';

export function ApiPaginationQuery() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number (starts from 1)',
      example: 1,
    }),
    ApiQuery({
      name: 'limit',
      required: false,
      type: Number,
      description: 'Number of items per page',
      example: 10,
    }),
    ApiQuery({
      name: 'sort',
      required: false,
      type: String,
      description: 'Sort field',
      example: 'createdAt',
    }),
    ApiQuery({
      name: 'order',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order',
      example: 'desc',
    }),
  );
}

export function ApiPaginationResponse(description: string) {
  return applyDecorators(
    ApiResponse({
      status: 200,
      description,
      example: {
        data: [],
        pagination: {
          page: 1,
          limit: 10,
          total: 100,
          totalPages: 10,
          hasNext: true,
          hasPrev: false,
        },
      },
    }),
  );
}
