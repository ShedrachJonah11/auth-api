import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { API_VERSION_KEY } from '../decorators/api-version.decorator';

@Injectable()
export class VersionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredVersion = this.reflector.getAllAndOverride<string>(API_VERSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredVersion) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiVersion = request.headers['api-version'] || request.query.version;

    if (!apiVersion) {
      throw new BadRequestException('API version is required');
    }

    if (apiVersion !== requiredVersion) {
      throw new BadRequestException(`API version ${requiredVersion} is required`);
    }

    return true;
  }
}
