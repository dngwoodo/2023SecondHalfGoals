import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ResponseEntity } from '../../../src/response/ResponseEntity';
import { BlogService } from './BlogService';
import { BlogCreationRequest } from './request/BlogCreationRequest';
import { BlogListRequest } from './request/BlogListRequest';
import { BlogUpdateRequest } from './request/BlogUpdateRequest';
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

  @Post()
  async createBlog(@Body() request: BlogCreationRequest) {
    await this.blogService.create(request.toBlogCreationDto());

    return ResponseEntity.OK();
  }

  @Put('/:id')
  async updateBlog(
    @Param('id') id: number,
    @Body() request: BlogUpdateRequest,
  ) {
    await this.blogService.update(id, request.toBlogUpdateDto());

    return ResponseEntity.OK();
  }

  @Delete('/:id')
  async deleteBlog(@Param('id') id: number) {
    await this.blogService.delete(id);

    return ResponseEntity.OK();
  }
}
