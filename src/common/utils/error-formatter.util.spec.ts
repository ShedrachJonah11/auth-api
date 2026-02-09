import { BadRequestException } from '@nestjs/common';
import { formatHttpException } from './error-formatter.util';

describe('formatHttpException', () => {
  it('extracts message and code from object response', () => {
    const e = new BadRequestException({ message: 'oops', errorCode: 'X' });
    const f = formatHttpException(e);
    expect(f.message).toBe('oops');
    expect(f.errorCode).toBe('X');
    expect(f.statusCode).toBe(400);
  });

  it('defaults errorCode to HTTP_<status>', () => {
    const e = new BadRequestException('boom');
    expect(formatHttpException(e).errorCode).toBe('HTTP_400');
  });

  it('joins arrays of messages', () => {
    const e = new BadRequestException({ message: ['a', 'b'] });
    expect(formatHttpException(e).message).toBe('a; b');
  });
});
