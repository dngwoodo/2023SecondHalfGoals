import { MikroOrmModuleOptions } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

/**
 * NOTE
 * docker 는 그냥 db 를 띄워주는 역할
 * 어느 db 에 연결할 것인지 그 정보를 담아주는 것
 */
const config: MikroOrmModuleOptions = {
  type: 'postgresql',
  dbName: 'test',
  host: 'localhost',
  password: 'test',
  user: 'test',
  port: 5432,
  /**
   * NOTE
   * 컬럼들을 카멜케이스 -> 스네이크 케이스로 알아서 변경해줌.
   */
  metadataProvider: TsMorphMetadataProvider,
  entities: [],
  entitiesTs: [],
  autoLoadEntities: true,
  schemaGenerator: {
    disableForeignKeys: true,
    createForeignKeyConstraints: false,
  },
  allowGlobalContext: true,
  debug: true,
};

export default config;
