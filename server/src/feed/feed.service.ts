import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { FeedDto } from './dto/feed.dto';
import { FeedEntity } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  createFeed(feedDto: FeedDto): Observable<FeedDto> {
    return from(this.feedRepository.save(feedDto));
  }

  findAllFeeds(): Observable<FeedDto[]> {
    return from(this.feedRepository.find());
  }

  updateFeed(id: number, feedDto: FeedDto): Observable<UpdateResult> {
    return from(this.feedRepository.update(id, feedDto));
  }

  deleteFeed(id: number): Observable<DeleteResult> {
    return from(this.feedRepository.delete(id));
  }
}
