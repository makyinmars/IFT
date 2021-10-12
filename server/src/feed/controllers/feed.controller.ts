import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/feed.interface';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(
    @Body() createFeedPostDto: CreateFeedPostDto,
  ): Promise<CreateFeedPostDto> {
    return this.feedService.createPost(createFeedPostDto);
  }

  @Get()
  findAll(): Promise<FeedPost[]> {
    return this.feedService.findAllPosts();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FeedPost> {
    return this.feedService.findPost(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body()
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<UpdateResult> {
    return this.feedService.updatePost(id, updateFeedPostDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.feedService.deletePost(id);
  }
}
