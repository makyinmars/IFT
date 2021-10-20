import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedPostEntity } from '../models/feed.entity';
import { FeedPost } from '../models/feed.interface';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(
    user: User,
    createFeedPostDto: CreateFeedPostDto,
  ): Promise<CreateFeedPostDto & FeedPostEntity> {
    createFeedPostDto.author = user;

    return this.feedPostRepository.save(createFeedPostDto);
  }

  // Using pagination instead
  // findAllPosts(): Promise<FeedPost[]> {
  //   return this.feedPostRepository.find();
  // }

  async findPosts(take: number, skip: number): Promise<FeedPost[]> {
    const posts = await this.feedPostRepository.findAndCount({ take, skip });
    return <FeedPost[]>posts;
  }

  findPostById(id: number): Promise<FeedPost> {
    return this.feedPostRepository.findOne(id);
  }

  updatePost(
    id: number,
    updateFeedPostDto: UpdateFeedPostDto,
  ): Promise<UpdateResult> {
    return this.feedPostRepository.update(id, updateFeedPostDto);
  }

  deletePost(id: number): Promise<DeleteResult> {
    return this.feedPostRepository.delete(id);
  }
}
