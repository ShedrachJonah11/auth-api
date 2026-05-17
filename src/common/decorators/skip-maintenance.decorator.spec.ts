import { Reflector } from '@nestjs/core';
import { SkipMaintenance, SKIP_MAINTENANCE_KEY } from './skip-maintenance.decorator';

describe('@SkipMaintenance', () => {
  it('sets metadata reachable via Reflector', () => {
    class C {}
    SkipMaintenance()(C);
    const r = new Reflector();
    expect(r.get(SKIP_MAINTENANCE_KEY, C)).toBe(true);
  });
});
