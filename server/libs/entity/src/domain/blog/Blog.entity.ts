import { Entity, PrimaryKey, Property } from '@mikro-orm/core';

// Note: Entity is table!
// blog
@Entity()
export class Blog {
  @PrimaryKey()
  id: number;

  @Property()
  title: string;

  @Property()
  body: string;

  // NOTE: 컬럼, db 명은 스네이크 케이스를 사용한다.
  @Property()
  createdAt: Date;
}
