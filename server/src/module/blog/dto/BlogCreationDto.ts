import { BlogEntity } from '@app/entity/domain/blog/BlogEntity';

export class BlogCreationDto {
  private readonly _title: string;
  private readonly _body: string;

  constructor(title: string, body: string) {
    this._title = title;
    this._body = body;
  }

  get title(): string {
    return this._title;
  }

  get body(): string {
    return this._body;
  }

  toBlogEntity() {
    return BlogEntity.create(this._title, this._body);
  }
}
