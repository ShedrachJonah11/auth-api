import { BusinessException } from './business.exception';
import { HttpStatus } from '@nestjs/common';
import { ERROR_CODES } from '../constants/error-codes.constants';

describe('BusinessException', () => {
  it('encodes message, status, code, timestamp', () => {
    const e = new BusinessException('nope', HttpStatus.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR);
    const res = e.getResponse() as any;
    expect(e.getStatus()).toBe(400);
    expect(res.message).toBe('nope');
    expect(res.errorCode).toBe('VALIDATION_ERROR');
    expect(typeof res.timestamp).toBe('string');
    expect(res.success).toBe(false);
  });

  it('attaches optional details', () => {
    const e = new BusinessException('x', HttpStatus.BAD_REQUEST, ERROR_CODES.VALIDATION_ERROR, { field: 'email' });
    const res = e.getResponse() as any;
    expect(res.details).toEqual({ field: 'email' });
  });
});
