import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IpWhitelist, IpWhitelistDocument } from '../schemas/ip-whitelist.schema';

@Injectable()
export class IpWhitelistGuard implements CanActivate {
  constructor(
    @InjectModel(IpWhitelist.name) private ipWhitelistModel: Model<IpWhitelistDocument>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const ipAddress = request.ip || request.connection.remoteAddress;

    if (!user || !ipAddress) {
      return true; // Let other guards handle authentication
    }

    const whitelist = await this.ipWhitelistModel.findOne({
      userId: user.sub || user._id,
      ipAddress,
      isActive: true,
    });

    if (!whitelist) {
      throw new ForbiddenException({
        message: 'IP address not whitelisted',
        errorCode: 'IP_NOT_WHITELISTED',
      });
    }

    return true;
  }
}

