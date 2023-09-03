import { Entity, PrimaryKey, Property } from '@mikro-orm/core';
@Entity()
export class Blog {
  /**
   * NOTE
   * primary key 는 auto-generate 해준다.
   */
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  body: string;

  /**
   * NOTE
   * 컬럼, db 명은 스네이크 케이스를 사용한다.
   * 생성 될 때 onCreate 를 통해 auto-generate 된다.
   */
  @Property({ onCreate: () => new Date() })
  createdAt: Date;

  static create(title: string, body: string) {
    const blog = new Blog();

    blog.title = title;
    blog.body = body;

    return blog;
  }
}
