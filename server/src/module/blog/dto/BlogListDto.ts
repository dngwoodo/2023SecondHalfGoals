import { Blog } from '@app/entity/domain/blog/Blog.entity';
import { LocalDateTime } from '@js-joda/core';
import { Exclude, Expose } from 'class-transformer';

export class BlogDto {
  @Exclude()
  private readonly _id: number;

  @Exclude()
  private readonly _title: string;
  @Exclude()
  private readonly _body: string;
  @Exclude()
  private readonly _updatedAt: LocalDateTime;

  constructor(
    id: number,
    title: string,
    body: string,
    updatedAt: LocalDateTime,
  ) {
    this._id = id;
    this._title = title;
    this._body = body;
    this._updatedAt = updatedAt;
  }

  static by(blog: Blog) {
    return new BlogDto(blog.id, blog.title, blog.body, blog.updatedAt);
  }

  @Expose()
  get id() {
    return this._id;
  }

  @Expose()
  get title() {
    return this._title;
  }

  @Expose()
  get body() {
    return this._body;
  }

  @Expose()
  get updatedAt() {
    return this._updatedAt.toString();
  }
}
