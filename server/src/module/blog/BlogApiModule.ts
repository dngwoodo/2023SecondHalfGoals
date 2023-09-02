import { Module } from '@nestjs/common';
import { BlogController } from './BlogController';
import { BlogService } from './BlogService';
import { BlogRepository } from './BlogRepository';
import { BlogModule } from '@app/entity/domain/blog/BlogModule';

@Module({
  imports: [BlogModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogApiModule {}
