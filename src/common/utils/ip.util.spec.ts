import { getClientIp, isLocalIp } from './ip.util';

describe('ip.util', () => {
  it('returns first x-forwarded-for entry when set', () => {
    const req: any = { headers: { 'x-forwarded-for': '1.2.3.4, 5.6.7.8' } };
    expect(getClientIp(req)).toBe('1.2.3.4');
  });

  it('falls back to req.ip', () => {
    const req: any = { headers: {}, ip: '9.9.9.9' };
    expect(getClientIp(req)).toBe('9.9.9.9');
  });

  it('detects local-network IPs', () => {
    expect(isLocalIp('127.0.0.1')).toBe(true);
    expect(isLocalIp('::1')).toBe(true);
    expect(isLocalIp('192.168.1.1')).toBe(true);
    expect(isLocalIp('8.8.8.8')).toBe(false);
  });
});
