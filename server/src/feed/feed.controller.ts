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
import { FeedDto } from './dto/feed.dto';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() feedDto: FeedDto): Promise<FeedDto> {
    return this.feedService.createFeed(feedDto);
  }

  @Get()
  findAll(): Promise<FeedDto[]> {
    return this.feedService.findAllFeeds();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<FeedDto> {
    return this.feedService.findFeed(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(
    @Param('id') id: number,
    @Body()
    feedDto: FeedDto,
  ): Promise<UpdateResult> {
    return this.feedService.updateFeed(id, feedDto);
  }

  @Delete(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.feedService.deleteFeed(id);
  }
}
