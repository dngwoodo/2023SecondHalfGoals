import { Module } from '@nestjs/common';
import { BlogApiModule } from './module/blog/BlogApiModule';

@Module({
  imports: [BlogApiModule],
  controllers: [],
  providers: [],
})
export class AppApiModule {}
