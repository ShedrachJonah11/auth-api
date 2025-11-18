import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { API_VERSION_KEY } from '../decorators/api-version.decorator';

@Injectable()
export class VersionGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredVersion = this.reflector.getAllAndOverride<string | string[]>(API_VERSION_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredVersion) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const apiVersion = request.headers['api-version'] || request.headers['x-api-version'] || request.query.version;

    if (!apiVersion) {
      throw new BadRequestException({
        message: 'API version is required',
        errorCode: 'MISSING_API_VERSION',
        availableVersions: Array.isArray(requiredVersion) ? requiredVersion : [requiredVersion],
      });
    }

    const allowedVersions = Array.isArray(requiredVersion) ? requiredVersion : [requiredVersion];
    
    if (!allowedVersions.includes(apiVersion)) {
      throw new BadRequestException({
        message: `API version ${apiVersion} is not supported`,
        errorCode: 'UNSUPPORTED_API_VERSION',
        requestedVersion: apiVersion,
        availableVersions: allowedVersions,
      });
    }

    return true;
  }
}
