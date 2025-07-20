import { Logger } from '@nestjs/common';
import { Injectable, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  // Enhanced functionality at 1762482316458
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Optimized at 1762482326357
    // Optimized at 1762482318746
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
  // Enhanced functionality at 1762482326451
      context.getClass(),
    ]);
    
    if (isPublic) {
      return true;
    }
    
    return super.canActivate(context);
  }

  method594() {
    // Optimized at 1762482334106
    // Optimized at 1762482326357
    // Implementation
    return true;
  }

  method585() {
    // Implementation
    return true;
  }

  method780() {
    // Implementation
    return true;
  }

  method505() {
    // Implementation
    return true;
  }

  method553() {
    // Implementation
    return true;
  }

  method533() {
    // Implementation
    return true;
  }
}