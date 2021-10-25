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
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import path, { join } from 'path';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { v4 as uuidv4 } from 'uuid';
import {
  isFileExtensionSafe,
  removeFile,
  saveImageToStorage,
} from '../helpers/image-storage';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../guards/roles.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  // File storage

  @Roles(Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
  @Get()
  async findUsers(): Promise<User[]> {
    return await this.userService.findAllUsers();
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get(':id')
  async findUser(@Param('id') id: number): Promise<User> {
    return this.userService.findUserById(id);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.userService.updateUser(id, updateUserDto);
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Delete('id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.userService.deleteUser(id);
  }

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Post('upload')
  // @UseInterceptors(FileInterceptor('file', storage))
  // uploadImage(@UploadedFile() file: Express.Multer.File, @Request() req): any {
  //   const user: User = req.user;

  //   return this.userService.updateUserImageById(user.id, file.filename);
  // }

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Get('profile-image')
  // async findProfileImage(@Request() req, @Res() res): Promise<string> {
  //   const user: User = req.user;

  //   const imageName: string = await this.userService.findImageNameByUserId(
  //     user.id,
  //   );

  //   return res.sendFile(join(process.cwd(), 'uploads/profile' + imageName));
  // }
  @Roles(Role.USER, Role.ADMIN)
  @UseGuards(JwtGuard, RolesGuard)
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
