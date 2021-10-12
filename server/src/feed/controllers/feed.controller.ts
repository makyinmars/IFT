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

import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedService } from './feed.service';
import { Feed } from './interfaces/feed.interface';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() createFeedDto: CreateFeedDto): Promise<CreateFeedDto> {
    return this.feedService.createFeed(createFeedDto);
  }

  @Get()
  findAll(): Promise<Feed[]> {
    return this.feedService.findAllFeeds();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Feed> {
    return this.feedService.findFeed(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body()
    updateFeedDto: UpdateFeedDto,
  ): Promise<UpdateResult> {
    return this.feedService.updateFeed(id, updateFeedDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.feedService.deleteFeed(id);
  }
}
