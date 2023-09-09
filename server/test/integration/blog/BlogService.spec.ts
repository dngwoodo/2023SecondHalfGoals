import { BlogModule } from '@app/entity/domain/blog/BlogModule';
import { MikroORM } from '@mikro-orm/core';
import config from '@app/entity/config/config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { BlogFactory } from '../../../libs/entity/test/factory/BlogFactory';
import { BlogRepository } from '../../../src/module/blog/BlogRepository';
import { BlogService } from '../../../src/module/blog/BlogService';
import { BlogDto } from '../../../src/module/blog/dto/BlogListDto';

describe('BlogService', () => {
  let blogFactory: BlogFactory;
  let orm: MikroORM;
  let blogService: BlogService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      /**
       * NOTE
       * 나중에 config 는 테스트 용을 따로 만들어줘야 한다.
       */
      imports: [MikroOrmModule.forRoot(config), BlogModule],
      providers: [BlogService, BlogRepository],
    }).compile();

    /**
     * NOTE
     * orm = MikroORM
     */
    orm = module.get<MikroORM>(MikroORM);
    /**
     * NOTE
     * em = entity manager
     */
    blogFactory = new BlogFactory(orm.em);
    blogService = module.get<BlogService>(BlogService);

    /**
     * NOTE
     * DB 스키마 초기화(새로고침)
     */
    await orm.getSchemaGenerator().refreshDatabase();
  });

  afterAll(async () => await orm.close(true));

  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  describe('findList', () => {
    /**
     * NOTE:
     * 정말 필요한 경우가 아니라면 forEach 와 같이 순회하는 테스트는 작성하지 않는다.
     * TODO:
     * 이건 한번 이야기해보면 좋을 것 같음
     */
    it('블로그 데이터와 블로그의 갯수를 반환한다.', async () => {
      // given
      const LIMIT = 10;
      const OFFSET = 0;
      const blog = await blogFactory.createOne({
        title: 'test-title',
        body: 'test-body',
      });

      // when
      const [blogs, totalCount] = await blogService.findList(LIMIT, OFFSET);

      // then
      expect(blogs[0]).toEqual(BlogDto.by(blog));
      expect(totalCount).toBe(1);
    });
  });
});

/**
 * e2e 와 관련된 논의
 * 사용자의 input -> output 까지의 모든 과정을 말한다.
 * api 로 따지면 client request -> server response 까지의 과정을 말한다.
 * 그래서 controller 이기 때문에 이것이 e2e 테스트이다.
 * 그러나 모듈을 모킹해서 테스트하고 있는데 이것이 e2e 인가 ?
 * 사실상 근데 서비스랑 쿼리 레포지토리는 각각의 통합 테스트를 짜고 있다.
 * 이미 통합 테스트를 짰는데 중복되는 테스트를 또 짜는 것이다.
 * 그렇기 때문에 service, repository 단을 모킹해서 테스트한다.
 * 가장 큰 이유는 테스트 속도 때문에 모킹을 하는 것이다!
 */
