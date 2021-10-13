import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CreateFeedPostDto } from '../models/create-feed.dto';
import { UpdateFeedPostDto } from '../models/update-feed.dto';
import { FeedPostEntity } from '../models/feed.entity';
import { FeedPost } from '../models/feed.interface';
import { from, Observable } from 'rxjs';
import { User } from 'src/auth/models/user.interface';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity>,
  ) {}

  createPost(user: User, createFeedPostDto: CreateFeedPostDto) {
    createFeedPostDto.author = user;

    return this.feedPostRepository.save(createFeedPostDto);
  }

  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  findPost(id: number): Observable<FeedPost> {
    return from(this.feedPostRepository.findOne(id));
  }

  updatePost(
    id: number,
    updateFeedPostDto: UpdateFeedPostDto,
  ): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, updateFeedPostDto));
  }

  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }
}
