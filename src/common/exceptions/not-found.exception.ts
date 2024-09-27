import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor(resource: string, identifier?: string) {
    super(
      {
        message: `${resource} not found${identifier ? ` with identifier: ${identifier}` : ''}`,
        errorCode: 'NOT_FOUND',
        resource,
        identifier,
        timestamp: new Date().toISOString(),
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
