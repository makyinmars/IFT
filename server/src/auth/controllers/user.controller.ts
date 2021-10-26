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
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { join } from 'path';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import {
  isFileExtensionSafe,
  removeFile,
  saveImageToStorage,
} from '../helpers/image-storage';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.interface';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../guards/roles.guard';
import { Observable, of } from 'rxjs';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private cloudinaryService: CloudinaryService,
  ) {}

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

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('profile-upload')
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<{ source: string }> {
    const image = await this.cloudinaryService.uploadImage(file);
    const user = req.user;

    if (user) {
      user.imagePath = image.secure_url;
    }

    return image.secure_url;
  }

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Get('profile-image/:image')
  // async findUserImage(@Param() image, @Request() req): Promise<string> {

  // }

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Post('profile-image')
  // @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  // uploadProfileImage(
  //   @UploadedFile() file: Express.Multer.File,
  //   @Request() req,
  // ): any {
  //   const fileName = file?.filename;

  //   if (!fileName) return { error: 'File must be a .png, jpg/jpeg' };

  //   const imageFolderPath = join(process.cwd(), 'images/profile-image/');

  //   const fullImagePath = join(imageFolderPath + '/' + file.filename);

  //   const isFileExtSafe = isFileExtensionSafe(fullImagePath);

  //   if (isFileExtSafe) {
  //     const userId = req.user.id;

  //     return this.userService.updateUserImageById(userId, fileName) && fileName;
  //   }

  //   removeFile(fullImagePath);

  //   return { error: 'File content does not match extension' };
  // }

  // @Roles(Role.USER, Role.ADMIN)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Get('profile-image/:image')
  // findProfileImage(@Param('image') image, @Res() res): Observable<any> {
  //   return of(
  //     res.sendFile(join(process.cwd(), 'images/profile-image/' + image)),
  //   );
  // }
}
