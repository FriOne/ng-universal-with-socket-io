import { ConnectionOptions } from 'typeorm';

export const ormConfig: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'testo',
  synchronize: false,
  logging: false,
  // entities: [
  //   'server/entities/**/*.ts'
  // ],
  // migrations: [
  //   'server/migrations/**/*.ts'
  // ],
  // subscribers: [
  //   'server/subscriber/**/*.ts'
  // ],
  cli: {
    entitiesDir: 'server/entities',
    subscriberDir: 'server/subscribers',
    migrationsDir: 'server/migrations'
  }
};
