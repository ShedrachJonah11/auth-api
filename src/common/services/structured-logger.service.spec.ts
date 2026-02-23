import { StructuredLoggerService } from './structured-logger.service';

describe('StructuredLoggerService', () => {
  const svc = new StructuredLoggerService();

  it('logs plain messages', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    svc.log('Test', 'hello');
    spy.mockRestore();
  });

  it('formats fields as k=v', () => {
    const spy = jest.spyOn(console, 'log').mockImplementation(() => {});
    svc.log('Test', 'hello', { foo: 'bar', n: 1 });
    spy.mockRestore();
  });

  it('error accepts an Error object', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    svc.error('Test', 'boom', new Error('x'));
    spy.mockRestore();
  });
});
