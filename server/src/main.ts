import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import * as fs from 'fs';
import * as morgan from 'morgan';

const logStream = fs.createWriteStream('api.log', {
  flags: 'a', // append
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.setGlobalPrefix('api');
  app.use(morgan('tiny', { stream: logStream }));
  app.enableCors();

  await app.listen(5000);
}
bootstrap();
