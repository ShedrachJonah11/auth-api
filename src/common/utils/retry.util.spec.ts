import { retry } from './retry.util';

describe('retry', () => {
  it('returns result on first success', async () => {
    const fn = jest.fn().mockResolvedValue('ok');
    await expect(retry(fn)).resolves.toBe('ok');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('retries until success', async () => {
    let calls = 0;
    const fn = async () => {
      calls++;
      if (calls < 3) throw new Error('flaky');
      return 'done';
    };
    await expect(retry(fn, { attempts: 5, delayMs: 1 })).resolves.toBe('done');
    expect(calls).toBe(3);
  });

  it('throws when shouldRetry returns false', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('fatal'));
    await expect(retry(fn, { attempts: 5, delayMs: 1, shouldRetry: () => false })).rejects.toThrow('fatal');
    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('respects attempt cap', async () => {
    const fn = jest.fn().mockRejectedValue(new Error('flaky'));
    await expect(retry(fn, { attempts: 2, delayMs: 1 })).rejects.toThrow('flaky');
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
