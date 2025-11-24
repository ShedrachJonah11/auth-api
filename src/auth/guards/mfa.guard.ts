import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { TwoFactorService } from '../services/two-factor.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../../users/user.schema';

@Injectable()
export class MfaGuard implements CanActivate {
  constructor(
    private readonly twoFactorService: TwoFactorService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const token = request.body?.token || request.headers['x-mfa-token'];

    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const dbUser = await this.userModel.findById(user.sub || user._id);
    if (!dbUser || !dbUser.isTwoFactorEnabled) {
      return true; // MFA not enabled, allow
    }

    if (!token) {
      throw new UnauthorizedException({
        message: 'MFA token required',
        errorCode: 'MFA_TOKEN_REQUIRED',
      });
    }

    if (!dbUser.twoFactorSecret) {
      throw new UnauthorizedException('MFA not properly configured');
    }

    const isValid = this.twoFactorService.verifyToken(dbUser.twoFactorSecret, token);
    if (!isValid) {
      throw new UnauthorizedException({
        message: 'Invalid MFA token',
        errorCode: 'INVALID_MFA_TOKEN',
      });
    }

    return true;
  }
}

