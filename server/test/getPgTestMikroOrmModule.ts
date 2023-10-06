import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { CustomNamingStrategy } from './CustomNamingStrategy';

export function getPgTestMikroOrmModule() {
  return MikroOrmModule.forRoot({
    type: 'postgresql',
    dbName: 'test:',
    host: 'localhost',
    password: 'test',
    user: 'test',
    port: 5432,
    metadataProvider: TsMorphMetadataProvider,
    namingStrategy: CustomNamingStrategy,
    schemaGenerator: {
      disableForeignKeys: true,
      createForeignKeyConstraints: false,
    },
    autoLoadEntities: true,
    allowGlobalContext: true,
    debug: false,
    entities: [],
    entitiesTs: [],
  });
}
