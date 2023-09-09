import { Injectable } from '@nestjs/common';
import { BlogRepository } from './BlogRepository';
import { BlogDto } from './dto/BlogListDto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async findList(limit: number, offset: number): Promise<[BlogDto[], number]> {
    const [blogs, totalCount] = await this.blogRepository.findList(
      limit,
      offset,
    );

    return [blogs.map(BlogDto.by), totalCount];
  }
}
