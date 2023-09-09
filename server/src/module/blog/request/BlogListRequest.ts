import { Exclude, Expose } from 'class-transformer';

export class BlogListRequest {
  @Exclude()
  private static DEFAULT_PAGE_NUMBER = 1;
  @Exclude()
  private static DEFAULT_PAGE_SIZE = 10;

  @Expose()
  get pageNumber(): number {
    if (!this.pageNumber) {
      return BlogListRequest.DEFAULT_PAGE_NUMBER;
    }

    return this.pageNumber;
  }

  @Expose()
  get pageSize(): number {
    if (!this.pageSize) {
      return BlogListRequest.DEFAULT_PAGE_SIZE;
    }

    return this.pageSize;
  }

  @Expose()
  get offset(): number {
    const pageNumber = this.pageNumber || BlogListRequest.DEFAULT_PAGE_NUMBER;

    return (pageNumber - 1) * this.limit;
  }

  @Expose()
  get limit(): number {
    if (!this.pageSize) {
      return BlogListRequest.DEFAULT_PAGE_SIZE;
    }

    return this.pageSize;
  }
}
