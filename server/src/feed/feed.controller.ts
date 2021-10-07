import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { DeleteResult, UpdateResult } from 'typeorm';
import { FeedDto } from './dto/feed.dto';
import { FeedService } from './feed.service';

@Controller('feed')
export class FeedController {
  constructor(private readonly feedService: FeedService) {}

  @Post()
  create(@Body() feedDto: FeedDto): Observable<FeedDto> {
    return this.feedService.createFeed(feedDto);
  }

  @Get()
  findAll(): Observable<FeedDto[]> {
    return this.feedService.findAllFeeds();
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body()
    feedDto: FeedDto,
  ): Observable<UpdateResult> {
    return this.feedService.updateFeed(id, feedDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number): Observable<DeleteResult> {
    return this.feedService.deleteFeed(id);
  }
}
