export interface UserPublicDto {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
  isEmailVerified: boolean;
  isTwoFactorEnabled: boolean;
  createdAt?: Date;
}
