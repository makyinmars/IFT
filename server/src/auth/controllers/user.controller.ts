import {
  Controller,
  Post,
  UploadedFile,
  Param,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Res,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UpdateResult, DeleteResult } from 'typeorm';
import { JwtGuard } from '../guards/jwt.guard';
import {
  isFileExtensionSafe,
  removeFile,
  saveImageToStorage,
} from '../helpers/image-storage';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get()
  async findUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete('id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }

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
