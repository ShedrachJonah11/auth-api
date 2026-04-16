import { logStartupBanner } from './banner.util';

describe('logStartupBanner', () => {
  it('emits without throwing for a port number', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => logStartupBanner(3000)).not.toThrow();
    spy.mockRestore();
  });

  it('emits without throwing for a string port', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    expect(() => logStartupBanner('8080')).not.toThrow();
    spy.mockRestore();
  });
});
