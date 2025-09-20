import { applyDecorators } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export function ApiPaginationDecorator() {
  return applyDecorators(
    ApiQuery({
      name: 'page',
      required: false,
      type: Number,
      description: 'Page number',
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
      name: 'search',
      required: false,
      type: String,
      description: 'Search term',
      example: 'john',
    }),
    ApiQuery({
      name: 'sortBy',
      required: false,
      type: String,
      description: 'Sort field',
      example: 'createdAt',
    }),
    ApiQuery({
      name: 'sortOrder',
      required: false,
      enum: ['asc', 'desc'],
      description: 'Sort order',
      example: 'desc',
    }),
  );
}
