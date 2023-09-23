import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { BlogCreationDto } from '../dto/BlogCreationDto';

function Trim() {
  return Transform(({ value }) =>
    typeof value === 'string' ? value.trim() : value,
  );
}

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
