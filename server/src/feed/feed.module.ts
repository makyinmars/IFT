import { Module } from '@nestjs/common';
import { FeedService } from './feed.service';
import { FeedController } from './feed.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FeedEntity } from './entities/feed.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FeedEntity])],
  controllers: [FeedController],
  providers: [FeedService],
})
export class FeedModule {}
