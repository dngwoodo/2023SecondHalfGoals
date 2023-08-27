import { Controller, Get } from "@nestjs/common";
import { BlogService } from "./BlogService";

@Controller('/blogs')
export class BlogController {
  constructor(private readonly blogService:BlogService) {}

  @Get()
  getBlogs() {
    return {
      blogs: []
    }
  }
}