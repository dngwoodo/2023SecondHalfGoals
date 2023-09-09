import { BlogEntity } from '@app/entity/domain/blog/BlogEntity';
import { Factory, faker } from '@mikro-orm/seeder';

// db 테스트 데이터를 만들 때 사용 하는 것
export class BlogFactory extends Factory<BlogEntity> {
  model = BlogEntity;

  static createEntity(entity?: Partial<BlogEntity>): BlogEntity {
    return Object.assign(new BlogEntity(), {
      title: faker.datatype.string(),
      body: faker.datatype.string(),
      ...entity,
    } as BlogEntity);
  }

  definition(): Partial<BlogEntity> {
    return BlogFactory.createEntity();
  }
}
