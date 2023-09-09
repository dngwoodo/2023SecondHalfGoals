import { Blog } from '@app/entity/domain/blog/Blog.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { LocalDateTime } from '@js-joda/core';
import { FilterQuery, FindOptions, QueryOrder } from '@mikro-orm/core';

@Injectable()
export class BlogRepository {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: EntityRepository<Blog>,
  ) {}

  async findOne(id: number): Promise<Blog | null> {
    return this.blogRepository.findOne({ id }); // {} <- where 절
  }

  async findList(limit: number, offset: number): Promise<[Blog[], number]> {
    const where: FilterQuery<Blog> = {
      deletedAt: null,
      createdAt: { $gte: LocalDateTime.now().minusMonths(2) },
    };

    const options: FindOptions<Blog> = {
      /**
       * NOTE
       * orderBy: 이 옵션은 결과를 정렬하는 데 사용됩니다.
       */
      orderBy: { id: QueryOrder.DESC },
      /**
       * NOTE
       * limit: 이 변수는 결과 집합에서 가져올 항목의 최대 수를 나타냅니다.
       */
      limit,
      /**
       * NOTE
       * offset: 이 변수는 결과 집합에서 시작 위치를 나타냅니다.
       */
      offset,
    };

    return this.blogRepository.findAndCount(where, options);
  }
}
``;
