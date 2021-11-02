import {
  Controller,
  Post,
  UploadedFile,
  Param,
  UseGuards,
  UseInterceptors,
  Request,
  Get,
  Put,
  Body,
  Delete,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateResult, DeleteResult } from 'typeorm';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { JwtGuard } from '../guards/jwt.guard';
import { UpdateUserDto } from '../models/update-user.dto';
import { User } from '../models/user.class';
import { UserService } from '../services/user.service';
import { RolesGuard } from '../guards/roles.guard';
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
  ): Promise<User> {
    const user = await this.userService.findUserById(id);

    if (user) {
      updateUserDto.id = updateUserDto.id || user.id;
      updateUserDto.firstName = updateUserDto.firstName || user.firstName;
      updateUserDto.lastName = updateUserDto.lastName || user.lastName;
      updateUserDto.imagePath = user.imagePath;
      updateUserDto.email = updateUserDto.email || user.email;
      // updateUserDto.password = updateUserDto.password || user.password;
      updateUserDto.role = updateUserDto.role || user.role;
    }

    await this.userService.updateUser(id, updateUserDto);

    return updateUserDto;
  }

  // TODO: Fix
  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  // @Delete('id')
  // async delete(@Param('id') id: number): Promise<DeleteResult> {
  //   return await this.userService.deleteUser(id);
  // }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('profile-upload')
  async uploadUserImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<{ source: string }> {
    const image = await this.cloudinaryService.uploadImage(file);
    const user = req.user;

    await this.userService.updateUser(user.id, { imagePath: image.url });

    return image.secure_url;
  }

  @Roles(Role.ADMIN, Role.USER)
  @UseGuards(JwtGuard, RolesGuard)
  @Get('profile-upload/:id')
  async findUserImage(@Param('id') id: number): Promise<string> {
    const user = await this.userService.findUserById(id);

    return user.imagePath;
  }
}
