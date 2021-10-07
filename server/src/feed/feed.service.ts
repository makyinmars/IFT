import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { FeedDto } from './dto/feed.dto';
import { FeedEntity } from './entities/feed.entity';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  async createFeed(feedDto: FeedDto): Promise<FeedDto> {
    return this.feedRepository.save(feedDto);
  }

  async findAllFeeds(): Promise<FeedDto[]> {
    return this.feedRepository.find();
  }

  async findFeed(id: number): Promise<FeedDto> {
    return this.feedRepository.findOne(id);
  }

  async updateFeed(id: number, feedDto: FeedDto): Promise<UpdateResult> {
    return this.feedRepository.update(id, feedDto);
  }

  async deleteFeed(id: number): Promise<DeleteResult> {
    return this.feedRepository.delete(id);
  }
}
