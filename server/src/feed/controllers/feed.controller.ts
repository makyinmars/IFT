import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Request,
  Query,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/feed.interface';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.enum';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UserService } from 'src/auth/services/user.service';

@Controller('feed')
export class FeedController {
  constructor(
    private readonly feedService: FeedService,
    private readonly cloudinaryService: CloudinaryService,
    private readonly userService: UserService,
  ) {}

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  @UseGuards(JwtGuard)
  // @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createFeedPostDto: CreateFeedPostDto,
    // @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<CreateFeedPostDto> {
    // const image = await this.cloudinaryService.uploadImage(file);

    // const imagePath = image.secure_url;

    // createFeedPostDto.imagePath = imagePath;

    return await this.feedService.createPost(req.user, createFeedPostDto);
  }

  // Using pagination instead
  // @Get()
  // async findAll(): Promise<FeedPost[]> {
  //   return await this.feedService.findAllPosts();
  // }

  @Get()
  async findSelected(
    @Query('take') take: number,
    @Query('skip') skip: number,
  ): Promise<FeedPost[]> {
    // If take is 20 posts by default
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @UseGuards(JwtGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FeedPost> {
    return await this.feedService.findPostById(id);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  // @UseInterceptors(FileInterceptor('file'))
  @Put(':id')
  async update(
    @Param('id') id: number,
    // @UploadedFile() file: Express.Multer.File,
    @Body()
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<UpdateResult> {
    // const image = await this.cloudinaryService.uploadImage(file);

    // updateFeedPostDto.imagePath = image.secure_url;
    return await this.feedService.updatePost(id, updateFeedPostDto);
  }

  @UseGuards(JwtGuard, IsCreatorGuard)
  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.feedService.deletePost(id);
  }

  @UseGuards(JwtGuard)
  @UseInterceptors(FileInterceptor('file'))
  @Post('post-upload')
  async uploadPostImage(
    @UploadedFile() file: Express.Multer.File,
    @Request() req,
  ): Promise<string> {
    const image = await this.cloudinaryService.uploadImage(file);

    const postId = req.body.postId;

    await this.feedService.updatePost(postId, { imagePath: image.url });

    return image.secure_url;
  }

  @UseGuards(JwtGuard)
  @Get('post-upload/:id')
  async findPostImage(@Param('id') id: number): Promise<string> {
    const feed = await this.feedService.findPostById(id);

    return feed.imagePath;
  }
}
