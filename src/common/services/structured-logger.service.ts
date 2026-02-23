import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class StructuredLoggerService {
  log(context: string, message: string, fields: Record<string, unknown> = {}): void {
    new Logger(context).log(this.format(message, fields));
  }

  warn(context: string, message: string, fields: Record<string, unknown> = {}): void {
    new Logger(context).warn(this.format(message, fields));
  }

  error(context: string, message: string, error?: unknown, fields: Record<string, unknown> = {}): void {
    new Logger(context).error(this.format(message, fields), error instanceof Error ? error.stack : undefined);
  }

  private format(message: string, fields: Record<string, unknown>): string {
    const keys = Object.keys(fields);
    if (!keys.length) return message;
    const pairs = keys.map((k) => `${k}=${JSON.stringify(fields[k])}`).join(' ');
    return `${message} ${pairs}`;
  }
}
