import { Blog } from '@app/entity/domain/blog/Blog.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogRepository {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: EntityRepository<Blog>,
  ) {}

  async findOne(id: number): Promise<Blog | null> {
    return this.blogRepository.findOne({ id }); // {} <- where 절
  }
}
