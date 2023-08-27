import { NestFactory } from '@nestjs/core';
import { AppApiModule } from './AppApiModule';

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
  await app.listen(3000);
}
bootstrap();
