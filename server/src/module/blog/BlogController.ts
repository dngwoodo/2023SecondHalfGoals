import { Body, Controller, Get } from '@nestjs/common';
import { ResponseEntity } from 'src/response/ResponseEntity';
import { BlogService } from './BlogService';
import { BlogListRequest } from './request/BlogListRequest';
import { BlogListResponse } from './response/BlogListResponse';

@Controller('/blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Get()
  async getBlogs(@Body() request: BlogListRequest) {
    const [blogs, totalCount] = await this.blogService.findList(
      request.limit,
      request.offset,
    );

    return ResponseEntity.OK_WITH(
      new BlogListResponse(
        blogs,
        totalCount,
        Math.ceil(totalCount / request.limit),
      ),
    );
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
