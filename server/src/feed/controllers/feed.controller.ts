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

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  // @Roles(Role.ADMIN, Role.USER)
  // @UseGuards(JwtGuard, RolesGuard)
  @UseGuards(JwtGuard)
  @Post()
  async create(
    @Body() createFeedPostDto: CreateFeedPostDto,
    @Request() req,
  ): Promise<CreateFeedPostDto> {
    return await this.feedService.createPost(req.user, createFeedPostDto);
  }

  // Using pagination instead
  // @Get()
  // async findAll(): Promise<FeedPost[]> {
  //   return await this.feedService.findAllPosts();
  // }

  @Get()
  async findSelected(
    @Query('take') take = 1,
    @Query('skip') skip = 1,
  ): Promise<FeedPost[]> {
    // If take is 20 posts by default
    take = take > 20 ? 20 : take;
    return this.feedService.findPosts(take, skip);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<FeedPost> {
    return await this.feedService.findPostById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body()
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<UpdateResult> {
    return await this.feedService.updatePost(id, updateFeedPostDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return await this.feedService.deletePost(id);
  }
}
