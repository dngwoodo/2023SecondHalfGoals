import { BlogEntity } from '@app/entity/domain/blog/BlogEntity';
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

  /**
   * NOTE
   * 팩토리 메서드
   */
  static by(blog: BlogEntity) {
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

/**
 * NOTE: Before
 * updatedAt 이 현재 객체로 나오는 문제가 있음.
 */
// {
//   "statusCode": "OK",
//   "message": "",
//   "data": {
//     "items": [
//       {
//         "id": 1,
//         "title": "test-title",
//         "body": "test-body",
//         "updatedAt": {
//           "_date": {
//             "_year": 2023,
//             "_month": 9,
//             "_day": 9
//           },
//           "_time": {
//             "_hour": 16,
//             "_minute": 13,
//             "_second": 26,
//             "_nano": 102000000
//           }
//         }
//       }
//     ],
//     "totalPage": null,
//     "totalCount": 1
//   }
// }

/**
 * NOTE: After
 * LocalDateTime.toString() 을 이용해 해결
 */
// {
//   "statusCode": "OK",
//   "message": "",
//   "data": {
//     "items": [
//       {
//         "id": 1,
//         "title": "test-title",
//         "body": "test-body",
//         "updatedAt": "2023-09-09T16:13:26.102"
//       }
//     ],
//     "totalPage": null,
//     "totalCount": 1
//   }
// }
