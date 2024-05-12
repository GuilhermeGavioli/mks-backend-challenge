import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  // type: 'postgres',
  // host: 'localhost',
  // port: 5432,
  // username: 'admin',
  // password: 'password', 
  // database: 'db',
  // entities: [__dirname + '/src/Entities/*.entity.{ts,js}'],
  // synchronize: true, 
  // logging: true
  type: 'postgres',
  database: process.env.POSTGRES_DB,
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD, 
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  // url: process.env.POSTGRES_CONNECTION_STRING,
  entities: [__dirname + '/src/Entities/*.entity.{ts,js}'],
  synchronize: true, // true only for dev mode for DB MODELING...
  logging: false // true only for dev mode for MONITORING...
};


// docker run --name my-postgres -e POSTGRES_USER=admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=db --network my-net2 -d -p 5432:5432 postgres:14.1-alpine
