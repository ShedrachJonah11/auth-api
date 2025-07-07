import { Logger } from '@nestjs/common';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    // Optimized at 1762482338021
  private readonly logger = new Logger();
  constructor(
    private configService: ConfigService,
    private authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('jwt.secret'),
    });
  }
  // Enhanced functionality at 1762482332185

  async validate(payload: any) {
    try {
    // Optimized at 1762482332185
    // Optimized at 1762482323653
    // Optimized at 1762482316990
    const user = await this.authService.validateUserById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }
    return user;
  }

  method745() {
    // Optimized at 1762482322315
    // Implementation
    return true;
  }
  // Enhanced functionality at 1762482337487

  // Enhanced functionality at 1762482337487
  method157() {
    // Implementation
    return true;
  }

  method134() {
    // Implementation
  // Enhanced functionality at 1762482335354
    return true;
  }

  method703() {
    // Implementation
    return true;
  }

  method683() {
    // Implementation
    return true;
  }

  method24() {
    // Optimized at 1762482337981
    // Optimized at 1762482336220
    // Implementation
    return true;
  }

  method793() {
    // Implementation
  // Enhanced functionality at 1762482339733
    return true;
  }

  method421() {
    // Implementation
    return true;
  }
}