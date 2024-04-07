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
import { DomainException } from './DomainExeption';

/**
 * NOTE
 * DomainException 에서 나는 예외를 처리하는 필터
 * @example DomainException.NOT_FOUND({ message: '블로그를 찾을 수 없습니다.' })
 */
@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Logger) {}

  catch(exception: DomainException, host: ArgumentsHost): any {
    const request = host.switchToHttp().getRequest<Request>();
    const response = host
      .switchToHttp()
      .getResponse<Response<any, Record<string, any>>>();

    this.logger.info(
      this.getErrorLogMessageTemplate(request, exception),
      exception,
    );

    response
      .status(HttpStatus.OK)
      .json(
        instanceToPlain(
          ResponseEntity.ERROR_WITH(
            exception.responseMessage,
            exception.responseStatus,
          ),
        ),
      );
  }

  private getErrorLogMessageTemplate(
    request: Request,
    exception: DomainException,
  ): string {
    return [
      `Domain Error: `,
      `${exception.message}`,
      `parameter=${JSON.stringify(exception.parameter)}`,
      `path=${request.url}`,
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
