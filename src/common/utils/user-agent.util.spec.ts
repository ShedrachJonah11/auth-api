import { parseUserAgent } from './user-agent.util';

describe('parseUserAgent', () => {
  it('identifies Chrome on macOS', () => {
    const ua = parseUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) Chrome/123.0.0.0 Safari/537.36');
    expect(ua.browser).toBe('Chrome');
    expect(ua.os).toBe('macOS');
    expect(ua.isMobile).toBe(false);
  });

  it('identifies mobile iOS', () => {
    const ua = parseUserAgent('Mozilla/5.0 (iPhone; CPU iPhone OS 14_0) Mobile/15E148');
    expect(ua.isMobile).toBe(true);
    expect(ua.os).toBe('iOS');
  });

  it('identifies bots', () => {
    expect(parseUserAgent('Googlebot/2.1').isBot).toBe(true);
    expect(parseUserAgent('Mozilla/5.0 (compatible; bingbot/2.0;)').isBot).toBe(true);
  });

  it('handles undefined input', () => {
    expect(parseUserAgent(undefined).raw).toBe('');
  });
});
