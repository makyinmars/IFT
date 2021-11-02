import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FeedModule } from './feed/feed.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { Cloudinary } from './cloudinary';
import config from '../ormconfig';
import { MulterModule } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from './core/all-exceptions.filter';

@Module({
  imports: [
    MulterModule.register({
      storage: memoryStorage(),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ...config, autoLoadEntities: true }),
    FeedModule,
    AuthModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Cloudinary,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
