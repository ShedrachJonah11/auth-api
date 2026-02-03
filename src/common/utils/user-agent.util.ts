export interface UserAgentInfo {
  raw: string;
  isMobile: boolean;
  isBot: boolean;
  browser?: string;
  os?: string;
}

const BOT_REGEX = /(bot|crawler|spider|crawling|googlebot|bingbot)/i;
const MOBILE_REGEX = /(iphone|ipad|android|mobile|opera mini)/i;

const BROWSERS: Array<[RegExp, string]> = [
  [/edg\//i, 'Edge'],
  [/chrome\//i, 'Chrome'],
  [/firefox\//i, 'Firefox'],
  [/safari\//i, 'Safari'],
];

const OSES: Array<[RegExp, string]> = [
  [/windows nt/i, 'Windows'],
  [/mac os x/i, 'macOS'],
  [/android/i, 'Android'],
  [/iphone|ipad|ios/i, 'iOS'],
  [/linux/i, 'Linux'],
];

export function parseUserAgent(ua: string | undefined): UserAgentInfo {
  const raw = ua || '';
  return {
    raw,
    isMobile: MOBILE_REGEX.test(raw),
    isBot: BOT_REGEX.test(raw),
    browser: BROWSERS.find(([rx]) => rx.test(raw))?.[1],
    os: OSES.find(([rx]) => rx.test(raw))?.[1],
  };
}
