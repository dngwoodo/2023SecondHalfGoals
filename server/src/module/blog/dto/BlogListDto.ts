import { Exclude, Expose } from "class-transformer";

class User {}

export class BlogListDto {
  @Exclude()
  private readonly _id: number;
  @Exclude()
  private readonly _user: User;
  @Exclude()
  private readonly _title: string;
  @Exclude()
  private readonly _body: string;
  @Exclude()
  private readonly _updatedAt: Date;

  constructor(
    id: number,
    user: User,
    title: string,
    body: string,
    updatedAt: Date,
  ) {
    this._id = id;
    this._user = user;
    this._title = title;
    this._body = body;
    this._updatedAt = updatedAt;
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
    return this._updatedAt;
  }

  @Expose()
  get user() {
    return this._user;
  }
}
