import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BlogCreationDto } from '../dto/BlogCreationDto';
import { Trim } from '../../../utils/Trim';

export class BlogCreationRequest {
  @Trim()
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  title: string;

  @Trim()
  @IsString()
  @IsNotEmpty()
  body: string;

  toBlogCreationDto() {
    return new BlogCreationDto(this.title, this.body);
  }
}
