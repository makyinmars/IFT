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
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedService } from '../services/feed.service';
import { FeedPost } from '../models/feed.interface';
import { from, Observable } from 'rxjs';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @UseGuards(JwtGuard)
  @Post()
  create(
    @Body() createFeedPostDto: CreateFeedPostDto,
    @Request() req,
  ): Observable<CreateFeedPostDto> {
    return from(this.feedService.createPost(req.user, createFeedPostDto));
  }

  @Get()
  findAll(): Observable<FeedPost[]> {
    return from(this.feedService.findAllPosts());
  }

  @Get(':id')
  findOne(@Param('id') id: number): Observable<FeedPost> {
    return from(this.feedService.findPost(id));
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    updateFeedPostDto: UpdateFeedPostDto,
  ): Observable<UpdateResult> {
    return from(this.feedService.updatePost(id, updateFeedPostDto));
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return from(this.feedService.deletePost(id));
  }
}
