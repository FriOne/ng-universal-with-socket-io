import { ConnectionOptions } from 'typeorm';

import { User } from './server/entities/user.entity';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testo',
  synchronize: true,
  logging: true,
  entities: [
    User,
  ],
  migrations: [
    'server/migrations/**/*.ts'
  ],
  subscribers: [
    'server/subscriber/**/*.ts'
  ],
  cli: {
    entitiesDir: 'server/entities',
    subscriberDir: 'server/subscribers',
    migrationsDir: 'server/migrations'
  }
};
