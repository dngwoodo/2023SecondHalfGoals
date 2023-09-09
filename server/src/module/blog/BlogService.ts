import { Injectable } from '@nestjs/common';
import { BlogRepository } from './BlogRepository';
import { BlogDto } from './dto/BlogDto';

@Injectable()
export class BlogService {
  constructor(private readonly blogRepository: BlogRepository) {}

  async findList(limit: number, offset: number): Promise<[BlogDto[], number]> {
    const [blogs, totalCount] = await this.blogRepository.findList(
      limit,
      offset,
    );

    /**
     * NOTE
     * BlogDto.by 는 BlogDto.ts 에서 정의한 팩토리 메서드이다.
     * 팩토리 메서드는 객체를 생성하는 메서드이다.
     * 팩토리 메서드는 객체를 생성하는 로직을 캡슐화한다.
     * 팩토리 메서드는 객체를 생성하는 로직을 변경할 때 한 곳만 수정하면 된다.
     * 팩토리 메서드는 객체를 생성하는 로직을 재사용할 수 있다.
     * 팩토리 메서드는 객체를 생성하는 로직을 테스트하기 쉽다.
     * 팩토리 메서드는 객체를 생성하는 로직을 확장하기 쉽다.
     * 팩토리 메서드는 객체를 생성하는 로직을 분리할 수 있다.
     */
    return [blogs.map(BlogDto.by), totalCount];
  }
}
