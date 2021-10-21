import {
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Res,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { JwtGuard } from '../guards/jwt.guard';
import {
  isFileExtensionSafe,
  removeFile,
  saveImageToStorage,
} from '../helpers/image-storage';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): any {
    const fileName = file?.filename;

    if (!fileName) return { error: 'File must be a .png, jpg/jpeg' };

    const imageFolderPath = join(process.cwd(), 'images');

    const fullImagePath = join(imageFolderPath + '/' + file.filename);

    const isFileExtSafe = isFileExtensionSafe(fullImagePath);

    if (isFileExtSafe) {
      const userId = req.user.id;

      return this.userService.updateUserImageById(userId, fileName);
    }

    removeFile(fullImagePath);

    return { error: 'File content does not match extension' };
  }

  @UseGuards(JwtGuard)
  @Get('image')
  async findImage(@Request() req, @Res() res): Promise<string> {
    const userId = req.user.id;

    const imageName: string = await this.userService.findImageNameByUserId(
      userId,
    );

    return res.sendFile(imageName, { root: './images' });
  }
}
