import config from '@app/entity/config/config';
import { BlogModule } from '@app/entity/domain/blog/BlogModule';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Test } from '@nestjs/testing';
import { BlogFactory } from '../../../libs/entity/test/factory/BlogFactory';
import { BlogRepository } from '../../../src/module/blog/BlogRepository';

describe('BlogRepository', () => {
  let blogFactory: BlogFactory;
  let orm: MikroORM;
  let blogRepository: BlogRepository;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      /**
       * NOTE
       * 나중에 config 는 테스트 용을 따로 만들어줘야 한다.
       */
      imports: [MikroOrmModule.forRoot(config), BlogModule],
      providers: [BlogRepository],
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
    blogRepository = module.get<BlogRepository>(BlogRepository);

    /**
     * NOTE
     * DB 스키마 초기화(새로고침)
     */
    await orm.getSchemaGenerator().refreshDatabase();
  });

  /**
   * NOTE
   * DB 에 data 초기화
   */
  beforeEach(async () => await orm.getSchemaGenerator().clearDatabase());

  afterAll(async () => await orm.close(true));

  describe('findOne', () => {
    it('해당 id 에 맞는 blog 를 찾아서 반환한다.', async () => {
      // given
      const blog = await blogFactory.createOne({
        title: 'test-title',
        body: 'test-body',
      });

      // when
      const result = await blogRepository.findOne(blog.id);

      // then
      // console.log('result.createdAt', result.createdAt);
      // result.createdAt LocalDateTime {
      //   _date: LocalDate { _year: 2023, _month: 9, _day: 9 },
      //   _time: LocalTime { _hour: 16, _minute: 13, _second: 26, _nano: 102000000 }
      // }
      expect(result.id).toBe(blog.id);
    });
  });
});
