import { BlogDto } from '../dto/BlogDto';
import { Exclude } from 'class-transformer';

export class BlogResponse {
  @Exclude()
  _blog: BlogDto | null;

  constructor(blog: BlogDto | null) {
    this._blog = blog;
  }
}
