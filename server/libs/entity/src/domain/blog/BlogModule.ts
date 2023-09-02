import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { Blog } from './Blog.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Blog])],
  exports: [MikroOrmModule],
})
export class BlogModule {}
