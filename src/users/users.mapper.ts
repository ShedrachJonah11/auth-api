import { UserDocument } from './user.schema';
import { UserPublicDto } from './dto/user-public.dto';

export function toPublicUser(user: UserDocument): UserPublicDto {
  return {
    id: String(user._id),
    email: user.email,
    name: user.name,
    role: user.role,
    avatar: user.avatar,
    isEmailVerified: user.isEmailVerified,
    isTwoFactorEnabled: user.isTwoFactorEnabled,
    createdAt: user.createdAt,
  };
}
