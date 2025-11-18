import { Injectable, BadRequestException } from '@nestjs/common';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join } from 'path';
import { existsSync } from 'fs';

@Injectable()
export class FilesService {
  private readonly uploadPath = process.env.UPLOAD_PATH || './uploads';

  async uploadFile(file: Express.Multer.File, userId: string): Promise<string> {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    const userDir = join(this.uploadPath, userId);
    if (!existsSync(userDir)) {
      await mkdir(userDir, { recursive: true });
    }

    const filename = `${Date.now()}_${file.originalname}`;
    const filepath = join(userDir, filename);

    await writeFile(filepath, file.buffer);

    return `/uploads/${userId}/${filename}`;
  }

  async deleteFile(filepath: string): Promise<void> {
    const fullPath = join(process.cwd(), filepath);
    if (existsSync(fullPath)) {
      await unlink(fullPath);
    }
  }

  getFileSize(file: Express.Multer.File): number {
    return file.size;
  }

  validateFileType(file: Express.Multer.File, allowedTypes: string[]): boolean {
    return allowedTypes.includes(file.mimetype);
  }

  validateFileSize(file: Express.Multer.File, maxSize: number): boolean {
    return file.size <= maxSize;
  }
}

