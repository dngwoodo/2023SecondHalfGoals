import { Injectable } from '@nestjs/common';
import { BlogRepository } from './BlogRepository';
import { BlogListDto } from './dto/BlogListDto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async findList(
    limit: number,
    offset: number,
  ): Promise<[BlogListDto[], number]> {
    const [blogs, totalCount] = await this.blogRepository.findList(
      limit,
      offset,
    );

    return [blogs.map(BlogListDto.by), totalCount];
  }
}
