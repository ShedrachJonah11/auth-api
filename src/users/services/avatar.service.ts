import { Injectable } from '@nestjs/common';
import { FilesService } from '../../files/files.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../user.schema';

@Injectable()
export class AvatarService {
  constructor(
    private readonly filesService: FilesService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async uploadAvatar(userId: string, file: Express.Multer.File): Promise<string> {
    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!this.filesService.validateFileType(file, allowedTypes)) {
      throw new Error('Invalid image type. Allowed: JPEG, PNG, GIF, WebP');
    }

    // Validate file size (max 5MB)
    const maxSize = 5 * 1024 * 1024;
    if (!this.filesService.validateFileSize(file, maxSize)) {
      throw new Error('File size exceeds 5MB limit');
    }

    // Process and upload
    const filepath = await this.filesService.uploadFile(file, userId);

    // Update user avatar
    await this.userModel.updateOne(
      { _id: userId },
      { $set: { avatar: filepath } },
    );

    return filepath;
  }

  async deleteAvatar(userId: string): Promise<void> {
    const user = await this.userModel.findById(userId);
    if (user && (user as any).avatar) {
      await this.filesService.deleteFile((user as any).avatar);
      await this.userModel.updateOne(
        { _id: userId },
        { $unset: { avatar: 1 } },
      );
    }
  }

  async getAvatarUrl(userId: string): Promise<string | null> {
    const user = await this.userModel.findById(userId);
    return (user as any)?.avatar || null;
  }
}

