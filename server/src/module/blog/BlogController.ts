import { Body, Controller, Get, Param } from '@nestjs/common';
import { ResponseEntity } from 'src/response/ResponseEntity';
import { BlogService } from './BlogService';
import { BlogListRequest } from './request/BlogListRequest';
import { BlogListResponse } from './response/BlogListResponse';
import { BlogResponse } from './response/BlogResponse';

@Controller('/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs(@Body() request: BlogListRequest) {
    const [blogs, totalCount] = await this.blogService.findList(
      request.limit,
      request.offset,
    );

    return ResponseEntity.OK_WITH(
      new BlogListResponse(
        blogs,
        totalCount,
        Math.ceil(totalCount / request.limit),
      ),
    );
  }

  @Get('/:id')
  async getBlog(@Param('id') id: number) {
    const blog = await this.blogService.findOne(id);

    return ResponseEntity.OK_WITH(new BlogResponse(blog));
  }
}
