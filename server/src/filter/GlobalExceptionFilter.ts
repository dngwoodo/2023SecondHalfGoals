import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { instanceToPlain } from 'class-transformer';
import { Request, Response } from 'express';
import { Logger } from 'src/logger/Logger';
import { ResponseEntity } from 'src/response/ResponseEntity';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: Error, host: ArgumentsHost): any {
    const http = host.switchToHttp();
    const request = http.getRequest<Request>();
    const response = http.getResponse<Response>();

    this.logger.error(this.getErrorLogMessageTemplate(request), exception);

    response
      .status(HttpStatus.INTERNAL_SERVER_ERROR)
      .json(instanceToPlain(ResponseEntity.ERROR()));
  }

  private getErrorLogMessageTemplate(request: Request): string {
    return [
      `API Exception: path=${request.url}`,
      Object.keys(request.body).length > 0
        ? `body=${JSON.stringify(request.body)}`
        : null,
      Object.keys(request.query).length > 0
        ? `query=${JSON.stringify(request.query)}`
        : null,
    ]
      .filter(Boolean)
      .join(' ');
  }
}
