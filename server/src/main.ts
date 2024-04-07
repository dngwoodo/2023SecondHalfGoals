import { NestFactory, Reflector } from '@nestjs/core';
import { AppApiModule } from './AppApiModule';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { GlobalExceptionFilter } from './filter/GlobalExceptionFilter';
import { DomainExceptionFilter } from './filter/DomainExceptionFilter';
import { Logger } from './logger/Logger';
import { MikroORM } from '@mikro-orm/postgresql';

/**
 * @description
 * app 실행 =>
 * NestFactory 실행 =>
 * AppModule 실행 =>
 * AppController 실행 =>
 * (app.controller.ts)라우트 코드 실행 =>
 * 서비스 코드 실행(app.service.ts)
 */
async function bootstrap() {
  const app = await NestFactory.create(AppApiModule);

  /**
   * NOTE: Interceptor 셋팅
   */
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.useGlobalPipes(new ValidationPipe());

  /**
   * NOTE: filter 셋팅
   */
  const logger = app.get(Logger);
  app.useGlobalFilters(
    new GlobalExceptionFilter(logger),
    new DomainExceptionFilter(logger),
  );

  /**
   * NOTE: 데이터베이스 마이그레이션 실행
   * @see https://mikro-orm.io/docs/migrations#using-the-migrator-programmatically
   */
  const mikroOrm = app.get(MikroORM);
  // const migrator = mikroOrm.getMigrator();
  // await migrator.up();
  mikroOrm.getSchemaGenerator().refreshDatabase();

  await app.listen(3000);
}

bootstrap();
