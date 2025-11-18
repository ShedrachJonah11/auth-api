import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiBearerAuth, ApiConsumes } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { FilesService } from './files.service';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@ApiTags('Files')
@Controller('files')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @CurrentUser() user: any,
  ) {
    const filepath = await this.filesService.uploadFile(file, user._id);
    return {
      success: true,
      message: 'File uploaded successfully',
      data: { filepath },
    };
  }

  @Delete(':filepath')
  @ApiOperation({ summary: 'Delete a file' })
  async deleteFile(@Param('filepath') filepath: string) {
    await this.filesService.deleteFile(filepath);
    return {
      success: true,
      message: 'File deleted successfully',
    };
  }
}

