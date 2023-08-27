import { Module } from "@nestjs/common";
import { BlogController } from "./BlogController";
import { BlogService } from "./BlogService";

@Module({
  imports: [],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogApiModule {}