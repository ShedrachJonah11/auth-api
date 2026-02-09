import { sleep, withTimeout } from './sleep.util';

describe('sleep/withTimeout', () => {
  it('sleep resolves after delay', async () => {
    const start = Date.now();
    await sleep(20);
    expect(Date.now() - start).toBeGreaterThanOrEqual(15);
  });

  it('withTimeout resolves when fast', async () => {
    await expect(withTimeout(Promise.resolve('x'), 50)).resolves.toBe('x');
  });

  it('withTimeout rejects when slow', async () => {
    const slow = new Promise((resolve) => setTimeout(() => resolve('late'), 50));
    await expect(withTimeout(slow, 10)).rejects.toThrow('timed out');
  });
});
