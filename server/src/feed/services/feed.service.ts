import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedPostEntity } from '../models/feed.entity';
import { FeedPost } from '../models/feed.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  async createPost(createFeedPostDto: CreateFeedPostDto) {
    return this.feedPostRepository.save(createFeedPostDto);
  }

  async findAllPosts(): Promise<FeedPost[]> {
    return this.feedPostRepository.find();
  }

  async findPost(id: number): Promise<FeedPost> {
    return this.feedPostRepository.findOne(id);
  }

  async updatePost(
    id: number,
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<UpdateResult> {
    return this.feedPostRepository.update(id, updateFeedPostDto);
  }

  async deletePost(id: number): Promise<DeleteResult> {
    return this.feedPostRepository.delete(id);
  }
}
