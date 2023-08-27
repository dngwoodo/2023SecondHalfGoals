class User {}

export class BlogListDto {
  private readonly _id: number;
  private readonly _user: User;
  private readonly _title: string;
  private readonly _body: string;
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

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }

  get body() {
    return this._body;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  get user() {
    return this._user;
  }
}