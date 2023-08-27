import { Module } from "@nestjs/common";
import { BlogController } from "./BlogController";
import { BlogService } from "./BlogService";
import { BlogRepository } from "./BlogRepository";

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService, BlogRepository],
})
export class BlogApiModule {}