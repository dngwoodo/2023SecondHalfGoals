import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { BlogEntity } from './BlogEntity';

@Module({
  imports: [MikroOrmModule.forFeature([BlogEntity])],
  exports: [MikroOrmModule],
})
export class BlogModule {}
