import { Injectable } from '@nestjs/common';
import { DomainException } from '../../../src/filter/DomainExeption';
import { TransactionService } from '../../transaction/TransactionService';
import { BlogRepository } from './BlogRepository';
import { BlogCreationDto } from './dto/BlogCreationDto';
import { BlogDto } from './dto/BlogDto';
import { BlogUpdateDto } from './dto/BlogUpdateDto';

@Injectable()
export class BlogService {
  constructor(
    private readonly blogRepository: BlogRepository,
    private readonly transactionService: TransactionService,
  ) {}

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

  async findOne(id: number): Promise<BlogDto | null> {
    const blog = await this.blogRepository.findOne(id);

    /**
     * NOTE
     * 각 레이어에 맞는 예외 처리를 해줘야 한다.
     * 1. Controller:  클라이언트의 요청을 처리하고 해당 요청에 대한 응답을 반환하는 역할
     * 2. Service: 비즈니스 로직을 구현하고 데이터 처리 및 조작을 수행하는 역할
     * 3. Repository: 데이터베이스와 상호 작용하기 위한 역할
     * 해당 예외는 가능한 가장 먼 곳에서 처리해줘야 한다. 이유는 아래와 같다.
     * 1. 가장 가까운 곳에서 처리를 해주게 되면 findOne 메서드를 사용하는 모든 곳에서 예외 처리를 해줘야 한다.
     * 2. 반면 글로벌 핸들러 혹은 미들웨어 등 최상위 계층에서 예외를 처리하면 코드의 가독성과 재사용성에 도움이 된다.
     * 3. 가독성, 재사용성, 통일성 에 장점을 가질 수 있다.
     * @see https://jojoldu.tistory.com/734
     */
    if (!blog) {
      throw DomainException.NotFound({
        message: '블로그 글이 존재하지 않습니다',
      });
    }

    return BlogDto.by(blog);
  }

  async create(blogCreationDto: BlogCreationDto) {
    await this.transactionService.transactional(async (manager) => {
      manager.persistAndFlush(blogCreationDto.toBlogEntity());
    });
  }

  async update(blogId: number, blogUpdateDto: BlogUpdateDto) {
    const blog = await this.blogRepository.findOne(blogId);

    if (!blog) {
      throw DomainException.NotFound({
        message: '블로그 글이 존재하지 않습니다',
      });
    }

    // TODO: blogUpdateDto 내부 메서드에서 처리해도 괜찮은 방법일까?
    blog.update(blogUpdateDto.title, blogUpdateDto.body);

    await this.transactionService.transactional(async (manager) => {
      manager.persist(blog);
    });
  }

  async delete(blogId: number) {
    const blog = await this.blogRepository.findOne(blogId);

    if (!blog) {
      throw DomainException.NotFound({
        message: '블로그 글이 존재하지 않습니다',
      });
    }

    blog.delete();

    await this.transactionService.transactional(async (manager) => {
      manager.persist(blog);
    });
  }
}
