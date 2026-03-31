import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { envString } from '../../common/config/env';
import { DEFAULT_REFRESH_EXPIRES_IN } from '../../common/constants';
import { JwtPayload } from '../../common/types';
import { UserDocument } from '../../users/user.schema';

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  signAccess(user: UserDocument): string {
    return this.jwtService.sign(this.payloadFor(user));
  }

  signRefresh(user: UserDocument): string {
    return this.jwtService.sign(this.payloadFor(user), {
      expiresIn: envString('JWT_REFRESH_EXPIRES_IN', DEFAULT_REFRESH_EXPIRES_IN),
    });
  }

  verify(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token);
  }

  private payloadFor(user: UserDocument): JwtPayload {
    return {
      sub: String(user._id),
      email: user.email,
      role: user.role,
    };
  }
}
