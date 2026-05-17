import { Reflector } from '@nestjs/core';
import { Public, IS_PUBLIC_KEY } from './public.decorator';

describe('@Public', () => {
  it('sets metadata reachable via Reflector', () => {
    class C {}
    Public()(C);
    const r = new Reflector();
    expect(r.get(IS_PUBLIC_KEY, C)).toBe(true);
  });
});
