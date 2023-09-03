import { Body, Controller, Get } from '@nestjs/common';
import { ResponseEntity } from 'src/response/ResponseEntity';
import { BlogService } from './BlogService';
import { BlogListRequest } from './request/BlogListRequest';

@Controller('/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs(@Body() request: BlogListRequest) {
    const data = await this.blogService.findList(
      request.pageNumber,
      request.pageSize,
      request.limit,
      request.offset,
    );

    return ResponseEntity.OK_WITH(data);
  }
}
