import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { VERSION_METADATA_KEY } from '../decorators/api-version.decorator';

@Injectable()
export class VersionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredVersion = this.reflector.getAllAndOverride<string>(
      VERSION_METADATA_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredVersion) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiVersion = request.headers['api-version'] || 'v1';

    return apiVersion === requiredVersion;
  }
}
