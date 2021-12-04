import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(<string>process.env.DATABASE_PORT),
  username: process.env.DATABASE_USER,
  database: process.env.DATABASE_NAME,
  password: process.env.DATABASE_PASSWORD,
  synchronize: false, // for production false
  entities: ['dist/src/**/models/*.entity.{js,ts}'],
  migrations: ['dist/src/db/migrations/*.{js,ts}'],
  cli: {
    migrationsDir: 'src/db/migrations',
  },
  extra: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
};

export default config;
