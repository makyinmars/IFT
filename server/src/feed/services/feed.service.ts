import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateFeedDto } from './dto/create-feed.dto';
import { UpdateFeedDto } from './dto/update-feed.dto';
import { FeedEntity } from './entities/feed.entity';
import { Feed } from './interfaces/feed.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedEntity)
    private readonly feedRepository: Repository<FeedEntity>,
  ) {}

  async createFeed(createFeedDto: CreateFeedDto) {
    return this.feedRepository.save(createFeedDto);
  }

  async findAllFeeds(): Promise<Feed[]> {
    return this.feedRepository.find();
  }

  async findFeed(id: number): Promise<Feed> {
    return this.feedRepository.findOne(id);
  }

  async updateFeed(
    id: number,
    updateFeedDto: UpdateFeedDto,
  ): Promise<UpdateResult> {
    return this.feedRepository.update(id, updateFeedDto);
  }

  async deleteFeed(id: number): Promise<DeleteResult> {
    return this.feedRepository.delete(id);
  }
}
