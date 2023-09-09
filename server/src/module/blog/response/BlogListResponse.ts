import { BlogListDto } from '../dto/BlogListDto';
import { Exclude, Expose } from 'class-transformer';

export class BlogListResponse {
  @Exclude()
  private readonly _items: BlogListDto[];
  @Exclude()
  private readonly _totalCount: number;
  @Exclude()
  private readonly _totalPage: number;

  constructor(items: BlogListDto[], totalCount: number, totalPage: number) {
    this._items = items;
    this._totalCount = totalCount;
    this._totalPage = totalPage;
  }

  @Expose()
  get items() {
    return this._items;
  }

  @Expose()
  get totalPage() {
    return this._totalPage;
  }

  @Expose()
  get totalCount() {
    return this._totalCount;
  }
}
