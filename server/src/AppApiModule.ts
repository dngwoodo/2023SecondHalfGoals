import { Module } from '@nestjs/common';
import { BlogApiModule } from './module/blog/BlogApiModule';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '@app/entity/config/config';
import { LoggerModule } from './logger/LoggerModule';

@Module({
  imports: [
    LoggerModule.register('api'),
    MikroOrmModule.forRoot(config),
    BlogApiModule,
  ],
  providers: [],
  controllers: [],
})
export class AppApiModule {}
