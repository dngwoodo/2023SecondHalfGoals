import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { Trim } from '../../../utils/Trim';
import { BlogUpdateDto } from '../dto/BlogUpdateDto';

export class BlogUpdateRequest {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @Trim()
  @IsNotEmpty()
  @IsString()
  body: string;

  toBlogUpdateDto(): BlogUpdateDto {
    return new BlogUpdateDto(this.title, this.body);
  }
}
