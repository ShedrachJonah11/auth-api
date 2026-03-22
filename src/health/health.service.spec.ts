import { HealthService } from './health.service';

describe('HealthService.ready (shape)', () => {
  it('returns ready=true shape when DB reports connected', async () => {
    const svc = new HealthService({ readyState: 1, db: { admin: () => ({ ping: async () => ({}) }) } } as any);
    const out = await svc.ready();
    expect(out.status).toBe('ready');
    expect(out.database).toBe('connected');
    expect(typeof out.timestamp).toBe('string');
  });

  it('returns not-ready when DB is disconnected', async () => {
    const svc = new HealthService({ readyState: 0 } as any);
    const out = await svc.ready();
    expect(out.status).toBe('not-ready');
  });
});
