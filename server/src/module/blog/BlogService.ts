import { Injectable } from '@nestjs/common';
import { BlogRepository } from './BlogRepository';
import { BlogListResponse } from './response/BlogListResponse';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}
  async findList(
    pageNumber: number,
    pageSize: number,
    limit: number,
    offset: number,
  ): Promise<BlogListResponse> {
    return new BlogListResponse([], 0, 0);
  }
}
