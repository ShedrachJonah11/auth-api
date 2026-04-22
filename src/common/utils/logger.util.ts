import { Logger } from '@nestjs/common';
import { LogContextName } from '../constants/logger-context.constants';

const cache = new Map<string, Logger>();

export function getLogger(context: LogContextName | string): Logger {
  let l = cache.get(context);
  if (!l) {
    l = new Logger(context);
    cache.set(context, l);
  }
  return l;
}
