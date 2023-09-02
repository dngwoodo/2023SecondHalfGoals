import { Module } from '@nestjs/common';
import { BlogApiModule } from './module/blog/BlogApiModule';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import config from '@app/entity/config/config';

@Module({
  imports: [MikroOrmModule.forRoot(config), BlogApiModule],
  controllers: [],
  providers: [],
})
export class AppApiModule {}
