import { Blog } from '@app/entity/domain/blog/Blog.entity';
import { Factory, faker } from '@mikro-orm/seeder';

// db 테스트 데이터를 만들 때 사용 하는 것
export class BlogFactory extends Factory<Blog> {
  model = Blog;

  static createEntity(entity?: Partial<Blog>): Blog {
    return Object.assign(new Blog(), {
      title: faker.datatype.string(),
      body: faker.datatype.string(),
      ...entity,
    } as Blog);
  }

  definition(): Partial<Blog> {
    return BlogFactory.createEntity();
  }
}
