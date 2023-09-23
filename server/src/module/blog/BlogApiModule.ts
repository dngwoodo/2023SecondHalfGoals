import { Module } from '@nestjs/common';
import { BlogController } from './BlogController';
import { BlogService } from './BlogService';
import { BlogRepository } from './BlogRepository';
import { BlogModule } from '@app/entity/domain/blog/BlogModule';
import { TransactionService } from 'src/transaction/TransactionService';

@Module({
  imports: [BlogModule],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository, TransactionService],
})
export class BlogApiModule {}
